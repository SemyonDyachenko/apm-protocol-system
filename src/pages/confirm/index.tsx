import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import PageNotFound from "../404/PageNotFound"
import { useAppDispatch } from "@/hooks/redux"
import { confirmRequest } from "@/store/actions/authAction"

type Props = {}

const ConfirmPage = (props: Props) => {
  const dispatch = useAppDispatch()
  const { token } = useParams()
  const navigate = useNavigate()

  console.log(token)

  useEffect(() => {
    if (token) {
      dispatch(confirmRequest(token)).then((res) => {
        console.log(res)
        if (res) {
          navigate("/")
          window.location.reload()
        }
      })
    }
  }, [token])

  if (token) return <div></div>
  else return <PageNotFound />
}

export default ConfirmPage
