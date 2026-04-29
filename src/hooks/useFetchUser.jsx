import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useLoginStore } from "../store/LoginStore";

export function useFetchUser() {
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const { id: userId } = useParams();
  const accessToken = useLoginStore((state) => state.accessToken);
  const [user, setUser] = useState();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(true);

  // fetch user from api
  useEffect(() => {
    if (!accessToken || !userId) return;

    const fetchUser = async () => {
      setLoading(true);
      const res = await fetch(`${BASE_URL}/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const data = await res.json();
      if (res.ok) {
        setUser(data);
      } else {
        setError(data);
      }
      setLoading(false);
    };
    fetchUser();
  }, [userId, accessToken]);

  return {
    user,
    error,
    loading,
  };
}
