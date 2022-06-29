import { IUser } from 'backend/src/models/users.model';
import { atom } from 'recoil';
import client from '../feathers';

export const userAtom = atom<IUser | undefined>({
    key: 'user',
    // get initial state from local storage to enable user to stay logged in
    default: undefined
});