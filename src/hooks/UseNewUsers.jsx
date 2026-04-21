import { useEffect, useState } from "react";
import { useLoginStore } from "../store/LoginStore.jsx";
import { useNavigate } from "react-router";
import { NavigationPaths } from "../navigation/NavigationPaths.jsx";

export function useNewUser() {
  const [loading, setLoading] = useState(true);
  const [chosenDepartment, setChosenDepartment] = useState();
  const [departments, setDepartments] = useState();
  const [municipalities, setMunicipalities] = useState();
  const [error, setError] = useState();
  const baseUrl = import.meta.env.VITE_BASE_URL;
  const accessToken = useLoginStore((state) => state.accessToken);
  const navigate = useNavigate();

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

  const onSubmitForm = async (event) => {
    event.preventDefault();
    setLoading(true);
    const newUser = Object.fromEntries(new FormData(event.target).entries());
    console.log(newUser);
    const res = await fetch(`${baseUrl}/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(newUser),
    });
    const data = await res.json();
    console.log(data);
    if (res.ok) {
      navigate(NavigationPaths.USERS);
    } else {
      setError(data.detail);
    }
    setLoading(false);
  };
  const onChoseDepartment = (dept) => {
    console.log("change departament: ", dept);
    setChosenDepartment(dept);
  };

  return {
    departments,
    municipalities,
    onChoseDepartment,
    loading,
    onSubmitForm,
    chosenDepartment,
    error,
  };
}
