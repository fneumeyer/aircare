import { useEffect } from "react"
import { Routes, Route, useNavigate } from "react-router-dom"
import { useAuth } from "./Authentication/useAuth"
import { Dashboard } from "./Dashboard/Dashboard"
import { EngineList } from "./Engines/EngineList"
import {SubtaskOverview} from "./Dashboard/SubtaskOverview"
import {Question} from "./Questions/Question"
import SignIn from "./SignIn"
import { StepOverview } from "./Dashboard/StepOverview"

export function Routing(){

  const {authState} = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if(!authState.authenticated && !authState.loading){
      navigate('/login', {replace: true})
    }
  }, [authState.authenticated, authState.loading, navigate])

  if(authState.loading)
    return <></>

  return (
    <Routes>
      <Route 
        path="/" 
        element={<Dashboard />}>
      </Route>
      <Route 
        path="/engines" 
        element={<EngineList />}>
      </Route>
      <Route 
        path="/login" 
        element={<SignIn />}>
      </Route>
      <Route
        path="/task/:id"
        element={<SubtaskOverview />}>
      </Route>
      <Route
        path="/task/:id/step/:stepId"
        element={<StepOverview />}>
      </Route>
      <Route
        path="/task/:id/step/:stepId/question"
        element={<Question />} >
      </Route>
    </Routes>
  )
}