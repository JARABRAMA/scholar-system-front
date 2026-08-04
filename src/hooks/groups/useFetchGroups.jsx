import { useState, useEffect } from "react";
import { useLoginStore } from "../../store/LoginStore";

export function useFetchGroup({ groupId }) {
  const groupServiceUrl = import.meta.env.VITE_COUSES_URL;
  const [group, setGroup] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const accessToken = useLoginStore((state) => state.accessToken);

  useEffect(() => {
    const fetchGroups = async () => {
      setLoading(true);
      setError();
      try {
        const response = await fetch(
          `${groupServiceUrl}/api/groups/${groupId}`,
          {
            headers: { Authorization: `Bearer ${accessToken}` },
          },
        );
        const data = await response.json();
        if (response.ok) {
          setGroup(data);
        } else {
          setError(data.detail);
        }
      } catch (e) {
        console.log("Error: ", e);
        setError("Error de conexion, intentalo mas tarde");
      } finally {
        setLoading(false);
      }
    };
    fetchGroups();
  }, [accessToken, groupId, groupServiceUrl]);

  return { group, loading, error };
}
