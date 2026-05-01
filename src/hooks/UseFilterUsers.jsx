import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import { useLoginStore } from "../store/LoginStore.jsx";

export function useFilterUsers() {
  const [users, setUsers] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalPages, setTotalPages] = useState(0);
  const [isFirstPage, setIsFirstPage] = useState(false);
  const [isLastPage, setIsLastPage] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();
  const baseUrl = import.meta.env.VITE_BASE_URL;
  const accessToken = useLoginStore((state) => state.accessToken);

  const page = Number(searchParams.get("page")) || 0;
  const search = searchParams.get("search") || "";
  const role = searchParams.get("role") || "";

  useEffect(() => {
    setLoading(true);

    const timeoutId = setTimeout(async () => {
      const url = `${baseUrl}/users?${searchParams.toString()}`;

      const res = await fetch(url, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();

      if (res.ok) {
        setUsers(data.content);
        setTotalPages(data.totalPages);
        setIsFirstPage(data.first);
        setIsLastPage(data.last);
      } else {
        setError(data.detail);
      }

      setLoading(false);
    }, 400);

    return () => clearTimeout(timeoutId);
  }, [searchParams, accessToken]);

  const updateParams = (newParams) => {
    const params = new URLSearchParams(searchParams);

    Object.entries(newParams).forEach(([key, value]) => {
      if (value === "" || value === null) {
        params.delete(key);
      } else {
        params.set(key, value);
      }
    });

    setSearchParams(params);
  };

  const onSetSearch = (text) => {
    updateParams({ search: text, page: 0 }); // reset page
  };

  const onSetRole = (role) => {
    updateParams({ role, page: 0 }); // reset page
  };

  const onSetPage = (newPage) => {
    updateParams({ page: newPage });
  };

  const onNextPage = () => {
    if (!isLastPage) updateParams({ page: page + 1 });
  };

  const onPreviousPage = () => {
    if (!isFirstPage) updateParams({ page: page - 1 });
  };

  return {
    users,
    loading,
    error,
    onSetSearch,
    onSetRole,
    totalPages,
    onSetPage,
    onNextPage,
    onPreviousPage,
    isFirstPage,
    isLastPage,
    currentPage: page,
  };
}
