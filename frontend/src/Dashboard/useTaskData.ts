import React, { useCallback, useEffect, useMemo } from 'react'
import { useRecoilState } from 'recoil';
import { tasksAtom } from '../atoms/tasks';
import {subtaskEngineCover} from '../data/StepStaticData'
import { SubtaskData } from './SubtaskOverview';

type Props = {
  subtaskId: string;
}

function useTaskData({
  subtaskId,
}: Props){
  const [tasksData, setTasksData] = useRecoilState(tasksAtom);

  useEffect(() => {
    if(!tasksData.subtasks.has(subtaskId)){
      const newData = subtaskEngineCover;
      setTasksData((oldData) => {
        const newMap = new Map<string, SubtaskData>(oldData.subtasks)
        newMap.set(subtaskId, newData);
        return {
          subtasks: newMap
        }
      })
    }
  })

  const data = useMemo(
    () => tasksData.subtasks.get(subtaskId), 
    []
  )

  const setData = useCallback(
    (data: SubtaskData) => {
      setTasksData((oldData) => {
        oldData.subtasks.set(subtaskId, data);
        return oldData;
      })
    },
    []
  )

  return [data, setData];
}

type StepProps = {
  subtaskId: string;
  stepId: string;
}

function useStepData({
  subtaskId,
  stepId,
}: StepProps){
  const [subtaskData, setSubtaskData] = useTaskData({subtaskId});
  
  
}