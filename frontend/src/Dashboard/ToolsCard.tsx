import { Card, CardContent, CardHeader, IconButton, Tooltip } from "@mui/material";
import { ColoredIcon } from "./ColoredIcon";
import BuildIcon from '@mui/icons-material/Build';
import SettingsIcon from '@mui/icons-material/Settings';
import { BlueCard } from "./BlueCard";




type ToolProps = {
    tools: String[],
}

export function ToolsCard(props : ToolProps) {
    // #0354bf96
    // 34, 121, 236, 0.37: #2279ec5E
    return (
        <BlueCard>
            <CardHeader
                titleTypographyProps={{fontSize: "24px", fontWeight: "bold"}}
                avatar={
                <ColoredIcon child={<BuildIcon/>} ariaLabel="tool"></ColoredIcon>
                }
                action={
                <Tooltip title="Edit" enterTouchDelay={0}>
                    <IconButton aria-label="settings">
                        <SettingsIcon />
                    </IconButton>
                </Tooltip>
                }
                title="Tools"
            />
            <CardContent sx={{paddingTop: 0}}>
                <ul>
                    {
                        props.tools.map(item => {
                            return (
                                <li  key={"tools-" + item}>{item}</li>
                            );
                        })
                    }
                </ul>
            </CardContent>
        </BlueCard>
    );
}