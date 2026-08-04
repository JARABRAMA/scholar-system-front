import {useEffect, useState} from "react";
import {useParams} from "react-router";
import {useLoginStore} from "../store/LoginStore.jsx";

export function useFetchGroupDetails() {
	const {id} = useParams();
	const [group, setGroup] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState();
	const courseSerivice = import.meta.env.VITE_COUSES_URL;
	const accessToken = useLoginStore((state) => state.accessToken);

	useEffect(() => {
		const fetchGroup = async () => {
			setLoading(true);
			const res = await fetch(`${courseSerivice}/api/groups/${id}`, {
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
			});
			const data = await res.json();
			if (!res.ok) {
				setError(data.message || "Error fetching group details");
				setLoading(false);
				return;
			}
			setGroup(data);
			setLoading(false);
		};
		fetchGroup();
	}, [id, accessToken, courseSerivice]);

	return {group, loading, error};
}
