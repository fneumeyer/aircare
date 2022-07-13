import React, { useCallback, useEffect, useMemo } from 'react'
import { useRecoilState } from 'recoil';
import { tasksAtom } from '../atoms/tasks';
import {subtaskEngineCover} from '../data/StepStaticData'
import { QuestionData } from '../Questions/QuestionType';
import { StepData, StepStatus } from './StepOverview';
import { TaskData } from './TaskOverview';

type TaskDataProps = {
  subtaskId: string;
}

export function useTaskData({
  subtaskId,
}: TaskDataProps){
  const [tasksData, setTasksData] = useRecoilState(tasksAtom);

  if(tasksData === undefined) {
    console.log("error tasksData undefined")
  }else if(tasksData.subtasks === undefined) {
    console.log("error tasksData.subtasks undefined")
  }

  useEffect(() => {
    if(!tasksData.subtasks.has(subtaskId)){
      const newData = subtaskEngineCover;
      setTasksData((oldData) => {
        const newMap = new Map<string, TaskData>(oldData.subtasks)
        newMap.set(subtaskId, newData);
        return {
          subtasks: newMap
        }
      })
    }
  })

  const task = useMemo(
    () => {
        const value = tasksData.subtasks.get(subtaskId);
        if(value) {
          return value;
        }
        return subtaskEngineCover; // return default value
      },
    []
  )

  const setTask : (data: TaskData) => void = useCallback(
    (data: TaskData) => {
      setTasksData((oldData) => {
        oldData.subtasks.set(subtaskId, data);
        return oldData;
      })
    },
    []
  )

  return {task, setTask};
}

type StepProps = {
  subtaskId: string;
  stepId: string;
}

export function useStepData({
  subtaskId,
  stepId,
}: StepProps){
  const {task, setTask} = useTaskData({subtaskId});

  const stepData = useMemo(() => {
    const numStepId = Number(stepId);
    //if(numStepId >= 1 && numStepId <= task.steps.length){
    return task.steps[numStepId - 1]
    //}else {
    //  return task.steps[0]
    //}
  }, [stepId, subtaskId])

  const setStepData = useCallback(
    (stepData: StepData) => {
      let list = task.steps
      list[Number(stepId) - 1] = stepData
      setTask({...task, steps: list})
    }, [task, stepId, subtaskId,]
  )
  const setStepDataStatus = useCallback(
    (newStatus: StepStatus) => {
      let list = task.steps
      list[Number(stepId) - 1] = {...stepData, status: newStatus}
      setTask({...task, steps: list})
    }, [task, stepId, subtaskId,]
  )

  const initNextStepData = useCallback(
    (stepIdInner: number) => {
      stepId = stepIdInner.toString();
    }, [task, stepId, subtaskId,]
  )

  const setQuestionData = useCallback(
    (data: QuestionData[]) => {
      let list = task.steps
      list[Number(stepId) - 1] = {...stepData, questionData: data}
      setTask({...task, steps: list})
    }, [task, stepId, subtaskId,]
  )

  return {
    stepData,
    setStepData,
    setStepDataStatus,
    initNextStepData,
    setQuestionData
  }
}
