import { atom } from 'recoil';
import client from '../feathers';
import { SubtaskData } from '../Dashboard/SubtaskOverview';

export type TasksState = {
  subtasks: Map<string, SubtaskData>
}

export const tasksAtom = atom<TasksState>({
    key: 'auth',
    // get initial state from local storage to enable user to stay logged in
    default: {
      subtasks: new Map<string, SubtaskData>()
    }
});