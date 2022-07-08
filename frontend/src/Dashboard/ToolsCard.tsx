import { Card, CardContent, CardHeader, IconButton, Tooltip } from "@mui/material";
import { ColoredIcon } from "./ColoredIcon";
import BuildIcon from '@mui/icons-material/Build';
import SettingsIcon from '@mui/icons-material/Settings';

export function ToolsCard() {
    // #0354bf96
    // 34, 121, 236, 0.37: #2279ec5E
    return (
        <Card style={{backgroundColor:"#2279ec5E", marginBottom: "10px", marginTop: "10px"}}>
            <CardHeader
                titleTypographyProps={{fontSize: "24px", fontWeight: "bold"}}
                avatar={
                <ColoredIcon child={<BuildIcon/>} ariaLabel="tool"></ColoredIcon>
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