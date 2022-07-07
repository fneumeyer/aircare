
import { Box, Button, Chip, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Paper, Tab, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tabs, TextField, } from "@mui/material";
import React, { useCallback } from "react";
import { TabPanel } from "./TabPanel";
import {
    useNavigate,
    useParams
  } from "react-router-dom";


type Props = {

}

type StepRowType = {
    id: number,
    name: string,
    questionResult: string,
    status: String,
    duration: number,
  }
  
  function createData(
    id: number,
    name: string,
    questionResult: string,
    status: String,
    duration: number,
  ) {
    return {id, name, questionResult, status, duration, };
  }

const rowData : StepRowType[] = [
    createData(1, "Engine Bottom Cover", "1/2", "Completed", 15),
    createData(2, "Engine Top Cover", "2/2", "Completed", 25),
    createData(3, "Engine Back Cover", "2/2", "Work in Progress", 0),
    createData(4, "Engine Cover Front Cover", "N/A", "Pending", 0),
]

type Worker = {
    id: string,
    name: string,
}



export function SubtaskOverview(props: Props){
    let { id } = useParams();
    const [open, setOpen] = React.useState(false);
    const  [textWorkerInput, setTextWorkerInput] = React.useState("");
    const [workers, setWorkers] = React.useState<Worker[]>([{id: "abc", name: "Lutian"}]);
    const [valueTab, setValueTab] = React.useState<number>(0);

    const navigate = useNavigate()
    const openStepDetails = useCallback(
        () => {
        navigate(`/task/${id}/step/${1}`)
        },
        [navigate]
    );

    return (
        <div>
        <h1> Fix Gearing Cover - #{id}</h1>
        <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
            <Tabs value={valueTab} onChange={handleTabChange} centered>
                <Tab label="Overview" />
                <Tab label="Mastercard"/>
            </Tabs>
        </Box>
        <TabPanel value={valueTab} index={0}>
            {renderFirstTabPanel()}
           
        </TabPanel>
        <TabPanel value={valueTab} index={1}>
           {renderSecondTabPanel()}
        </TabPanel>
        </div>
        
    );

    function renderFirstTabPanel() {
        return (
            <div>
                <h2>Assigned Workers</h2>
            <div className="assigned-workers-container-outer">
            
                {workers.length > 0? workers.map(function (worker: Worker, index: number) {
                    return <div className="assigned-workers-container-inner">
                        <Chip
                            label={worker.name}
                            onClick={() => handleClick(worker, index)}
                            onDelete={() => handleDelete(worker, index)}
                        />
                    </div>
                }) : 
                    <div className="assigned-workers-container-inner">
                        <span className="label-warning" id="unassigned-worker-label">Not yet assigned</span>
                    </div>
                }
                <div className="assigned-workers-container-inner">
                    <Button
                        color="info"
                        onClick={onAddWorkerClick}
                        >
                        ADD WORKER
                    </Button>
                </div>
            </div>
            <h2>Subtasks</h2>
            {renderTable()}
            <Dialog open={open} onClose={() => handleClose('cancel')}>
                <DialogTitle>Add Worker</DialogTitle>
                <DialogContent>
                <DialogContentText>
                    Please enter the name of the worker:
                </DialogContentText>
                <TextField
                    value={textWorkerInput}
                    onChange={handleTextChange}
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Full name"
                    type="name"
                    fullWidth
                    variant="standard"
                />
                </DialogContent>
                <DialogActions>
                <Button onClick={() =>handleClose('cancel')}>CANCEL</Button>
                <Button onClick={() => handleClose('add')}>Add</Button>
                </DialogActions>
            </Dialog>

            <h4> TODO Add Comment button</h4>
            <div className="button-bottom-container">
            <Button className="question-button" id="submit-answer-button" variant="contained" onClick={openStepDetails}>START TASK</Button>
            </div>
        </div>
        );
    }


    function renderTable() {
        return (
            <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell align="left">Description</TableCell>
                    <TableCell align="right">Question Result</TableCell>
                    <TableCell align="right">Status</TableCell>
                    <TableCell align="right">Duration</TableCell>
                    <TableCell align="center">Actions</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                {rowData.map((rowData) => (
                    <TableRow
                    key={rowData.name}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                    <TableCell align="left">{rowData.id}</TableCell>
                    <TableCell component="th" scope="row">
                        {rowData.name}
                    </TableCell>
                    
                    <TableCell align="right">{rowData.questionResult}</TableCell>
                    <TableCell align="right">{rowData.status}</TableCell>
                    <TableCell align="right">{(rowData.duration > 0)?rowData.duration + " min" : "N/A"}</TableCell>
                    <TableCell align="center" children={<Button>MANAGE</Button>}></TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
        </TableContainer>
        );
    }

    function renderSecondTabPanel() {
        // TODO: Mastercard rendering
        return (
            <div>
                <h4>TODO: Render Mastercard</h4>
            </div>
        );
    }
   


    function handleTabChange(event: React.SyntheticEvent, newValue: number) {
        setValueTab(newValue);
    }

    function onAddWorkerClick() {
        setOpen(true);
    }

    function handleTextChange(event: React.ChangeEvent<HTMLInputElement>) {
        setTextWorkerInput(event.target.value);
    }

    function handleClose(event: string) {
        
        if(event === "add" && textWorkerInput !== "") {
            let list = workers.concat([{id: textWorkerInput, name: textWorkerInput}]);
            setWorkers(list)
            setTextWorkerInput(""); // reset text input
            setOpen(false);
            // TODO: Add Worker
        }else if(event === "cancel") {
            setOpen(false);
        }
    }

    function handleClick(worker: Worker, index: number) {

    }

    function handleDelete(worker: Worker, index: number) {
        let list = workers.filter(w => w.id !== worker.id)
        setWorkers(list)
    }
}