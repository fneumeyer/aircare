import { Box, Card, Grid, Paper, Typography, useTheme } from '@mui/material'
import React, { useEffect, useState } from 'react'
import client from '../feathers'
import {IEngine} from '../../../backend/src/models/engines.model'

type Props = {

}

export function Dashboard(props: Props){
  const [engines, setState] = useState<IEngine[]>([{engineId: 'AB123', model: 'GE90'}, {engineId: 'AB123', model: 'TODO'}])

  const theme = useTheme()

  useEffect(() => {
    // TODO: Get typed data from backend
    // client.service('engines').find(...)
  }, [])

  return <>
    <Box>
      <Typography variant="h2">Task Overview</Typography>

      <Grid container spacing={2}>
        {engines.map((engine, i) => (
          <Grid item xs={12}>
            <Card sx={{borderRadius: '10px', padding: '20px'}} key={i}>
              <Typography variant="h5">
                {engine.model}
              </Typography>
            </Card>
          </Grid>
        ))}      
      </Grid>
    </Box>

    <Box sx={{paddingTop: '20px'}}>
      <Typography variant="h2">Resources</Typography>

      <Grid container spacing={2}>
        <Grid item xs={4}>
          <Card sx={{borderRadius: '10px', padding: '20px'}}>
            <Typography variant="h5">
              Text A
            </Typography>
          </Card>
        </Grid>

        <Grid item xs={4}>
            <Card sx={{borderRadius: '10px', padding: '20px'}}>
              <Typography variant="h5">
              Text B
              </Typography>
            </Card>
          </Grid>

          <Grid item xs={4}>
            <Card sx={{borderRadius: '10px', padding: '20px'}}>
              <Typography variant="h5">
                Text C
              </Typography>
            </Card>
          </Grid>
      </Grid>
    </Box>
  </>
}