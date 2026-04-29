import { useEffect, useState } from "react";
import { useLoginStore } from "../store/LoginStore.jsx";

export function useFetchCities() {
  const [loading, setLoading] = useState(true);
  const [chosenDepartment, setChosenDepartment] = useState();
  const [departments, setDepartments] = useState();
  const [municipalities, setMunicipalities] = useState();
  const baseUrl = import.meta.env.VITE_BASE_URL;
  const accessToken = useLoginStore((state) => state.accessToken);

  // load departments.
  useEffect(() => {
    setLoading(true);
    const fetchDepartments = async () => {
      const res = await fetch(`${baseUrl}/city/departments`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();
      if (res.ok) {
        setDepartments(data);
      }
      setLoading(false);
    };
    fetchDepartments();
  }, [baseUrl, accessToken]);

  // load municipalities
  useEffect(() => {
    const fetchMunicipalities = async () => {
      const res = await fetch(
        `${baseUrl}/city/municipalities/${chosenDepartment}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        },
      );
      const data = await res.json();
      console.log("municipios: ", data);
      if (res.ok) {
        setMunicipalities(data);
      }
    };
    if (!chosenDepartment || chosenDepartment == "") {
      setMunicipalities(undefined);
    } else {
      fetchMunicipalities();
    }
  }, [chosenDepartment, baseUrl, accessToken]);

  const onChoseDepartment = (dept) => {
    console.log("change departament: ", dept);
    setChosenDepartment(dept);
  };

  return {
    departments,
    municipalities,
    onChoseDepartment,
    loading,
    onSetLoading: (loading) => setLoading(loading),
    chosenDepartment,
  };
}
