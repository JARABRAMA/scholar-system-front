import { useRef, useState, useEffect } from 'react'

export function useDeleteUser () {
  const [showDeleteDialog, setShowDeleteDialog] = useState()
  const deleteDialogRef = useRef()
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

  return { deleteDialogRef, onToggleShowDeleteDialog }
}
