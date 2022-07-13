import { Card, CardContent, CardHeader, IconButton, Tooltip } from "@mui/material";
import { ColoredIcon } from "./ColoredIcon";
import SettingsIcon from '@mui/icons-material/Settings';
import InventoryIcon from '@mui/icons-material/Inventory';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import { BlueCard } from "./BlueCard";

export type PartsData = {
    name: string,
    similarItem?: string,
}

type PartsCardProps = {
    parts: PartsData[],
}

export function PartsCard(props : PartsCardProps) {
    return (
        <BlueCard>
            <CardHeader
                titleTypographyProps={{fontSize: "24px", fontWeight: "bold"}}
                avatar={
                    <ColoredIcon child={<InventoryIcon/>} ariaLabel="parts"></ColoredIcon>
                }
                action={
                <Tooltip title="Edit" enterTouchDelay={0}>
                    <IconButton aria-label="settings">
                        <SettingsIcon />
                    </IconButton>
                </Tooltip>
                }
                title="Parts"
            />
            <CardContent  sx={{paddingTop: 0}}>
                <ul>
                    {
                        props.parts.map(item => {
                            return (
                                <li key={"parts-" + item.name}>
                                    <div className="parts-row-container">
                                        <span>{item.name}</span>
                                        {item.similarItem?
                                            <Tooltip title={`Similar to ${item.similarItem}`} enterTouchDelay={0}>
                                                <WarningAmberIcon style={{marginLeft: "10px"}}/>
                                            </Tooltip> 
                                            : null
                                        }
                                    </div>
                                </li>
                            )
                        })
                    }
                </ul>
            </CardContent>
        </BlueCard>
    );
}