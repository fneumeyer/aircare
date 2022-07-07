import { Button, Checkbox, FilledInput, FormControl, FormControlLabel, InputAdornment, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./../App.css"

type Props = {

};
type QuestionType = "textfield" | "checkbox" | "step-order";

// TODO: Is caseSensitive Attribute required for textfield string answers?
type QuestionData = {type: "textfield", stepLocation: string, title: string, correctAnswer: string | number, unit: string, } |
    {type: "checkbox", stepLocation: string, title: string, correctAnswers: string[], incorrectAnswers: string[], answersToShow: number, }
    

type AnswerOption = {text: string, isCorrect: boolean, userValue: boolean}; // for checkbox state management
type QuestionState = "answer-mode" | "question-mode";

export function Question (prop: Props) {
    // let { id, stepId } = useParams();
    let [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);


    const exampleQuestions : QuestionData[] = [{type: "textfield", stepLocation: "Page 3: Section 2", title: "Please specify the used torque for this step: ", correctAnswer: 25, unit: "Nm"},
        {type: "checkbox", stepLocation: "Page 3: Section 2", title: "Which of the following parts are used in the next step?", correctAnswers: ["Engine Cover Part 3", "Engine Cover Part 7"], incorrectAnswers: ["Engine Cover Part 1", "Engine Cover Part 5"], answersToShow: 4,},
    ];

    let [questionData, setQuestionData] = useState<QuestionData[]>(exampleQuestions);
    let [questionState, setQuestionState] = useState<QuestionState>("question-mode");
    let currentQuestion = questionData[currentQuestionIndex];
    let [answerOptions, setAnswerOptions] = useState<AnswerOption[]>(initCurrentQuestion(0));
    let [textInput, setTextInput] = useState<string>("");
    let [solutionText, setSolutionText] = useState<string>("");


    return (
        // TODO: Replace placeholder data
        <div className="root-container">
                <h1>Mastercard #3: Engine Covers</h1>
                <div className="question-header-container">
                    <span id="question-section-text">{currentQuestion.stepLocation}</span>
                    <span id="question-position-text">{"Question " + (currentQuestionIndex+1) + "/" + questionData.length}</span>
                </div>
                <h2>{currentQuestion.title}</h2>
                {renderQuestionTextfield()}
                {renderQuestionCheckbox()}
                {(questionState === "answer-mode") ? <h2> {solutionText}</h2> : null}
                <div className="button-bottom-container">
                    {renderButtons()}
                </div>
            <h3>Related Ressource: </h3>
        </div>
    );

    
    // event to submit an answer
    function onSubmitClick() {
        setQuestionState("answer-mode");
        if(currentQuestion.type === "textfield") {
            if(typeof(currentQuestion.correctAnswer) === "number") {
                // user input value must have a certain precision (0.00001)
                if(Math.abs(currentQuestion.correctAnswer - Number(textInput)) < 0.00001) {
                    setSolutionText("The answer is correct!");
                }else {
                    setSolutionText("The answer is incorrect! Correct Value: " + currentQuestion.correctAnswer + " " + currentQuestion.unit);
                }

            }else if(typeof(currentQuestion.correctAnswer) === "string") {
                // string answer is case sensitive
                if(currentQuestion.correctAnswer === textInput) {
                    setSolutionText("The answer is correct!");
                }else {
                    setSolutionText("The answer is incorrect! Correct Value: " + currentQuestion.correctAnswer);
                }
            }
        }else if(currentQuestion.type === "checkbox") {
            // count amount of correct answers
            const counterCorrectAnswers : number = answerOptions.filter(item => item.isCorrect === item.userValue).length;
            if(counterCorrectAnswers === 0) {
                setSolutionText("The answer is incorrect!");
            }else if(counterCorrectAnswers < answerOptions.length) {
                setSolutionText("The answer is partially correct! (" + counterCorrectAnswers + "/" + answerOptions.length + ")");
            }else {
                setSolutionText("The answer is correct!");
            }
        }
    }
    function onNextClick() {
        // check whether next question is available
        if(currentQuestionIndex + 1 < questionData.length) {
            const nextValue = currentQuestionIndex + 1;
            setAnswerOptions(initCurrentQuestion(nextValue));
            setCurrentQuestionIndex(nextValue);
            setQuestionState("question-mode")
        }else {
            // no question is available anymore
            // switch to task screen
            
        }
    }

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        setTextInput(event.target.value);
    }

    function renderButtons() {
        if(questionState === "question-mode") {
            return <Button className="question-button" id="submit-answer-button" variant="contained" onClick={onSubmitClick}>Submit answer</Button>
        }else{
            return <Button className="question-button" id="question-next-button" variant="contained" onClick={onNextClick}>{currentQuestionIndex + 1 < questionData.length ? "Next Question" : "Continue"}</Button>
        }
    }

    function renderQuestionTextfield() {
        if(currentQuestion.type === "textfield")
            return (
                <div className="question-input-container">
                    <FormControl sx={{ m: 1, width: '25ch' }} variant="filled" disabled={questionState=== "answer-mode"}>
                    <FilledInput
                        id="question-text-input" 
                        endAdornment={<InputAdornment position="end">{currentQuestion.unit}</InputAdornment>}
                        value={textInput}
                        onChange={handleChange}
                    />
                    </FormControl>
                    
                </div>
            );
            //<span id="question-unit-text">{currentQuestion.unit}</span>
    }

    // Shuffle array - https://stackoverflow.com/a/2450976
    function shuffle(array: AnswerOption[]) {
        let currentIndex = array.length,  randomIndex;
      
        // While there remain elements to shuffle.
        while (currentIndex != 0) {
      
          // Pick a remaining element.
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex--;
      
          // And swap it with the current element.
          [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
        }
      
        return array;
      }

    function initCurrentQuestion(index: number) {
        console.log("Call")
        const question = questionData[index];
        // aggregate correct and incorrect answers
        if(question.type === "checkbox") {
            let answerOptions : AnswerOption[] = question.correctAnswers.map(item => {
                return {text: item, isCorrect: true, userValue: false}
            });
            // add incorrect answers
            let incOptions : AnswerOption[] = question.incorrectAnswers.map(item => {
                return {text: item, isCorrect: false, userValue: false}
            });
            incOptions = shuffle(incOptions);
            const ctrIncorrect = (question.answersToShow === 0) ? incOptions.length : question.answersToShow - answerOptions.length; // keep only a few options, case 0: show all answer options
            incOptions = incOptions.slice(0, ctrIncorrect);
            let allOptions : AnswerOption[] = answerOptions.concat(incOptions);
            allOptions = shuffle(allOptions);
            return allOptions;
            //console.log(allOptions);
        }else {
            return [];
        }
    }
    
    function handleCheckboxChange(index: number, event: React.ChangeEvent<HTMLInputElement>) {
        if(questionState === "question-mode") {
            // if answers are accepted, change value
            console.log(event.target.checked);
            let nextArray = answerOptions.slice(0, index)
            let nextObj : AnswerOption = {...answerOptions[index], userValue: event.target.checked};
            nextArray.push(nextObj)
            nextArray = nextArray.concat(answerOptions.slice(index + 1, answerOptions.length))
            setAnswerOptions(nextArray);
            console.log(answerOptions);
        }else {
           
        }
    }

    // className={!isQuestionState && item.userValue=== item.isCorrect ? "chk-correct": (!isQuestionState ? "chk-incorrect" : "")}
    function renderQuestionCheckbox() {
        if(currentQuestion.type === "checkbox")
            return (
                <div className="question-checkbox-container">
                    {answerOptions.map(function (item: AnswerOption, index: number) {
                        return <FormControlLabel 
                            
                            label={item.text}
                            key={"fcl" + item.text + ""}
                            control = {
                                <div>
                                <Checkbox
                                    disableRipple={questionState === "answer-mode"}
                                    checked={item.userValue}
                                    onChange={(event) => handleCheckboxChange(index, event)}
                                    key={"chk" + item.text + ""}
                                    size="medium" 
                                    sx={{ '& .MuiSvgIcon-root': { fontSize: 34 }}} 
                                />
                                {(questionState === "answer-mode")? <Checkbox
                                    disableRipple={true}
                                    checked={ item.isCorrect}
                                    onChange={(event) => handleCheckboxChange(index, event)}
                                    color="success"
                                    key={"chk2" + item.text + ""}
                                    size="medium" 
                                    sx={{ '& .MuiSvgIcon-root': { fontSize: 34 }}} 
                                /> : null}
                                </div>
                                }
                            />
                    })}
                </div>
            );
    }

}

