import { useNavigate, useParams } from "react-router-dom";
import React, { useCallback } from "react";
import { Avatar, Box, Button, Card, CardContent, CardHeader, IconButton, Tab, Tabs, ThemeProvider, Tooltip } from "@mui/material";
import { TabPanel } from "./TabPanel";
import BuildIcon from '@mui/icons-material/Build';
import SettingsIcon from '@mui/icons-material/Settings';
import DescriptionIcon from '@mui/icons-material/Description';
import InventoryIcon from '@mui/icons-material/Inventory';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';

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
    );
   

    function renderOverviewTabPanel() {
        return (
            <div>
                {renderToolsCard()}
                {renderPartsCard()}
                {renderDescriptionCard()}
                <div className="button-bottom-container">
                    <Button color="actionbutton2" variant="contained" onClick={openPrevious}>PREVIOUS STEP</Button>
                    <Button color="actionbuttonblue"  variant="contained" onClick={openQuestions} >VIEW QUESTIONS</Button>
                    <Button color="actionbuttonblue" disabled={false}  variant="contained" onClick={onFinishStepClick}>FINISH STEP</Button>
                </div>
            </div>
        );
    }

    function renderToolsCard() {
        // #0354bf96
        // 34, 121, 236, 0.37: #2279ec5E
        return (
            <Card style={{backgroundColor:"#2279ec5E", marginBottom: "10px", marginTop: "10px"}}>
                <CardHeader
                    titleTypographyProps={{fontSize: "24px", fontWeight: "bold"}}
                    avatar={
                    <Avatar aria-label="recipe">
                        <IconButton aria-label="tool">
                            <BuildIcon />
                        </IconButton>
                    </Avatar>
                    }
                    action={
                    <Tooltip title="Edit">
                        <IconButton aria-label="settings">
                            <SettingsIcon />
                        </IconButton>
                    </Tooltip>
                    }
                    title="Tools"
                />
                <CardContent>
                    <ul>
                        <li>Torque Wrench</li>
                    </ul>
                </CardContent>
            </Card>
        );
    }
    function renderPartsCard() {
        return (
            <Card style={{backgroundColor:"#2279ec5E", marginBottom: "10px", marginTop: "10px"}}>
                <CardHeader
                    titleTypographyProps={{fontSize: "24px", fontWeight: "bold"}}
                    avatar={
                    <Avatar aria-label="parts">
                        <IconButton aria-label="parts">
                            <InventoryIcon />
                        </IconButton>
                    </Avatar>
                    }
                    action={
                    <Tooltip title="Edit">
                        <IconButton aria-label="settings">
                            <SettingsIcon />
                        </IconButton>
                    </Tooltip>
                    }
                    title="Parts"
                />
                <CardContent>
                    <ul>
                        <li>
                            <div className="parts-row-container">
                                <span>Engine Cover Part 3</span>
                                <Tooltip title="Similar to Engine Cover 4">
                                    <WarningAmberIcon style={{marginLeft: "10px"}}/>
                                </Tooltip>
                            </div>
                        </li>
                        <li>Engine Cover Part 7</li>
                    </ul>
                </CardContent>
            </Card>
        );
    }

    function renderDescriptionCard() {
        return (
            <Card style={{backgroundColor:"#2279ec5E", marginBottom: "10px", marginTop: "10px"}}>
                <CardHeader
                    titleTypographyProps={{fontSize: "24px", fontWeight: "bold"}}
                    avatar={
                    <Avatar aria-label="description">
                        <IconButton aria-label="description">
                            <DescriptionIcon />
                        </IconButton>
                    </Avatar>
                    }
                    action={
                    <Tooltip title="Edit">
                        <IconButton aria-label="settings">
                            <SettingsIcon />
                        </IconButton>
                    </Tooltip>
                    }
                    title="Description"
                />
                <CardContent>
                    <ul>
                        <li>Fix the Engine Cover Part 7 with a torque wrench (25 Nm).</li>
                        <li>Then, continue with Engine Cover part 3.</li>
                    </ul>
                </CardContent>
            </Card>
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