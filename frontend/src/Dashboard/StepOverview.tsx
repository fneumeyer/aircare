import { useNavigate, useParams } from "react-router-dom";
import React, { useCallback } from "react";
import { Box, Button, Tab, Tabs, ThemeProvider } from "@mui/material";
import { TabPanel } from "./TabPanel";
import { theme } from "../theme";

type Props = {

}

export function StepOverview(props: Props){
    let { id, stepId } = useParams();
    const [tabIndex, setTabIndex] = React.useState<number>(0);
    const navigate = useNavigate()
    const openQuestions = useCallback(
        () => {
        navigate(`/task/${id}/step/${stepId}/question`)
        },
        [navigate]
    );

    return (
        /*<ThemeProvider  theme={theme} children={*/
        <div className="root-container">
            <h1>Mastercard #3: Fix Gearing Cover</h1>
            <h2>Page 3, Step 1: Install Engine Bottom Cover</h2>
            <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
                <Tabs value={tabIndex} onChange={handleTabChange} centered>
                    <Tab label="Overview" />
                    <Tab label="Mastercard"/>
                    <Tab label="WIKI" />
                </Tabs>
            </Box>
            <TabPanel value={tabIndex} index={0}>
                {renderOverviewTabPanel()}
            
            </TabPanel>
            <TabPanel value={tabIndex} index={1}>
            {renderSecondTabPanel()}
            </TabPanel>
            <TabPanel value={tabIndex} index={2}>
                {renderWikiTabPanel()}
            </TabPanel>

        </div>
        /*}/>*/
    );

    function renderOverviewTabPanel() {
        return (
            <div>
                <h4>TODO: Previous step button</h4>
                <h4>TODO: Question Button</h4>
                <h4>TODO: Next step button</h4>
                <div className="button-bottom-container">
                <Button color="actionbutton" variant="large" onClick={openQuestions} >VIEW QUESTIONS</Button>
                <Button color="actionbutton" disabled={false}  variant="large" onClick={onFinishStepClick}>FINISH STEP</Button>
                </div>
            </div>
        );
    }

    function onQuestionClick() {
        openQuestions();
    }

    function onFinishStepClick() {

    }

    function renderSecondTabPanel() {
        return (
            <div>
                <h4>TODO: Mastercard</h4>
            </div>
        );
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