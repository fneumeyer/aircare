import { Box, Button } from "@mui/material";
import React, { useCallback } from "react";
import { wikiCardChangelog, wikiCardTip, wikiCardWarning } from "../data/WikiData";
import { CommentData, WikiCard, WikiCardContent, WikiCardProps} from "./WikiCard";
import CreateIcon from '@mui/icons-material/Create';


type WikiTabProps = {
    openLink: (page: number) =>  void,
    wikiEntries: WikiCardContent[],
    setWikiContent: (array: WikiCardContent[]) => void,
}



export function WikiTab(props : WikiTabProps) {
    //const [wikiContent, setWikiContent] = React.useState<WikiCardContent[]>([wikiCardTip, wikiCardWarning, wikiCardChangelog]);
    console.log("Rerender Tab")
    
    const addComment = useCallback (
        (index: number, comment: CommentData) => {
            let wikiContent = props.wikiEntries
            let nextArray = wikiContent.slice(0, index);
            let nextComments = wikiContent[index].comments.concat(comment)
            nextArray.push({...wikiContent[index], comments: nextComments})
            nextArray = nextArray.concat(wikiContent.slice(index+1, wikiContent.length))
            props.setWikiContent(nextArray)
        }, [props.wikiEntries]);
    

    return <>
        <Box display='flex' justifyContent='flex-end'>
            <Button startIcon={<CreateIcon />} variant="contained">Create Entry</Button>
        </Box>
        <div>
            {props.wikiEntries.map((wikiCard, index) => {
                return (
                    <WikiCard key={"wiki-card-" + wikiCard.author + "-" + wikiCard.date} content={wikiCard} addComment={(comment) => addComment(index, comment)} openLink={props.openLink}/>
                );
            })
        }
        </div>
    </>;

   

    /*function addComment(index: number, comment: CommentData) {
        let wikiContent = props.wikiEntries
        let nextArray = wikiContent.slice(0, index);
        let nextComments = wikiContent[index].comments.concat(comment)
        nextArray = nextArray.concat({...wikiContent[index], comments: nextComments})
        nextArray = nextArray.concat(wikiContent.slice(index+1, wikiContent.length))
        props.setWikiContent(nextArray)
    }*/
}