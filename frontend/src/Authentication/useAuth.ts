import { IUser } from "backend/src/models/users.model";
import { useCallback, useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { authAtom, AuthState } from "../atoms/auth";
import { userAtom } from "../atoms/user";
import client from "../feathers";

type AuthResult = {
  user?: IUser
}

export function useAuth(){
  const [authState, setAuthState] = useRecoilState(authAtom)
  const [user, setUser] = useRecoilState(userAtom)

  const setAuthenticated = useCallback(
    (authenticated: boolean) => {
      setAuthState({
          authenticated,
          loading: false
      })
      if(!authenticated) {
        client.services.users.remove(null);
      }
    }, 
    [setAuthState]
  )

  

  useEffect(() => {
    if(!authState.authenticated){
      client.reAuthenticate()
      .then((r: AuthResult) => {
        if(r.user){
          setUser(r.user)
          setAuthState({
            authenticated: true,
            loading: false
          })
        }
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