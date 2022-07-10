import { Box, Card, CardActionArea, Grid, Typography, useTheme } from '@mui/material'
import { useState } from 'react'
import {ITask} from '../../../backend/src/models/tasks.model'
import { Types } from 'mongoose';
import { TaskItem } from './TaskItem'
import AnalyticsIcon from '@mui/icons-material/Analytics';
import SchoolIcon from '@mui/icons-material/School';
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';

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
          <CardActionArea>
            <Card sx={{borderRadius: '10px', padding: '20px', height: '160px'}}>
              <Box display='flex' height={'100%'} flexDirection='column' alignItems='center' justifyContent='space-between'>
              <Typography variant="h5" textAlign={'center'}>
                Maintenance Progress
              </Typography>
              <AnalyticsIcon sx={{marginTop: '10px', fontSize: '48px'}} />
              </Box>              
            </Card>
          </CardActionArea>
        </Grid>

        <Grid item xs={4}>
          <CardActionArea>
            <Card sx={{borderRadius: '10px', padding: '20px', height: '160px'}}>
              <Box display='flex' height={'100%'} flexDirection='column' alignItems='center' justifyContent='space-between'>
                <Typography variant="h5" textAlign={'center'}>
                  Knowledge Hub
                </Typography>
                <SchoolIcon sx={{marginTop: '10px', fontSize: '48px'}} />
              </Box>              
            </Card>
          </CardActionArea>
        </Grid>

        <Grid item xs={4}>
          <CardActionArea>
            <Card sx={{borderRadius: '10px', padding: '20px', height: '160px'}}>
              <Box display='flex' height={'100%'} flexDirection='column' alignItems='center' justifyContent='space-between'>
                <Typography variant="h5" textAlign={'center'}>
                  Scanner
                </Typography>
                <QrCodeScannerIcon sx={{marginTop: '10px', fontSize: '48px'}} />
              </Box>              
            </Card>
          </CardActionArea>
        </Grid>
      </Grid>
    </Grid>
  </Grid>
}