import { StepData } from "../Dashboard/StepOverview";
import { SubtaskData } from "../Dashboard/SubtaskOverview";
import { exampleQuestions, exampleQuestions4 } from "./QuestionData";
import { wikiCardChangelog, wikiCardTip, wikiCardWarning } from "./WikiData";


const toolsData = ["Torque Wrench", "Screwdriver"]
const partsData = [{name: "Engine Cover Part 3", similarItem: "Engine Cover Part 4"}, {name: "Engine Cover Part 7"}]
const descriptionData =  ["Fix the Engine Cover Part 7 with a torque wrench (25 Nm).", "Then, continue with Engine Cover part 3.", "At last, install Engine Cover Part 4."]

const partsData2 = [{name: "Engine Cover ", }, ]
const descriptionData2 =  ["Install engine cover as displayed in the graphics."]

const toolsData3 = ["Torque Wrench", "Screwdriver", "Special GE90 toolkit"]
const partsData3 = [{name: "Engine Cover 1", },{name: "Engine Cover Part 6"}, ]
const descriptionData3 =  ["Start with Engine Cover 6, then continue with Engine Cover 1.", "The covers must not damage nearby pipes and sealings."]

const toolsData4 = ["Headlight", "Screwdriver"]
const partsData4 = [{name: "10 x Pan Head Screws",}, {name: "Engine Cover 5"}]
const descriptionData4 = ["Use special pan head screws for Engine Cover 5.", "Recommendation: Use a headlight for better lightning conditions, some spots are difficult to recognize."]

const exampleStepData1 : StepData = {
    subtaskId: 19871512,
    stepId: 1,
    title: "Engine Bottom Cover",
    context: "Page 3",
    toolsData: toolsData,
    partsData: partsData,
    descriptionData: descriptionData,
    relevantPages: [3],
    questionData: exampleQuestions,
    wikiEntries: [wikiCardTip, wikiCardWarning, wikiCardChangelog],
    status: "completed",
    duration: 15,
    correctResponses: 1,
    totalResponses: 2
}

const exampleStepData2 : StepData = {
    subtaskId: 19871512,
    stepId: 2,
    title: "Engine Top Cover",
    context: "Page 4-5",
    toolsData: toolsData,
    partsData: partsData2,
    descriptionData: descriptionData2,
    relevantPages: [4],
    questionData: [],
    wikiEntries: [],
    status: "completed",
    duration: 25,
    correctResponses: 0,
    totalResponses: 0
}

const exampleStepData3: StepData = {
    subtaskId: 19871512,
    stepId: 3,
    title: "Engine Back Covers",
    context: "Page 6-9",
    toolsData: toolsData3,
    partsData: partsData3,
    descriptionData: descriptionData3,
    relevantPages: [12,13],
    questionData: [],
    wikiEntries: [],
    status: "work-in-progress",
    duration: 0,
    correctResponses: 0,
    totalResponses: 0
}

const exampleStepData4: StepData = {
    subtaskId: 19871512,
    stepId: 4,
    title: "Engine Front Covers",
    context: "Page 9-12",
    toolsData: toolsData4,
    partsData: partsData4,
    descriptionData: descriptionData4,
    relevantPages: [14,15,16],
    questionData: exampleQuestions4,
    wikiEntries: [],
    status: "pending",
    duration: 0,
    correctResponses: 0,
    totalResponses: 0
}

const subtaskEngineCover : SubtaskData = {
    title: "Mastercard #3: Fix Gearing Cover",
    assignedWorkers: [{ id: "lutian-zhang", name: "Lutian Zhang" }],
    mastercard: "pdf-location",
    subtaskId: 19871512,
    steps: [exampleStepData1, exampleStepData2, exampleStepData3, exampleStepData4],
}

export {toolsData, exampleStepData1, subtaskEngineCover};