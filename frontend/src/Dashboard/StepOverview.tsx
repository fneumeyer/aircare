import { useNavigate, useParams } from "react-router-dom";
import React, { useCallback, useEffect, useRef } from "react";
import {Box, Breadcrumbs, Button, FormControl, Grid, IconButton, InputLabel, MenuItem, Paper, Select, SelectChangeEvent, styled, Tab, Tabs, Typography } from "@mui/material";
import { TabPanel } from "./TabPanel";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { Link } from "react-router-dom";
import { Document, Page } from 'react-pdf/dist/esm/entry.webpack5';
import { PDFDocumentProxy } from 'react-pdf/node_modules/pdfjs-dist';
import sample from './../assets/regal.pdf';
import { ToolsCard } from "./ToolsCard";
import { PartsCard } from "./PartsCard";
import { DescriptionCard } from "./DescriptionCard";


type Props = {

}



const StyledLink = styled(Link)(({theme}) => ({
    textDecoration: 'none'
}))

export function StepOverview(props: Props){
    let { id, stepId } = useParams();
    const [tabIndex, setTabIndex] = React.useState<number>(0);
    // for pdf rendering
    const [scaleIndex, setScaleIndex] = React.useState<number>(2); // default value 1.0
    const scalesValues : number[] = [0.5, 0.75, 1.0, 1.25, 1.5, 2.0];
    const scaleTexts = ["50%", "75%",  "100%", "125%", "150%", "200%"];
    const [numPages, setNumPages] = React.useState<number>(0);
    const [pageNumber, setPageNumber] = React.useState(0); // start at 0

    const navigate = useNavigate()
    const openQuestions = useCallback(
        () => {
        navigate(`/task/${id}/step/${stepId}/question`)
        },
        [id, navigate, stepId]
    );

    return (
        <Grid container sx={{height: '100%'}} spacing={2} direction="column">

        <Grid item xs="auto"> 
            <div style={{marginTop: "5px"}}>
                <Breadcrumbs aria-label="breadcrumb">
                    <StyledLink color="inherit" to="/">
                        Home
                    </StyledLink>
                    <StyledLink
                        color="inherit"
                        to={`/task/${id}`}
                    >
                    Task
                    </StyledLink>
                    <Typography color="text.primary">Subtask</Typography>
                </Breadcrumbs>
            </div>
            </Grid>
            <Grid item xs="auto"> 
            <h1>Mastercard #3: Fix Gearing Cover</h1>
            <h2>Page 3, Step 1: Install Engine Bottom Cover</h2>
                <Paper>
                <Tabs value={tabIndex} onChange={handleTabChange} centered>
                    <Tab label="Overview" />
                    <Tab label="Questions"/>
                    <Tab label="Mastercard"/>
                    <Tab label="WIKI" />
                </Tabs>
                </Paper>
                {(tabIndex === 2) ?<PdfMenuBar></PdfMenuBar> : null}
            </Grid>
            <Grid item xs sx={{overflow: 'auto'}}>
                <TabPanel value={tabIndex} index={0}>
                    {renderOverviewTabPanel()}
                </TabPanel>
                <TabPanel value={tabIndex} index={1}>
                    {renderQuestionTabPanel()}
                </TabPanel>
                <TabPanel value={tabIndex} index={2}>
                    {<MastercardTabPanel />}
                </TabPanel>
                <TabPanel value={tabIndex} index={3}>
                    {renderWikiTabPanel()}
                </TabPanel>
            </Grid>
        </Grid>
    );
   

    function renderOverviewTabPanel() {
        return (
            <div>
                <ToolsCard/>
                <PartsCard/>
                <DescriptionCard/>
                <div className="button-bottom-container">
                    <Button color="actionbutton2" variant="contained" onClick={openPrevious}>PREVIOUS STEP</Button>
                    <Button color="actionbuttonblue"  variant="contained" onClick={openQuestions} >VIEW QUESTIONS</Button>
                    <Button color="actionbuttonblue" disabled={false}  variant="contained" onClick={onFinishStepClick}>FINISH STEP</Button>
                </div>
            </div>
        );
    }


    function renderQuestionTabPanel() {
        return (
            <h4>TODO Question and Answer Tab</h4>
        );
    }

    function openPrevious() {
        
    }

    function onQuestionClick() {
        openQuestions();
    }

    function onFinishStepClick() {

    }

    function onHeaderClick() {
        console.log("Hello")
    }

    function MastercardTabPanel({
        scrollToPage
    }: {
        scrollToPage?: number
    }) {
        const [renderCounter, setRenderCounter] = React.useState(0) // Just here to force a rerender

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

    function renderWikiTabPanel() {
        return (
            <div>
                <h4>TODO: WIKI Page</h4>
                <h4>TODO: Display some tips, warnings, changes</h4>
            </div>
        );
    }


    function handleTabChange(event: React.SyntheticEvent, newValue: number) {
        setTabIndex(newValue);
    }

}