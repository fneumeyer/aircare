import { Card, CardContent, CardHeader, IconButton, Tooltip,  } from "@mui/material";
import { ColoredIcon } from "./ColoredIcon";
import SettingsIcon from '@mui/icons-material/Settings';
import DescriptionIcon from '@mui/icons-material/Description';
import { BlueCard } from "./BlueCard";


type DescriptionCardProps = {
    description: string[],
}
export function DescriptionCard(props: DescriptionCardProps) {
    return (
        <BlueCard>
            <CardHeader
                titleTypographyProps={{fontSize: "24px", fontWeight: "bold"}}
                avatar={
                    <ColoredIcon child={<DescriptionIcon/>} ariaLabel="description"></ColoredIcon>
                }
                action={
                <Tooltip title="Edit" enterTouchDelay={0}>
                    <IconButton aria-label="settings">
                        <SettingsIcon />
                    </IconButton>
                </Tooltip>
                }
                title="Description"
            />
            <CardContent sx={{paddingTop: 0}}>
                <ul>
                    {props.description.map(item => {
                        return (
                        <li key={item}>{item}</li>
                        );
                    })}
                </ul>
            </CardContent>
        </BlueCard>
    );
}