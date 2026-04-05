import { Navigate, useNavigate } from "react-router";
import { useLoginStore } from "../store/LoginStore.jsx";
import { useState } from "react";

export function useLogin() {
  const navigate = useNavigate();
  const login = useLoginStore((state) => state.login);
  const baseUrl = import.meta.env.VITE_BASE_URL;
  const [error, setError] = useState(null);
  const onLogin = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);

    const res = await fetch(`${baseUrl}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(Object.fromEntries(formData)),
    });

    const data = await res.json();
    console.log(data);

    if (res.ok) {
      login(data.accessToken);
      navigate("/users");
      return;
    }
    setError(data.detail);
  };
  return { onLogin, error };
}
