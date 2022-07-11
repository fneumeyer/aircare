
import { Box, Breadcrumbs, Button, Chip, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, Grid, IconButton, InputLabel, MenuItem, Paper, Select, SelectChangeEvent, styled, Tab, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tabs, TextField, Tooltip, Typography, } from "@mui/material";
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { TabPanel } from "./TabPanel";
import {
    Link,
    useNavigate,
    useParams
  } from "react-router-dom";

import { Document, Page } from 'react-pdf/dist/esm/entry.webpack5';
import { PDFDocumentProxy } from 'react-pdf/node_modules/pdfjs-dist';
// Related stackoverflow post: https://stackoverflow.com/questions/63569578/typescript-type-declarations-for-pdf-file
import sample from './../assets/regal.pdf';
import { IUser } from "backend/src/models/users.model";
import client from "../feathers";
//const urlPdf =  "https://www.ikea.com/de/de/assembly_instructions/enhet-unterschrank-fuer-ofen-mit-schubl-weiss__AA-2195104-5-2.pdf";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import SettingsIcon from '@mui/icons-material/Settings';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { AddWorkerDialog } from "./AddWorkerDialog";
import { StepData } from "./StepOverview";
import {theme} from '../theme'
import { subtaskEngineCover } from "../data/StepStaticData";

type Props = {

}

export type SubtaskData = {
    title: string,
    assignedWorkers: Worker[],
    mastercard: string,
    subtaskId: number,
    steps: StepData[],
}
type TaskStatus = "all-tasks-completed" | "not-yet-started" | "work-in-progress";

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
    return {id, name, questionResult, status, duration };
  }

const rowData : StepRowType[] = [
    createData(1, "Engine Bottom Cover", "1/2", "Completed", 15),
    createData(2, "Engine Top Cover", "2/2", "Completed", 25),
    createData(3, "Engine Back Cover", "2/2", "Work in Progress", 0),
    createData(4, "Engine Cover Front Cover", "N/A", "Pending", 0),
]

export type Worker = {
    id: string,
    name: string,
}

const StyledLink = styled(Link)(({theme}) => ({
    textDecoration: 'none'
}))

const workersAvailable: Worker[] = [
    {id: "0", name: "Lutian Zhang"},
    {id: "1", name: "Maximilian Geitner"},
    {id: "2", name: "Maximilian Pfleger"},
    {id: "3", name: "Clara Iversen"},
    {id: "4", name: "Felix Neumeyer"},
  ]

export function SubtaskOverview(props: Props){
    let { id, } = useParams();
    
    const [addWorkerDialogOpen, setAddWorkerDialogOpen] = React.useState(false);
    const [workers, setWorkers] = React.useState<Worker[]>([workersAvailable[0]]);
    const [tabIndex, setTabIndex] = React.useState<number>(0);
    const [scaleIndex, setScaleIndex] = React.useState<number>(2); // default value 1.0
    const scalesValues : number[] = [0.5, 0.75, 1.0, 1.25, 1.5, 2.0];
    const scaleTexts = ["50%", "75%",  "100%", "125%", "150%", "200%"];
    const [numPages, setNumPages] = React.useState<number>(0);
    const [pageNumber, setPageNumber] = React.useState(0); // start at 0

    const navigate = useNavigate()
    const openStepDetails = useCallback(
        () => {
        navigate(`/task/${id}/step/${1}`)
        },
        [id, navigate]
    );

    const openStepDetailsById = useCallback(
        (stepId: number) => {
        navigate(`/task/${id}/step/${stepId}`)
        },
        [id, navigate]
    );

    const stateTaskButton : TaskStatus= useMemo(() => {
        const nextStep = subtaskEngineCover.steps.findIndex(stepData => {
            return stepData.status !== "completed";
        })
        if(nextStep === -1) {
            // all tasks have been completed
            return "all-tasks-completed";
        }else if(nextStep === 0) {
            return "not-yet-started";
        }else {
            return "work-in-progress";
        }
    }, [subtaskEngineCover.steps]) 

    return <>
        <Grid container sx={{height: '100%'}} spacing={2} direction="column">
            <Grid item xs="auto"> 
                <div style={{marginTop: "5px"}}>
                    <Breadcrumbs aria-label="breadcrumb">
                        <StyledLink color="inherit" to="/">
                            Home
                        </StyledLink>
                        <Typography color="text.primary">Task</Typography>
                    </Breadcrumbs>
                </div>
            </Grid>
            <Grid item xs="auto">
                <h1> Fix Gearing Cover - #{id}</h1>
                <Paper>
                    <Tabs value={tabIndex} onChange={handleTabChange} centered>
                        <Tab label="Overview" />
                        <Tab label="Mastercard"/>
                    </Tabs>
                </Paper>
                {(tabIndex === 1) ?<PdfMenuBar></PdfMenuBar> : null}
            </Grid>
            
            <Grid item xs sx={{overflow: 'auto'}}>
                <TabPanel value={tabIndex} index={0}>
                    {<FirstTabPanel />}
                </TabPanel>
                <TabPanel value={tabIndex} index={1} >
                    {<SecondTabPanel scrollToPage={pageNumber} />}
                </TabPanel>
            </Grid>
        </Grid>
        <AddWorkerDialog open={addWorkerDialogOpen} onClose={onWorkerDialogClose} workersAvailable={workersAvailable} />
    </>;

    function FirstTabPanel() {
        return (
            <div>
                <h2>Assigned Workers</h2>
            <div className="assigned-workers-container-outer">
                {workers.length > 0? workers.map(function (worker: Worker, index: number) {
                    return <div className="assigned-workers-container-inner" key={"div-" + worker.name}>
                        <Chip
                            key={"chip-" + worker.name}
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
            

            <div className="button-bottom-container">
                <BottomButton/>
                
            </div>
        </div>
        );
    }


    function BottomButton() {
        let text = "Start Task";
        if(stateTaskButton === "all-tasks-completed") {
            text = "View Task";
        }else if(stateTaskButton === "work-in-progress") {
            text = "Continue Task";
        }
        return (
        <Button id="submit-answer-button" color="actionbuttonblue" variant="contained" onClick={onNextSubtaskClick}>{text}</Button>
        );
    }
    

    function onNextSubtaskClick() {
        const nextStep = subtaskEngineCover.steps.findIndex(stepData => {
            return stepData.status !== "completed";
        })
        if(nextStep === -1) {
            // Open first task
            openStepDetails();
        }else {
            openStepDetailsById(nextStep + 1);
        }
    }

    // TODO Dialog: Search for real users
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
                {subtaskEngineCover.steps.map((rowData, index) => {
                    
                    const chipColor = () => {
                            switch(rowData.status){
                                case "completed":
                                    return "success"
                                case "work-in-progress":
                                    return "primary"
                                case "pending":
                                    return "warning"
                                default: 
                                    return "primary"
                            }
                        }
                    const statusText = () => {
                        switch(rowData.status){
                            case "completed":
                                return "Completed"
                            case "work-in-progress":
                                return "Work in Progress"
                            case "pending":
                                return "Pending"
                            default: 
                                return "Unknown Status"
                        }
                    }

                    const rowBackgroundColor = rowData.status === "pending" ? theme.palette.grey[300] : theme.palette.background.paper;
                    const rowFontColor = rowData.status === "pending" ? theme.palette.grey[500] : theme.palette.text.primary;

                    return (
                    <TableRow
                    key={rowData.title}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 }, backgroundColor: rowBackgroundColor }}
                    >
                    <TableCell sx={{color: rowFontColor}} align="left">{rowData.stepId}</TableCell>
                    <TableCell sx={{color: rowFontColor}} component="th" scope="row">
                        {rowData.title}
                    </TableCell>
                    
                    <TableCell sx={{color: rowFontColor}} align="right">{(rowData.totalResponses > 0)?`${rowData.correctResponses}/${rowData.totalResponses}` : "N/A"}</TableCell>
                    <TableCell align="right"><Chip color={chipColor()} label={statusText()} /></TableCell>
                    <TableCell sx={{color: rowFontColor}} align="right">{(rowData.duration > 0)?rowData.duration + " min" : "N/A"}</TableCell>
                    <TableCell align="center" children={
                        <div>
                            <Tooltip title="Configure" enterTouchDelay={0}>
                                <IconButton>
                                    <SettingsIcon/>
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="View Subtask" enterTouchDelay={0}>
                                <IconButton onClick={() => onViewSubtaskClick(index)}>
                                    <VisibilityIcon/>
                                </IconButton>
                            </Tooltip>
                        </div>
                        }></TableCell>
                    </TableRow>
                )})}
                </TableBody>
            </Table>
        </TableContainer>
        );
    }

    function onViewSubtaskClick(index: number) {
        if(subtaskEngineCover.steps[index].status !== "pending") {
            console.log(index, subtaskEngineCover.steps[index].status)
            openStepDetailsById(index+1);
        }
    }

    
    function SecondTabPanel({
        scrollToPage
    }: {
        scrollToPage?: number
    }) {
        const [renderCounter, setRenderCounter] = useState(0) // Just here to force a rerender

        const pageRef = useRef<HTMLElement>(null)

        const onDocumentLoadSuccess = (pdf: PDFDocumentProxy) => {
            setNumPages(pdf.numPages);
        }
        
        useEffect(() => {
            console.log(pageRef.current)
            console.log(renderCounter)
            if(pageRef.current !== null && renderCounter >= 0 && (scrollToPage ?? 0) > 0){
                pageRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
                console.log("Scroll?!")
            }
        }, [renderCounter, scrollToPage])
        

        return (
            <Box display={"flex"} justifyContent={"center"}>
                <Document
                    file={sample}
                    onLoadSuccess={onDocumentLoadSuccess}
                    >
                    {Array.from(
                        new Array(numPages),
                        (el, index) => (
                        <Box key={`box_${index + 1}`} sx={{paddingBottom: '5px'}} ref={index === scrollToPage ? pageRef : undefined}>
                            <Page
                                scale={scalesValues[scaleIndex]}
                                onRenderSuccess={index === scrollToPage ? () => setRenderCounter(renderCounter+1) : undefined}
                                renderTextLayer={false}
                                key={`page_${index + 1}`}
                                pageNumber={index + 1}
                            />
                        </Box>
                        ),
                    )}
                </Document>
            </Box>
        );
    }

    function PdfMenuBar() {
        return (
            <Box sx={{ flexGrow: 1 }}>
                <Grid container direction="row" justifyContent="center" alignItems="center" spacing={3}>
                   
                    <Grid container justifyContent="center" item xs>
                        <IconButton onClick={onMinusClick}>
                            <RemoveIcon></RemoveIcon>
                        </IconButton>
                        <Box sx={{ minWidth: 120 }}>
                            <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                                <InputLabel id="demo-select-small">Scale</InputLabel>
                                <Select
                                    labelId="subtask-overview-scale-select"
                                    id="subtask-overview-scale-select"
                                    value={scaleIndex}
                                    onChange={handleScaleSelectChange}
                                    label="Scale"
                                >
                                    {scalesValues.map((value, index) => {
                                        return (
                                            <MenuItem value={index}>{scaleTexts[index]}</MenuItem>
                                        );
                                    })}
                                
                                </Select>
                            </FormControl>
                        </Box>
                        <IconButton onClick={onPlusClick}>
                            <AddIcon></AddIcon>
                        </IconButton>
                    </Grid>
                   
                </Grid>
          </Box>
        );
    }

    function onPlusClick() {
        if(scaleIndex + 1 < scalesValues.length) {
            setScaleIndex(scaleIndex + 1);
        }
    }

    function onMinusClick() {
        if(scaleIndex - 1 >= 0) {
            setScaleIndex(scaleIndex - 1);
        }
    }

    function handleScaleSelectChange(event: SelectChangeEvent<number>) {
        setScaleIndex(Number(event.target.value));
    }

    

    function handleTabChange(event: React.SyntheticEvent, newValue: number) {
        setTabIndex(newValue);
    }

    function onAddWorkerClick() {
        setAddWorkerDialogOpen(true);
    }

    function onWorkerDialogClose(worker?: Worker){
        if(worker && !workers.find(w => w.id === worker.id)){
            setWorkers((workers) => {
                const newWorkers = workers.concat(worker);
                return newWorkers;
            })
        }
        setAddWorkerDialogOpen(false);
    }

    function handleClick(worker: Worker, index: number) {
        // TODO: Navigation to Profile page
    }

    function handleDelete(worker: Worker, index: number) {
        let list = workers.filter(w => w.id !== worker.id)
        setWorkers(list)
    }
}