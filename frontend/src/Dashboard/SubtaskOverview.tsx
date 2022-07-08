
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

const StyledLink = styled(Link)(({theme}) => ({
    textDecoration: 'none'
}))

export function SubtaskOverview(props: Props){
    let { id, } = useParams();
    const [open, setOpen] = React.useState(false);
    const  [textWorkerInput, setTextWorkerInput] = React.useState("");
    const [workers, setWorkers] = React.useState<Worker[]>([{id: "abc", name: "Lutian"}]);
    const [tabIndex, setTabIndex] = React.useState<number>(0);

    const [scaleIndex, setScaleIndex] = React.useState<number>(2); // default value 1.0
    const scalesValues : number[] = [0.5, 0.75, 1.0, 1.25, 1.5, 2.0];
    const scaleTexts = ["50%", "75%",  "100%", "125%", "150%", "200%"];
    /*const [users, setUsers] = useState<IUser[]>([]);
    
    useEffect(() => {
        client.service('users').find({
            query: {
                $limit: 100
            }
        }).then(users => {
            setUsers(users)
        })
    }, [])
    
    const filteredWorkers = useMemo<IUser[]>(() => {
        return users.filter(worker => {
            const match = `${worker.firstName} ${worker.lastName}`.match(`${textWorkerInput}`);
            return match !== null;
        })
    }, [textWorkerInput, workers])*/

    const [numPages, setNumPages] = React.useState<number>(0);
    const [pageNumber, setPageNumber] = React.useState(0); // start at 0

    const navigate = useNavigate()
    const openStepDetails = useCallback(
        () => {
        navigate(`/task/${id}/step/${1}`)
        },
        [navigate]
    );

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
                <Button id="submit-answer-button" color="actionbutton" variant="contained" onClick={openStepDetails}>START TASK</Button>
            </div>
        </div>
        );
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
                    <TableCell align="center" children={
                        <div>
                            <Tooltip title="Configure">
                                <IconButton>
                                    <SettingsIcon/>
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="View Subtask">
                                <IconButton>
                                    <VisibilityIcon/>
                                </IconButton>
                            </Tooltip>
                        </div>
                        }></TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
        </TableContainer>
        );
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
                        <Box ref={index === scrollToPage ? pageRef : undefined}>
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
        // TODO: Navigation to Profile page
    }

    function handleDelete(worker: Worker, index: number) {
        let list = workers.filter(w => w.id !== worker.id)
        setWorkers(list)
    }
}