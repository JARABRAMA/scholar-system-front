import {useEffect, useState} from "react";
import {useLoginStore} from "../store/LoginStore";
import {useSearchParams} from "react-router";

export function useCourses() {
	const apiUrl = import.meta.env.VITE_COUSES_URL;
	const [courses, setCourses] = useState();
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState();
	const [searchText, setSearchText] = useState("");
	const accessToken = useLoginStore((state) => state.accessToken);
	const [searchParams, setSearchParams] = useSearchParams();
	const [page, setPage] = useState(0);
	const [totalPages, setTotalPages] = useState(0);
	const [isFirst, setIsFirst] = useState();
	const [isLast, setIsLast] = useState();

	const onSetSearchText = (text) => setSearchText(text);
	const onSetPage = (newPage) => setPage(newPage);
	const onNextPage = () => setPage(page + 1);
	const onPreviousPage = () => setPage(page - 1);

	useEffect(() => {
		const fetchCourses = async () => {
			setLoading(true);
			try {
				const res = await fetch(
					`${apiUrl}/api/courses?${searchParams.toString()}`,
					{
						headers: {
							Authorization: `Bearer ${accessToken}`,
						},
					},
				);
				const data = await res.json();
				if (res.ok) {
					setTotalPages(data.totalPages);
					setIsFirst(data.first);
					setIsLast(data.last);
					setCourses(data.content);
				} else {
					setError(data);
				}
				setLoading(false);


				const timer = setTimeout(() => {
					fetchCourses();
				}, 500);

				return () => clearTimeout(timer);
			} catch (e) {
				setError('Error de conexión por favor intenta más tarde')
			}
		}
		setLoading(false)
	}, [searchParams]);

	useEffect(() => {
		const params = new URLSearchParams(searchParams);
		params.set("text", searchText);
		params.set("page", page);
		setSearchParams(params);
	}, [searchText, searchParams, page]);

	return {
		courses,
		loading,
		error,
		onSetSearchText,
		totalPages,
		currentPage: page,
		isLast,
		isFirst,
		onNextPage,
		onPreviousPage,
		onSetPage,
	};
}
