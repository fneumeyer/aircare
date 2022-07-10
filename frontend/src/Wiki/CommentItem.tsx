import { styled, Tooltip, Typography } from "@mui/material";
import {CommentData} from './WikiCard';


const CommentContainer = styled('div')`
    display: flex;
    justify-content: flex-start;
    width: 100%;

    align-items: center;
`;

export function CommentItem(props: CommentData) {


    return (
        <CommentContainer>
            <Tooltip title={props.date}>
                <Typography sx={{marginRight: "15px"}} gutterBottom variant="h6">{props.author}</Typography>
            </Tooltip>
            <Typography gutterBottom variant="body2">{props.message}</Typography>
        </CommentContainer>
    );
}