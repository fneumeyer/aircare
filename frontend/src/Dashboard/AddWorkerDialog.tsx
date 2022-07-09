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
    onClose(worker);
    setWorker(undefined);
  }

  return <Dialog open={open} onClose={() => onClose(worker)}>
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
          <Button sx={{margin: '5px'}} variant="outlined" onClick={() => onWorkerSelect(worker)}>{worker.name}</Button>
        ))}
      </Box>
    </Container>
  </DialogContent>
  <DialogActions>
  <Button onClick={onSubmit}>CANCEL</Button>
  <Button onClick={onSubmit}>Add</Button>
  </DialogActions>
</Dialog>
}