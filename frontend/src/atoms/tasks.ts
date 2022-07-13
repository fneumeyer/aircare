import { atom } from 'recoil';
import client from '../feathers';
import { TaskData } from '../Dashboard/TaskOverview';

export type TasksState = {
  subtasks: Map<string, TaskData>
}

export const tasksAtom = atom<TasksState>({
    key: 'tasks',
    // get initial state from local storage to enable user to stay logged in
    default: {
      subtasks: new Map<string, TaskData>()
    }
});