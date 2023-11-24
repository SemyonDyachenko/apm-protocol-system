import { useAppDispatch } from "@/hooks/redux"
import { logoutUser } from "@/store/actions/authAction"
import rolesSlice, { setRole } from "@/store/slices/roleSlice"
import React, { useEffect } from "react"
import { useNavigate } from "react-router-dom"

type Props = {}

const LogoutPage = (props: Props) => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const logout = () => {
    dispatch(logoutUser()).then(() => {
      navigate("/")
      window.location.reload()
    })
  }

  useEffect(() => {
    logout()
  }, [])

  return <div></div>
}

export default LogoutPage
