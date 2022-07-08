import { Card, CardContent, CardHeader, IconButton, Tooltip } from "@mui/material";
import { ColoredIcon } from "./ColoredIcon";
import SettingsIcon from '@mui/icons-material/Settings';
import InventoryIcon from '@mui/icons-material/Inventory';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';

export function PartsCard() {
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