import { Box, Button, Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from "@mui/material";
import React, { useEffect, useMemo } from "react";
import { useState } from "react";
import {Worker} from "./SubtaskOverview"
import {theme} from '../theme'

type Props = {
  open: boolean;
  onClose: (worker?: Worker) => void;
  workersAvailable: Worker[];
}

export function AddWorkerDialog({
  open,
  onClose,
  workersAvailable
}: Props){
  const  [textWorkerInput, setTextWorkerInput] = useState("");
  const [worker, setWorker] = useState<Worker | undefined>(undefined)

  const filteredWorkers = useMemo<Worker[]>(() => {
    return workersAvailable.filter(worker => {
        const match = worker.name.toLowerCase().match(`${textWorkerInput.toLowerCase()}`);
        return match !== null;
    })
}, [textWorkerInput, workersAvailable])

  const onTextChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setTextWorkerInput(e.target.value);
  }

  const onWorkerSelect = (selectedWorker: Worker) => {
    setWorker(selectedWorker);
    setTextWorkerInput(selectedWorker.name);
  }

  const onSubmit = () => {
    if(!worker) {
      // add user, if only one worker matches text input and no worker has been selected
      // undefined
      let filteredWorkers = workersAvailable.filter(worker => {
        return worker.name.toLowerCase().match(`${textWorkerInput.toLowerCase()}`)});
      if(filteredWorkers.length === 1) {
        onClose(filteredWorkers.at(0));
      }
    }else {
      onClose(worker);
    }
    setWorker(undefined);
    setTextWorkerInput("");
  }
  const onCancel = () => {
    // don't submit worker to list, reset textfield
    onClose(undefined);
    setWorker(undefined);
    setTextWorkerInput("");
  }

  return <Dialog open={open} onClose={onCancel}>
  <DialogTitle>Add Worker</DialogTitle>
  <DialogContent>
    <Container maxWidth="xs">
      <DialogContentText>
          Please enter and select the name of the worker:
      </DialogContentText>
      <TextField
          value={textWorkerInput}
          onChange={onTextChange}
          autoFocus
          margin="dense"
          id="name"
          label="Full name"
          type="name"
          fullWidth
          variant="standard"
      />
      <Box>
        {filteredWorkers.map((worker) => (
          <Button key={"button_" + worker.name} sx={{margin: '5px'}} variant="outlined" onClick={() => onWorkerSelect(worker)}>{worker.name}</Button>
        ))}
      </Box>
    </Container>
  </DialogContent>
  <DialogActions>
  <Button onClick={() => onCancel()}>CANCEL</Button>
  <Button onClick={onSubmit}>Add</Button>
  </DialogActions>
</Dialog>
}