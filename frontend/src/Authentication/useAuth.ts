import { useCallback, useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { authAtom, AuthState } from "../atoms/auth";
import client from "../feathers";

export function useAuth(){
  const [authState, setAuthState] = useRecoilState(authAtom)

  const setAuthenticated = useCallback(
    (authenticated: boolean) => {
      setAuthState({
          authenticated,
          loading: false
      })
    }, 
    [setAuthState]
  )

  useEffect(() => {
    if(!authState.authenticated){
      client.reAuthenticate()
      .then((r) => {
        console.log(r)
        setAuthState({
          authenticated: true,
          loading: false
        })
      })
      .catch((r) => {
        console.error(r)
        setAuthState({
          authenticated: false,
          loading: false
        })
      })
    }
  }, [authState.authenticated, setAuthState])

  return {
    authState,
    setAuthenticated
  }
}