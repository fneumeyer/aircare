import { Avatar, Box, Card, CardActionArea, Divider, Grid, LinearProgress, Stack, Typography } from '@mui/material';
import { ITask, TaskState } from 'backend/src/models/tasks.model'
import { useCallback } from 'react'
import BuildIcon from '@mui/icons-material/Build';
import { theme } from '../theme';
import { useNavigate } from 'react-router-dom';

type Props = {
  task: ITask;
}

type ProgressFromTaskState = {
  [K in TaskState]: number
}

const progress: ProgressFromTaskState = {
  done: 100.0,
  inProgress: 60.0,
  notInProgress: 0.0
}

type ProgressColorFromTaskState = {
  [K in TaskState]: string
}

const progressColor: ProgressColorFromTaskState = {
  done: theme.palette.success.light,
  inProgress: theme.palette.info.light,
  notInProgress: theme.palette.grey[400]
}

type ProgressTextFromTaskState = {
  [K in TaskState]: string
}

const progressText: ProgressTextFromTaskState = {
  done: 'Finished',
  inProgress: 'In Progress',
  notInProgress: 'TBD'
}

export function TaskItem({task}: Props){
  const navigate = useNavigate()

  const openTaskDetails = useCallback(
    () => {
      navigate(`/task/${19871512}`)
    },
    [navigate]
  )

  // TODO: Replace with actual engine name from engine linked to task once DB is set up
  const engineName = 'GE90'

  return <>
    <CardActionArea onClick={openTaskDetails}>
      <Card sx={{borderRadius: '10px', padding: '20px'}}>
        <Grid container spacing={2} >
          <Grid item xs="auto" >
            <Box sx={{ height: '100%', display: 'inline-flex', alignItems: 'center' }}>
              <Avatar sx={{backgroundColor: progressColor[task.taskState]}}>
                <BuildIcon />
              </Avatar>
            </Box>
          </Grid>
          <Grid item xs={9}>
            <Typography variant="h5">
              {task.title}
            </Typography>
            <Typography variant="h6">
              {engineName}
            </Typography>
          </Grid>
          <Grid item xs={'auto'}>
            <Divider orientation='vertical'/>
          </Grid>
          <Grid item xs>
            <Stack spacing={1}>
              <Box sx={{textAlign: 'right'}}>
                <LinearProgress variant="determinate" value={progress[task.taskState]} />
                <Typography variant="caption">
                  {progressText[task.taskState]}
                </Typography>
              </Box>
            </Stack>
          </Grid>
        </Grid>
        
      </Card>
    </CardActionArea>
  </>
}