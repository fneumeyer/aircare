import { useNavigate, useParams } from "react-router-dom";
import React, { useCallback, useEffect, useMemo, useRef } from "react";
import {Badge, Box, Breadcrumbs, Button, Chip, FormControl, Grid, IconButton, InputLabel, MenuItem, Paper, Select, SelectChangeEvent, styled, Tab, Tabs, Typography } from "@mui/material";
import { TabPanel } from "./TabPanel";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { Link } from "react-router-dom";
import { Document, Page } from 'react-pdf/dist/esm/entry.webpack5';
import { PDFDocumentProxy } from 'react-pdf/node_modules/pdfjs-dist';
import sample from './../assets/regal.pdf';
import { ToolsCard } from "./ToolsCard";
import { PartsCard, PartsData } from "./PartsCard";
import { DescriptionCard } from "./DescriptionCard";
import { Annotation } from "./Annotation";
import { AnswerOption, generateAnswerOptions, QuestionData, QuestionState } from "../Questions/QuestionType";
import { QuestionTab } from "../Questions/QuestionTab";
import { WikiTab } from "../Wiki/WikiTab";
import { WikiCardContent } from "../Wiki/WikiCard";
import { subtaskEngineCover } from "../data/StepStaticData";
import { TaskData } from "./TaskOverview";
import { useTaskData } from "./useTaskData";
import { tasksAtom } from "../atoms/tasks";


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

const samplePageNumber = 12;

const sampleComment: PDFComment = {
    type: "comment",
    icon: "comment",
    author: "Clara Iversen",
    location: {
        page: samplePageNumber,
        position: {
            x: 27,
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

export type StepStatus = "pending" | "work-in-progress" | "completed"

type StepData = {
    subtaskId: number,
    stepId: number,
    title: string,
    context: string,
    toolsData: string[],
    partsData: PartsData[],
    descriptionData: string[],
    relevantPages: number[], // not yet utilized property
    questionData: QuestionData[],
    wikiEntries: WikiCardContent[],
    status: StepStatus,
    duration: number,
    correctResponses: number,
    totalResponses: number,
}

export function StepOverview(props: Props){
    let { id, stepId } = useParams();
    const [tabIndex, setTabIndex] = React.useState<number>(0);
    // for pdf rendering
    const [scaleIndex, setScaleIndex] = React.useState<number>(2); // default value 1.0
    const scalesValues : number[] = [0.5, 0.75, 1.0, 1.25, 1.5, 2.0];
    const scaleTexts = ["50%", "75%",  "100%", "125%", "150%", "200%"];
    const [numPages, setNumPages] = React.useState<number>(0);
    const [pageNumber, setPageNumber] = React.useState(samplePageNumber); // start at 0
    // important data for this screen
    const {task, setTask} = useTaskData({subtaskId: id?id:"0"});
    let [stepData, setStepData] = React.useState<StepData>(initStepData(Number(stepId)));
    // for questions and user input
    let [currentQuestionIndex, setCurrentQuestionIndex] = React.useState<number>(stepData.totalResponses);
    let [questionData, setQuestionData] = React.useState<QuestionData[]>(initQuestionData());
    let [questionState, setQuestionState] = React.useState<QuestionState>(initQuestionState(stepData));
    
    let [answerOptions, setAnswerOptions] = React.useState<AnswerOption[]>(initAnswerOptions());
    let [textInput, setTextInput] = React.useState<string>("");
    let [startTime, setStartTime]= React.useState<number>(Date.now());
    

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

    const setWikiContent = useCallback((
        content: WikiCardContent[]) => {
        setStepData({...stepData, wikiEntries: content})
    }, [setStepData, stepData, ]);

    const openSubtaskOverview = useCallback(
        () => {
            navigate(`/task/${id}`);
        }, [id, navigate, stepData]
    
    );

    const openStep = useCallback(
        (stepId: number) => {
            navigate(`/task/${id}/step/${stepId}`);
            const nextStepData = initStepData(stepId)
            setStepData(nextStepData);
            resetData(nextStepData);
        }, [id, navigate, ]
    
    );

    function saveStepDataInSubtask(data: StepData) {
        console.log("Save", data);
        const index = Number(stepId) - 1;
        let list =  task.steps
        list[index] = data
        
        setTask({...task, steps: list})
    }

    function initQuestionData() {
        return stepData.questionData;
    }

    function initQuestionState(stepData: StepData) : QuestionState {
        if(stepData.status === "completed" || stepData.questionData.length === stepData.totalResponses){
            return "result-mode";
        }else {
            return "question-mode"; // TODO: read from step state
        }
    }
    function initAnswerOptions() {
        if(stepData.questionData.length > 0 && stepData.questionData.length > currentQuestionIndex) {
            return generateAnswerOptions(stepData.questionData[currentQuestionIndex]);
        }else {
            return [];
        }
    }

    function resetData(nextStepData: StepData) {
        setQuestionData(nextStepData.questionData);
        setQuestionState(initQuestionState(nextStepData));
        // start with current index
        setCurrentQuestionIndex(nextStepData.totalResponses);
        // reset user input
        setTextInput("");
        setAnswerOptions(initAnswerOptions());
    }

    function initSubtaskData() {
        // TODO Add Backend communication here
        return subtaskEngineCover;
    }

    function initStepData(stepId: number) : StepData {
        // TODO Add Backend communication here
        const currentSubtask = task; // fetch information from subtask component
        const index = (stepId >= 1 && stepId <= currentSubtask.steps.length)?stepId - 1 : 0;
        // change status, if certain conditions apply
        if(currentSubtask.steps[index].status === "pending") {
            currentSubtask.steps[index].status = "work-in-progress";
        }
        if(currentSubtask.steps[index].status === "work-in-progress" && currentSubtask.steps[index].questionData.length === currentSubtask.steps[index].totalResponses) {
            currentSubtask.steps[index].status = "completed";
        }
        return currentSubtask.steps[index];
        
    }

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


    const remainingOpenQuestions = (questionState === "result-mode")? 0 : ((questionState === "question-mode")?(questionData.length - currentQuestionIndex) : (questionData.length - currentQuestionIndex - 1));
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
            <h1>{`${task.title} (${stepId}/${task.steps.length})${(stepData.status==="completed")?" - Completed":""}`}</h1>
            <h2>{stepData.context + ": " + stepData.title}</h2>
                <Paper>
                <Tabs value={tabIndex} onChange={handleTabChange} centered>
                    <Tab label="Overview" />
                    <Tab label={<span style={{display: 'inline-flex', alignItems: 'center'}}>Questions {(remainingOpenQuestions > 0)?<Chip style={{marginLeft: '5px'}} size="small" label={remainingOpenQuestions} color="primary" /> : null} </span>} />
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
                <ToolsCard tools={stepData.toolsData}/>
                <PartsCard parts = {stepData.partsData}/>
                <DescriptionCard description={stepData.descriptionData}/>
                
                <Grid container spacing={1}>
                    <Grid item xs={4}>
                        <Button fullWidth sx={{margin: 0}} color="actionbuttonblue" variant="contained" onClick={openPrevious}>PREVIOUS STEP</Button>
                    </Grid>
                    <Grid item xs={4}>
                        <Button disabled={questionData.length === 0} fullWidth sx={{margin: 0}} color="actionbuttonblue"  variant="contained" onClick={openQuestions} >VIEW QUESTIONS</Button>
                    </Grid>
                    <Grid item xs={4}>
                        <Button disabled={questionState !== "result-mode"} fullWidth sx={{margin: 0}} color="actionbuttonblue" variant="contained" onClick={onFinishStepClick}>{(stepData.status !== "completed")?"FINISH STEP":"Continue"}</Button>
                    </Grid>
                    <Box height={"110px"}></Box>
                </Grid>
            </div>
        );
    }


    function renderQuestionTabPanel() {
        return (
            <QuestionTab textInput={textInput} setTextInput={setTextInput} answerOptions={answerOptions} setAnswerOptions={setAnswerOptions} questionIndex={currentQuestionIndex} setQuestionIndex={(value : number) => setCurrentQuestionIndex(value)} questionState={questionState} questionData={questionData} onQuestionStateChange={setQuestionState} onSubmitCallback={onSubmitAnswer} setQuestionData={setQuestionData}></QuestionTab>
        );
    }

    function onSubmitAnswer() {
        // TODO Backend communication
        if(stepData.status === "work-in-progress" && currentQuestionIndex < questionData.length) {
            const isCorrect = questionData[currentQuestionIndex].correctUserResponse;
            const totalResp = stepData.totalResponses + 1;
            const correctResp = stepData.correctResponses + (isCorrect? 1: 0);
            
            const nextStepData : StepData = {...stepData, questionData: questionData, totalResponses: totalResp, correctResponses: correctResp, status: (totalResp === stepData.questionData.length)?"completed" : "work-in-progress"}
            setStepData(nextStepData);
            saveStepDataInSubtask(nextStepData);
            //console.log(nextStepData)
        }else if(stepData.status === "work-in-progress") {
            const nextState : StepData = {...stepData, status: "completed"};
            setStepData(nextState);
            saveStepDataInSubtask(nextState);
        }
        //
    }

    function openPrevious() {
        const numStep = Number(stepId);
        if(numStep > 1) {
            // go one step back
            saveStepDataInSubtask({...stepData, questionData: questionData});
            openStep(numStep - 1);
        }else {
            // go to overview
            saveStepDataInSubtask({...stepData, questionData: questionData});
            openSubtaskOverview();
        }
    }

    function onQuestionClick() {
        openQuestions();
    }

    function onFinishStepClick() {
        const numStep = Number(stepId);
        const duration =  (Date.now() - startTime) / 60000 ; 
        const durationMinutes = (stepData.duration === 0)? Math.ceil(duration) : stepData.duration;
        if(numStep < task.steps.length) {
            // go one step forward
           
            const nextStepData : StepData = {...stepData, status: "completed", duration: durationMinutes};
            setStepData(nextStepData); // mark step as completed
            saveStepDataInSubtask(nextStepData);
            openStep(numStep + 1);
        }else {
            // go to overview
            const nextStepData : StepData = {...stepData, status: "completed", duration: durationMinutes};
            setStepData(nextStepData); // mark step as completed
            saveStepDataInSubtask(nextStepData);
            openSubtaskOverview();
        }
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
                <WikiTab key={"wiki-tab-" + stepData.title} setWikiContent={setWikiContent} {...stepData} openLink={openMastercardLink}></WikiTab>
            </div>
        );
    }

    


    function handleTabChange(event: React.SyntheticEvent, newValue: number) {
        setTabIndex(newValue);
    }

}


export type {StepData};