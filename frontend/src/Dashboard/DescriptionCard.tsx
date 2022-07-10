import { Card, CardContent, CardHeader, IconButton, Tooltip,  } from "@mui/material";
import { ColoredIcon } from "./ColoredIcon";
import SettingsIcon from '@mui/icons-material/Settings';
import DescriptionIcon from '@mui/icons-material/Description';


type DescriptionCardProps = {
    description: string[],
}
export function DescriptionCard(props: DescriptionCardProps) {
    return (
        <Card style={{backgroundColor:"#2279ec5E", marginBottom: "10px", marginTop: "10px"}}>
            <CardHeader
                titleTypographyProps={{fontSize: "24px", fontWeight: "bold"}}
                avatar={
                    <ColoredIcon child={<DescriptionIcon/>} ariaLabel="description"></ColoredIcon>
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
                    {props.description.map(item => {
                        return (
                        <li key={item}>{item}</li>
                        );
                    })}
                </ul>
            </CardContent>
        </Card>
    );
}