import { IconButton, Tooltip } from "@mui/material";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
type ResponseStatusIconProps = {
    correctUserResponse: boolean,
    tag: string,
}

export function ResponseStatusIcon(props: ResponseStatusIconProps) {
    if(props.correctUserResponse){
        return (
            <Tooltip key={"tooltip-" + props.tag} title="Correctly Answered" enterTouchDelay={0}>
                <IconButton key={"check-icon-button-" + props.tag} disableRipple={true} disableTouchRipple={true}>
                    <CheckCircleIcon key={"check-icon-" + props.tag} inheritViewBox  sx={{color: "green", fontSize: "24px"}}></CheckCircleIcon>
                </IconButton>
            </Tooltip>
        );
    }else {
        return (
            <Tooltip key={"tooltip" + props.tag} title="Incorrectly Answered" enterTouchDelay={0}>
                <IconButton key={"check-icon-button-" + props.tag} disableRipple={true} disableTouchRipple={true}>
                    <CancelIcon key={"check-icon-" + props.tag} inheritViewBox  sx={{color: "red", fontSize: "24px"}}></CancelIcon>
                </IconButton>
            </Tooltip>
        );
    }
}