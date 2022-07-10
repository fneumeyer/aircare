import { Card, CardContent, CardHeader, IconButton, Tooltip } from "@mui/material";
import { ColoredIcon } from "./ColoredIcon";
import SettingsIcon from '@mui/icons-material/Settings';
import InventoryIcon from '@mui/icons-material/Inventory';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';

type PartsData = {
    name: string,
    similarItem?: string,
}

type PartsCardProps = {
    parts: PartsData[],
}

export function PartsCard(props : PartsCardProps) {
    return (
        <Card style={{backgroundColor:"#2279ec5E", marginBottom: "10px", marginTop: "10px"}}>
            <CardHeader
                titleTypographyProps={{fontSize: "24px", fontWeight: "bold"}}
                avatar={
                    <ColoredIcon child={<InventoryIcon/>} ariaLabel="parts"></ColoredIcon>
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
                    {
                        props.parts.map(item => {
                            return (
                                <li>
                                    <div className="parts-row-container">
                                        <span>{item.name}</span>
                                        {item.similarItem?
                                            <Tooltip title={`Similar to ${item.similarItem}`}>
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
        </Card>
    );
}