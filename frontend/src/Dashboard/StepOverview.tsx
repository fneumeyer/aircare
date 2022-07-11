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
import { PartsCard, PartsData } from "./PartsCard";
import { DescriptionCard } from "./DescriptionCard";
import { Annotation } from "./Annotation";
import { AnswerOption, generateAnswerOptions, QuestionData, QuestionState } from "../Questions/QuestionType";
import { QuestionTab } from "../Questions/QuestionTab";
import { WikiTab } from "../Wiki/WikiTab";
import { WikiCardContent } from "../Wiki/WikiCard";
import { exampleStepData1, subtaskEngineCover } from "../data/StepStaticData";
import { SubtaskData } from "./SubtaskOverview";


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

type StepStatus = "pending" | "work-in-progress" | "completed"

export type StepData = {
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
    let [subtaskData, setSubtaskData] = React.useState<SubtaskData>(initSubtaskData());
    let [stepData, setStepData] = React.useState<StepData>(initStepData(Number(stepId)));
    // for questions and user input

    let [questionData, setQuestionData] = React.useState<QuestionData[]>(initQuestionData());
    let [questionState, setQuestionState] = React.useState<QuestionState>(initQuestionState());
    let [currentQuestionIndex, setCurrentQuestionIndex] = React.useState<number>(0);
    let [answerOptions, setAnswerOptions] = React.useState<AnswerOption[]>([]);
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

    const openSubtaskOverview = useCallback(
        () => {
            navigate(`/task/${id}`);
        }, [id, navigate]
    
    );

    const openStep = useCallback(
        (stepId: number) => {
            navigate(`/task/${id}/step/${stepId}`);
            const nextStepData = initStepData(stepId)
            setStepData(nextStepData);
            resetData(nextStepData);
        }, [id, navigate]
    
    );

    function initQuestionData() {
        return stepData.questionData;
    }

    function initQuestionState() : QuestionState {
        if(stepData.status === "completed" || stepData.questionData.length === stepData.totalResponses){
            return "result-mode";
        }else {
            return "question-mode"; // TODO: read from step state
        }
    }
    function initAnswerOptions() {
        if(stepData.questionData.length > 0) {
            return generateAnswerOptions(stepData.questionData[0]);
        }else {
            return [];
        }
    }

    function resetData(nextStepData: StepData) {
        setQuestionData(nextStepData.questionData);
        setQuestionState(initQuestionState());
        setCurrentQuestionIndex(0);
        setTextInput("");
        
        setAnswerOptions(initAnswerOptions());
    }

    function initSubtaskData() {
        // TODO Add Backend communication here
        return subtaskEngineCover;
    }

    function initStepData(stepId: number) : StepData {
        // TODO Add Backend communication here
        const currentSubtask = subtaskData;
        
        if(stepId >= 1 && stepId <= currentSubtask.steps.length ) {
            if(currentSubtask.steps[stepId - 1].status === "pending") {
                currentSubtask.steps[stepId - 1].status = "work-in-progress";
            }
            return currentSubtask.steps[stepId - 1];
        }else{
            if(currentSubtask.steps[0].status === "pending") {
                currentSubtask.steps[0].status = "work-in-progress";
            }
            return currentSubtask.steps[0];
        }
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
            <h1>{`${subtaskData.title} (${stepId}/${subtaskData.steps.length}) - ${stepData.status}`}</h1>
            <h2>{stepData.context + ": " + stepData.title}</h2>
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
                <ToolsCard tools={stepData.toolsData}/>
                <PartsCard parts = {stepData.partsData}/>
                <DescriptionCard description={stepData.descriptionData}/>
                
                <Grid container spacing={1}>
                    <Grid item xs={4}>
                        <Button fullWidth sx={{margin: 0}} color="actionbutton2" variant="contained" onClick={openPrevious}>PREVIOUS STEP</Button>
                    </Grid>
                    <Grid item xs={4}>
                        <Button fullWidth sx={{margin: 0}} color="actionbuttonblue"  variant="contained" onClick={openQuestions} >VIEW QUESTIONS</Button>
                    </Grid>
                    <Grid item xs={4}>
                        <Button disabled={questionState !== "result-mode"} fullWidth sx={{margin: 0}} color="actionbuttonblue" variant="contained" onClick={onFinishStepClick}>FINISH STEP</Button>
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
        const numStep = Number(stepId);
        if(numStep > 1) {
            // go one step back
            openStep(numStep - 1);
        }else {
            // go to overview
            openSubtaskOverview();
        }
    }

    function onQuestionClick() {
        openQuestions();
    }

    function onFinishStepClick() {
        const numStep = Number(stepId);
        if(numStep < subtaskData.steps.length) {
            // go one step forward
            openStep(numStep + 1);
        }else {
            // go to overview
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
                <WikiTab setWikiContent={setWikiContent} {...stepData} openLink={openMastercardLink}></WikiTab>
            </div>
        );
    }

    function setWikiContent(content: WikiCardContent[]) {
        setStepData({...stepData, wikiEntries: content})
    }


    function handleTabChange(event: React.SyntheticEvent, newValue: number) {
        setTabIndex(newValue);
    }

}