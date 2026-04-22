import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import { useLoginStore } from "../store/LoginStore.jsx";

export function useFilterUsers() {
  const [users, setUsers] = useState();
  const [search, setSearch] = useState();
  const [role, setRole] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const baseUrl = import.meta.env.VITE_BASE_URL;
  const [searchParams, setSearchParams] = useSearchParams();
  const accessToken = useLoginStore((state) => state.accessToken);

  // update role search params
  useEffect(() => {
    if (role && role !== "") {
      const params = searchParams;
      params.set("role", role);
      setSearchParams(params);
    } else if (role === "") {
      const params = searchParams;
      params.delete("role");
      setSearchParams(params);
    }
  }, [role]);

  // update search search params
  useEffect(() => {
    if (search && search !== "") {
      const params = searchParams;
      params.set("search", search);
      setSearchParams(params);
    } else if (search === "") {
      const params = searchParams;
      params.delete("search");
      setSearchParams(params);
    }
  }, [search]);

  useEffect(() => {
    setLoading(true);
    const timeoutId = setTimeout(() => {
      const fetchData = async () => {
        const res = await fetch(`${baseUrl}/users?${searchParams.toString()}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        });
        const data = await res.json();
        console.log("response data: ", data);
        if (res.ok) {
          setUsers(data.content);
        } else {
          setError(data.detail);
        }
        setLoading(false);
      };
      fetchData();
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [search, role]);

  const onSetSearch = (text) => {
    console.log(text);
    setSearch(text);
  };

  const onSetRole = (role) => {
    setRole(role);
  };

  return {
    users,
    loading,
    error,
    onSetSearch,
    onSetRole,
  };
}
