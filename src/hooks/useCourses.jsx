import { useEffect, useState } from 'react'
import { useLoginStore } from '../store/LoginStore'
import { useSearchParams } from 'react-router'

export function useCourses () {
  const apiUrl = import.meta.env.VITE_COUSES_URL
  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState()
  const accessToken = useLoginStore((state) => state.accessToken)
  const [_, setSearchParams] = useSearchParams()
  const [totalPages, setTotalPages] = useState(0)
  const [isFirst, setIsFirst] = useState()
  const [isLast, setIsLast] = useState()
  const [userParams, setUserParams] = useState({
    text: '',
    page: 0
  })

  const setPage = (page) => {
    setUserParams({
      ...userParams,
      page
    })
  }

  const setSearchText = (text) => {
    setUserParams({
      ...userParams,
      text
    })
  }

  const onSetSearchText = (text) => setSearchText(text)
  const onSetPage = (newPage) => setPage(newPage)
  const onNextPage = () => setPage(userParams.page + 1)
  const onPreviousPage = () => setPage(userParams.page - 1)

  useEffect(() => {
    const fetchCourses = async () => {
      setLoading(true)
      try {
        const searchParams = new URLSearchParams(userParams)
        const res = await fetch(`${apiUrl}/api/courses?${searchParams.toString()}`,
          { headers: { Authorization: `Bearer ${accessToken}` } }
        )
        const data = await res.json()
        if (res.ok) {
          setTotalPages(data.totalPages)
          setIsFirst(data.first)
          setIsLast(data.last)
          setCourses(data.content)
        } else {
          setError(data)
        }
      } catch (e) {
        setLoading(false)
        setError('Error de conexión por favor intenta más tarde')
      } finally {
        setLoading(false)
      }
    }

    const timer = setTimeout(() => {
      fetchCourses()
    }, 500)

    return () => clearTimeout(timer)
  }, [accessToken, apiUrl, userParams])

  useEffect(() => {
    setSearchParams(userParams)
  }, [setSearchParams, userParams])


  return {
    courses,
    loading,
    error,
    onSetSearchText,
    totalPages,
    currentPage: userParams.page,
    isLast,
    isFirst,
    onNextPage,
    onPreviousPage,
    onSetPage
  }
}
