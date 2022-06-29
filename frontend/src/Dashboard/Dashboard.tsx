import { Card, Grid, Typography, useTheme } from '@mui/material'
import { useEffect, useState } from 'react'
import {ITask} from '../../../backend/src/models/tasks.model'
import { Types } from 'mongoose';
import { TaskItem } from './TaskItem'
type Props = {

}

export function Dashboard(props: Props){
  //const [engines, setState] = useState<IEngine[]>([{engineId: 'AB123', model: 'GE90'}, {engineId: 'AB123', model: 'TODO'}])

  // TODO: Replace mock-up data with backend data
  const tasksData: ITask[] = [
    {
      title: 'Install Outer Tubing',
      description: '',
      engine: new Types.ObjectId('aaaaaaaaaaaaaaaaaaaaaaaa'),
      taskState: 'inProgress'
    },
    {
      title: 'Combustor Assembly',
      description: '',
      engine: new Types.ObjectId('aaaaaaaaaaaaaaaaaaaaaaaa'),
      taskState: 'notInProgress'
    },
    {
      title: 'Fixing of Gearing Cover',
      description: '',
      engine: new Types.ObjectId('aaaaaaaaaaaaaaaaaaaaaaaa'),
      taskState: 'done'
    }
  ]
  const [tasks, setTasks] = useState<ITask[]>(tasksData)

  const theme = useTheme()

  useEffect(() => {
    // TODO: Get typed data from backend
    // client.service('engines').find(...)
  }, [])

  return <Grid container direction={'column'} sx={{height: '100%'}} justifyContent={'space-between'} spacing={1}>
    <Grid item>
      <Typography variant="h2">Task Overview</Typography>

      <Grid container spacing={2}>
        {tasks.map((task, i) => (
          <Grid key={`task-${i}`} item xs={12}>
            <TaskItem task={task} />
          </Grid>
        ))}      
      </Grid>
    </Grid>

    <Grid item>
      <Typography variant="h2">Resources</Typography>

      <Grid container spacing={2}>
        <Grid item xs={4}>
          <Card sx={{borderRadius: '10px', padding: '20px', height: '128px'}}>
            <Typography variant="h5">
              Text A
            </Typography>
          </Card>
        </Grid>

        <Grid item xs={4}>
            <Card sx={{borderRadius: '10px', padding: '20px', height: '128px'}}>
              <Typography variant="h5">
              Text B
              </Typography>
            </Card>
          </Grid>

          <Grid item xs={4}>
            <Card sx={{borderRadius: '10px', padding: '20px', height: '128px'}}>
              <Typography variant="h5">
                Text C
              </Typography>
            </Card>
          </Grid>
      </Grid>
    </Grid>
  </Grid>
}