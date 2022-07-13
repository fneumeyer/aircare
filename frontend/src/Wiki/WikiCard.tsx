import VisibilityIcon from '@mui/icons-material/Visibility';
import PlusOneIcon from '@mui/icons-material/PlusOne';

import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import TipsAndUpdatesIcon from '@mui/icons-material/TipsAndUpdates';
import WarningIcon from '@mui/icons-material/Warning';
import CommentIcon from '@mui/icons-material/Comment';
import { Button, Card, CardActions, CardContent, CardHeader, Collapse, FormControl, IconButton, IconButtonProps, styled, TextField, Tooltip, Typography } from '@mui/material';
import { ColoredIcon } from '../Dashboard/ColoredIcon';

import MenuBookIcon from '@mui/icons-material/MenuBook';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import React, { useCallback, useRef } from 'react';
import { CommentItem } from './CommentItem';
import SendIcon from '@mui/icons-material/Send';
import { useRecoilValue } from 'recoil';
import { userAtom } from './../atoms/user';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';

type WikiCardType = "tip" | "warning" | "change-notification";
type MastercardLinkType = {
    page:number,
    title: string,
}
type WikiCardContent =  {
    author: string,
    date: string,
    title: string,
    text: string,
    cardType: WikiCardType,
    comments: CommentData[],
    points: number,
    mastercardLink?: MastercardLinkType[],
}

type WikiCardProps = {
    content: WikiCardContent,
    addComment: (comment: CommentData) => void,
    openLink: (page: number)=> void,
}

interface ExpandMoreProps extends IconButtonProps {
    expand: boolean;
  }

type CommentData = {
    author: string,
    date: string,
    message: string,
    points: number,
}



type WikiCardUserData = {
    hasBookmark: boolean,
    hasUpvoted: boolean,
}

const ExpandMore = styled((props: ExpandMoreProps) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
  })(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  }));

const BottomContainer = styled('div')`
    display: flex;
    justify-content: space-between;
    width: 100%;
    align-items: center;
`;
const ActionButtonContainer = styled('div')`
    display: flex;
    justify-content: space-evenly;
`;

const ButtonPaddingContainer = styled('div')`
  margin-right: 20px;
`;

const MastercardLinkContainer = styled('div')`
  display: flex;
`;

const styleTips = {backgroundColor:"#2279ec5E", marginBottom: "10px", marginTop: "10px"};
const styleWarning = {backgroundColor:"#f2291bcf", marginBottom: "10px", marginTop: "10px"};

function wikiCardsEqual(oldProps: WikiCardProps, newProps: WikiCardProps){
    return oldProps.content.author === newProps.content.author && oldProps.content.date === newProps.content.date
}

export const WikiCard = React.memo((props: WikiCardProps) => {
    const [userData, setUserData] = React.useState<WikiCardUserData>({hasBookmark: false, hasUpvoted: false});
    const [expanded, setExpanded] = React.useState(true); // TODO avoid rerender that resets state to initial values
    const [textInput, setTextInput] = React.useState("");
    const user = useRecoilValue(userAtom);
    const inputRef = useRef<any>(null);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    
    
    function handleReplyClick() {
        setExpanded(true);
        if(inputRef != null && inputRef.current != null) {
        setTimeout(() =>{
            inputRef.current.focus();
        }, 100)
        
        }
    }

    const onKeyPressed = useCallback(
        (event: React.KeyboardEvent<HTMLDivElement>) => {
            if(event.key === 'Enter') {
                // add new comment
                sendComment();
            }
        }, [sendComment]
    );
    

    //if(props.content.cardType === "tip" || props.content.cardType === "warning") {
        return (
            <div>
                <Card style={(props.content.cardType==="warning"?styleWarning:styleTips)}>
                    <CardHeader
                        titleTypographyProps={{fontSize: "24px", fontWeight: "bold"}}
                        avatar={
                            <WikiCardIcon/>
                        }
                        action={
                        <Tooltip title="Bookmark" enterTouchDelay={0}>
                            <IconButton onClick={onBookmarkClick} aria-label="bookmark">
                                {userData.hasBookmark?<BookmarkIcon /> : <BookmarkBorderIcon/>}
                            </IconButton>
                        </Tooltip>
                        }
                        title={props.content.title}
                        subheader={props.content.author + " on " + props.content.date}
                    />
                    <CardContent>
                        <Typography paragraph>
                            {props.content.text}
                        </Typography>
                        {
                            props.content.mastercardLink?
                            <MastercardLinkContainer>
                                {props.content.mastercardLink.map(item => {
                                    return (
                                        <ButtonPaddingContainer key={"button-padding-container-" + item.title}>
                                            <Tooltip title="Open Mastercard" enterTouchDelay={0}>
                                            <Button variant="outlined" onClick={() =>props.openLink(item.page)}>{item.title}</Button>
                                            </Tooltip>
                                        </ButtonPaddingContainer>
                                    );
                                })
                                }
                            </MastercardLinkContainer>:
                            null
                        }
                    </CardContent>
                    <BottomBar key={"bottom-bar-" + props.content.author + "-" + props.content.date} />
                    <Collapse in={expanded} timeout="auto">
                    <CardContent>
                    {props.content.comments.map(comment => {
                        return (
                            <CommentItem key={props.content.author + props.content.title + "comment-" + comment.author + "-" + comment.date + "-" + comment.message} {...comment}/>
                        )
                    })}
                    </CardContent>
                    <CardContent>
                        <BottomContainer>
                            <FormControl fullWidth>
                                <TextField inputRef={ref => inputRef.current = ref} value={textInput} onKeyDown={onKeyPressed} onChange={onTextFieldChange} variant="standard" label="Enter Comment here">

                                </TextField>
                            </FormControl>
                            <Tooltip title="Send Comment" enterTouchDelay={0}>
                                <IconButton onClick={sendComment}>
                                    <SendIcon></SendIcon>
                                </IconButton>
                            </Tooltip>
                        </BottomContainer>
                    </CardContent>
                </Collapse>
                    
                </Card>
            </div>
        );

    function BottomBar() {
        return (
            <CardActions disableSpacing>
                <BottomContainer>
                <Typography variant="body1">{(props.content.comments.length === 1)? "1 Comment": props.content.comments.length + " Comments"} </Typography>
                <ActionButtonContainer>
                    <Tooltip title="Like" enterTouchDelay={0}>
                        <IconButton aria-label="like">
                            <ThumbUpIcon></ThumbUpIcon>
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Reply" enterTouchDelay={0}>
                        <IconButton onClick={handleReplyClick} aria-label="add to favorites">
                            <CommentIcon />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Report Post" enterTouchDelay={0}>
                        <IconButton aria-label="report">
                        <WarningIcon />
                        </IconButton>
                    </Tooltip>
                
                <ExpandMore
                expand={expanded}
                onClick={handleExpandClick}
                aria-expanded={expanded}
                aria-label="show more"
                >
                <ExpandMoreIcon />
                </ExpandMore>
                </ActionButtonContainer>
                </BottomContainer>
            </CardActions>
        );
    }
  

    function WikiCardIcon() {
        if(props.content.cardType === "tip") {
            return (
                <ColoredIcon child={<TipsAndUpdatesIcon/>} ariaLabel="tips-icon"></ColoredIcon>
            );
        }else if(props.content.cardType === "warning") {
            return (
                <ColoredIcon child={<WarningIcon/>} ariaLabel="warning-icon"></ColoredIcon>
            );
        }else {
            return (
                <ColoredIcon child={<MenuBookIcon/>} ariaLabel="warning-icon"></ColoredIcon>
            );
        }
    }

    
    /*
    function onKeyPressed(event: React.KeyboardEvent<HTMLDivElement>) {
        if(event.key === 'Enter') {
            // add new comment
            sendComment();
        }
    }*/

    function sendComment() {
        if(textInput.length > 0) {
            // format date
            const dateString = new Date().toLocaleDateString('en-us', { year:"numeric", month:"long", day:"numeric"}) ; //weekday:"long", 
            props.addComment({author: user?.firstName + " " + user?.lastName, date: dateString, message: textInput, points: 0},)
            setTextInput("");
        }
        setTimeout(() => {
            console.log(expanded);
        },300);
        
    }

    function onTextFieldChange(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        setTextInput(event.target.value);
        //console.log("hello")
    }

    function onBookmarkClick() {
        setUserData({...userData, hasBookmark: !userData.hasBookmark});
    }
}, wikiCardsEqual)

export type {WikiCardProps, CommentData, WikiCardContent};