import { useNavigate, useParams } from "react-router-dom";
import React, { useCallback, useEffect, useMemo, useRef } from "react";
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
import { Annotation } from "./Annotation";
import { AnswerOption, exampleQuestions, generateAnswerOptions, QuestionData, QuestionState } from "../Questions/QuestionType";
import { QuestionTab } from "../Questions/QuestionTab";
import { WikiTab } from "../Wiki/WikiTab";


type Props = {

}

export type Position = {
    x: number;
    y: number;
}

export type PDFLocation = {
    page: number;
    position: Position;
}

export type AnnotationType = 'comment' | 'box'

export type PDFAnnotation = {
    type: AnnotationType;
    author?: string;
    icon?: string;
    location: PDFLocation;
    text?: string;
}

export type PDFComment = PDFAnnotation & {
    type: "comment";
    text: string;
}

export type PDFBox = PDFAnnotation & {
    type: 'box';
    location2: PDFLocation;
}

const samplePageNumber = 4;

const sampleComment: PDFComment = {
    type: "comment",
    icon: "comment",
    author: "Clara Iversen",
    location: {
        page: samplePageNumber,
        position: {
            x: 30,
            y: 30,
        }
    },
    text: "The sealing often slips here, check twice!"
}

const sampleBoxAnnotation: PDFBox = {
    type: "box",
    location: {
        page: samplePageNumber,
        position: {
            x: 50,
            y: 50,
        }
    },
    location2: {
        page: samplePageNumber,
        position: {
            x: 60,
            y: 60,
        }
    }
}

const annotations: PDFAnnotation[] = [
    sampleComment,
    sampleBoxAnnotation,
]

const StyledLink = styled(Link)(({theme}) => ({
    textDecoration: 'none'
}))

// step overview data
const toolsData = ["Torque Wrench"]

const partsData = [{name: "Engine Cover Part 3", similarItem: "Engine Cover Part 4"}, {name: "Engine Cover Part 7"}]
const descriptionData =  ["Fix the Engine Cover Part 7 with a torque wrench (25 Nm).", "Then, continue with Engine Cover part 3."]

export function StepOverview(props: Props){
    let { id, stepId } = useParams();
    const [tabIndex, setTabIndex] = React.useState<number>(0);
    // for pdf rendering
    const [scaleIndex, setScaleIndex] = React.useState<number>(2); // default value 1.0
    const scalesValues : number[] = [0.5, 0.75, 1.0, 1.25, 1.5, 2.0];
    const scaleTexts = ["50%", "75%",  "100%", "125%", "150%", "200%"];
    const [numPages, setNumPages] = React.useState<number>(0);
    const [pageNumber, setPageNumber] = React.useState(samplePageNumber); // start at 0
    // for questions
    let [questionState, setQuestionState] = React.useState<QuestionState>("question-mode");
    let [questionData, setQuestionData] = React.useState<QuestionData[]>(exampleQuestions);
    let [currentQuestionIndex, setCurrentQuestionIndex] = React.useState<number>(0);
    let [answerOptions, setAnswerOptions] = React.useState<AnswerOption[]>(generateAnswerOptions(questionData[currentQuestionIndex]));
    let [textInput, setTextInput] = React.useState<string>("");

    const annotationMap = useMemo(() => {
        const map = new Map<number, PDFAnnotation[]>();
        annotations.forEach(annotation => {
            let mappedAnnotations = map.get(annotation.location.page);
            if(!mappedAnnotations){
                mappedAnnotations = [annotation];
                map.set(annotation.location.page, mappedAnnotations);
            } else {
                mappedAnnotations.push(annotation);
            }
        });
        return map;
    }, [])

    const navigate = useNavigate()
    //const openQuestions = useCallback(
    //    () => {
    //    navigate(`/task/${id}/step/${stepId}/question`)
    //    },
    //    [id, navigate, stepId]
    //);

    const openMastercardLink = useCallback(
        (page:number) => {
            setPageNumber(page);
            setTabIndex(2);
            console.log(page)
        },[setPageNumber, setTabIndex]
    )

    function openQuestions() {
        setTabIndex(1);
    }

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
                    {<MastercardTabPanel scrollToPage={pageNumber} annotations={annotationMap} />}
                </TabPanel>
                <TabPanel value={tabIndex} index={3}>
                    <WikiTabPanel></WikiTabPanel>
                </TabPanel>
            </Grid>
        </Grid>
    );
   

    function renderOverviewTabPanel() {
        return (
            <div>
                <ToolsCard tools={toolsData}/>
                <PartsCard parts = {partsData}/>
                <DescriptionCard description={descriptionData}/>
                
                <Grid container spacing={1}>
                    <Grid item xs={4}>
                        <Button fullWidth sx={{margin: 0}} color="actionbutton2" variant="contained" onClick={openPrevious}>PREVIOUS STEP</Button>
                    </Grid>
                    <Grid item xs={4}>
                        <Button fullWidth sx={{margin: 0}} color="actionbuttonblue"  variant="contained" onClick={openQuestions} >VIEW QUESTIONS</Button>
                    </Grid>
                    <Grid item xs={4}>
                        <Button fullWidth sx={{margin: 0}} color="actionbuttonblue" disabled={false}  variant="contained" onClick={onFinishStepClick}>FINISH STEP</Button>
                    </Grid>
                </Grid>
            </div>
        );
    }


    function renderQuestionTabPanel() {
        return (
            <QuestionTab textInput={textInput} setTextInput={setTextInput} answerOptions={answerOptions} setAnswerOptions={setAnswerOptions} questionIndex={currentQuestionIndex} setQuestionIndex={(value : number) => setCurrentQuestionIndex(value)} questionState={questionState} questionData={questionData} onQuestionStateChange={setQuestionState} onSubmitCallback={onSubmitAnswer} setQuestionData={setQuestionData}></QuestionTab>
        );
    }

    function onSubmitAnswer(index: number, isCorrect: boolean) {
        // TODO Backend communication
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
        scrollToPage,
        annotations,
    }: {
        scrollToPage?: number,
        annotations?: Map<number, PDFAnnotation[]>,
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
                        (el, index) => {
                            const pageAnnotations = annotations?.get(index + 1);
                        return (
                            <Box sx={{paddingBottom: '5px'}} position={'relative'} ref={(index + 1) === scrollToPage ? pageRef : undefined}>
                                {pageAnnotations?.map(annotation => <Annotation annotation={annotation} />)}
                                <Page
                                    scale={scalesValues[scaleIndex]}
                                    onRenderSuccess={index === scrollToPage ? () => setRenderCounter(renderCounter+1) : undefined}
                                    renderTextLayer={false}
                                    key={`page_${index + 1}`}
                                    pageNumber={index + 1}
                                />
                            </Box>
                        )
                        },
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

    function WikiTabPanel() {
        return (
            <div>
                <WikiTab openLink={openMastercardLink}></WikiTab>
                <h4>TODO: Display some tips, warnings, changes</h4>
            </div>
        );
    }


    function handleTabChange(event: React.SyntheticEvent, newValue: number) {
        setTabIndex(newValue);
    }

}