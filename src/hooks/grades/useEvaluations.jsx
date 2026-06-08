import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { useFetchStudentsByGroup } from "../students/useFetchStudentsByGroup.jsx";
import { useFetchGroupEvaluations } from "./useFetchGroupEvaluations.jsx";
import { useLoginStore } from "../../store/LoginStore.jsx";
import { useFetchGroup } from "../groups/useFetchGroups.jsx";

export function useEvaluations() {
  const { groupId } = useParams();
  const accesToken = useLoginStore((state) => state.accessToken);
  const evaluationServiceUrl = import.meta.env.VITE_EVALUATIONS_URL;
  const [updateGradesLoading, setUpdateGradesLoading] = useState(false);
  const [updateGradesError, setUpdateGradesError] = useState(null);

  const {
    group,
    loading: groupLoading,
    error: groupError,
  } = useFetchGroup({ groupId });
  const {
    evaluations,
    loading: gradesLoading,
    error: gradesError,
    refetch: refetchEvaluations,
  } = useFetchGroupEvaluations({ groupId });
  const {
    students,
    loading: studentsLoading,
    error: studentsError,
  } = useFetchStudentsByGroup({ groupId });

  const [table, setTable] = useState([]);

  useEffect(() => {
    if (!students?.length || !evaluations?.length) return;

    setTable(
      students.map((s) => ({
        student: s,
        evaluations: evaluations.map((e) => ({
          studentId: s.id,
          evaluationId: e.id,
          value: null,
        })),
      })),
    );
  }, [students, evaluations]);

  const onSave = async () => {
    setUpdateGradesLoading(true);
    setUpdateGradesError(null);
    try {
      const reqBody = fromTableToGradeList();
      const response = await fetch(`${evaluationServiceUrl}/api/grades`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accesToken}`,
        },
        body: JSON.stringify(reqBody),
      });
      if (!response.ok) {
        const data = await response.json();
        setUpdateGradesError(data.detail);
      }
      console.log("todo correcto");
    } catch (e) {
      console.error("error: ", e);
      setUpdateGradesError("Error de conexion, porfavor intenta mas tarde");
    } finally {
      setUpdateGradesLoading(false);
    }
  };

  const fromTableToGradeList = () => {
    return table.flatMap((row) =>
      row.evaluations.map((e) => ({
        studentId: row.student.id,
        evaluationId: e.evaluationId,
        value: e.value,
      })),
    );
  };

  const updateTable = (studentId, evaluationId, value) => {
    setTable((prevTable) =>
      prevTable.map((row) =>
        row.student.id === studentId
          ? {
              ...row,
              evaluations: row.evaluations.map((e) =>
                e.evaluationId === evaluationId ? { ...e, value } : e,
              ),
            }
          : row,
      ),
    );
  };

  const loading = groupLoading || gradesLoading || studentsLoading;
  const error = groupError ?? gradesError ?? studentsError;

  return {
    group,
    table,
    evaluations,
    loading,
    error,
    updateTable,
    onSave,
    updateGradesError,
    updateGradesLoading,
    onDismissError: () => {
      setUpdateGradesError(null);
    },
    refetchEvaluations,
  };
}
