import { atom } from 'recoil';
import client from '../feathers';

export type AuthState = {
  authenticated: boolean
  loading: boolean
}

export const authAtom = atom<AuthState>({
    key: 'auth',
    // get initial state from local storage to enable user to stay logged in
    default: {
      authenticated: false,
      loading: true
    }
});