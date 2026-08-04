import {useState} from "react";
import {useLoginStore} from "../store/LoginStore.jsx";
import {useNavigate} from "react-router";
import {NavigationPaths} from "../navigation/NavigationPaths.jsx";

export function useNewGroup() {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState();
	const courseService = import.meta.env.VITE_COUSES_URL;
	const accessToken = useLoginStore((state) => state.accessToken);
	const navigate = useNavigate();

	const onSubmit = (event, courseId) => {
		setLoading(true);
		event.preventDefault();

		const createGroup = async () => {
			setLoading(true);
			const requestData = Object.fromEntries(
				new FormData(event.target).entries(),
			);
			requestData["courseId"] = courseId;
			requestData["schedules"] = schedules;

			const res = await fetch(`${courseService}/api/groups`, {
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${accessToken}`,
				},
				method: "POST",
				body: JSON.stringify(requestData),
			});

			if (res.ok) {
				navigate(NavigationPaths.COURSES);
			} else {
				const data = await res.json();
				setError(data);
			}
			setLoading(false);
		};

		createGroup();
	};

	const [schedules, setSchedules] = useState([]);

	const handleChange = (index, field, value) => {
		const updated = [...schedules];
		updated[index][field] = value;
		setSchedules(updated);
	};

	const addSchedule = () => {
		setSchedules([...schedules, {day: "", startsTime: "", endTime: ""}]);
	};

	const removeSchedule = (index) => {
		const updated = schedules.filter((_, i) => i !== index);
		setSchedules(updated);
	};
	const onDismissError = () => setError(undefined);

	return {
		onSubmit,
		schedules,
		handleChange,
		addSchedule,
		removeSchedule,
		loading,
		error,
		onDismissError,
	};
}