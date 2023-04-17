import { useAppDispatch } from "@/hooks/redux"
import { logoutUser } from "@/store/actions/authAction"
import React, { useEffect } from "react"
import { useNavigate } from "react-router-dom"

type Props = {}

const LogoutPage = (props: Props) => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(logoutUser()).then(() => navigate("/"))
  }, [])
  return <div></div>
}

export default LogoutPage
