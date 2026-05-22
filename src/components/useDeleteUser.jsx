import { useRef, useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router'
import { useLoginStore } from '../store/LoginStore'
import { NavigationPaths } from '../navigation/NavigationPaths'

export function useDeleteUser () {
  const [showDeleteDialog, setShowDeleteDialog] = useState()
  const [loadingDelete, setLoadingDelete] = useState(false)
  const [errorDelete, setErrorDelete] = useState()
  const { id } = useParams()
  const accessToken = useLoginStore(state => state.accessToken)
  const deleteDialogRef = useRef()
  const navigate = useNavigate()

  const onToggleShowDeleteDialog = () => {
    showDeleteDialog
      ? setShowDeleteDialog(false)
      : setShowDeleteDialog(true)
  }

  useEffect(() => {
    if (showDeleteDialog) {
      deleteDialogRef.current?.showModal()
    } else {
      deleteDialogRef.current?.close()
    }
  }, [showDeleteDialog])

  const onDeleteUser = async () => {
    setLoadingDelete(true)
    try {
      const serviceUrl = import.meta.env.VITE_BASE_URL
      const url = `${serviceUrl}/users/${id}`
      const res = await fetch(url, {

        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      })
      if (res.ok) {
        setLoadingDelete(false)
        navigate(NavigationPaths.USERS)
      } else {
        const data = await res.json()
        setErrorDelete(data.detail)
      }
    } catch (e) {
      setErrorDelete('Error de conexión por favor intenta más tarde')
      setLoadingDelete(false)
    }
  }

  const onDissmissDeletingError = () => setErrorDelete(undefined)

  return {
    deleteDialogRef,
    onToggleShowDeleteDialog,
    onDeleteUser,
    loadingDelete,
    errorDelete,
    onDissmissDeletingError
  }
}
