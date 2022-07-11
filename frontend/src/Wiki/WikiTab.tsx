import { Box, Button } from "@mui/material";
import React from "react";
import { wikiCardChangelog, wikiCardTip, wikiCardWarning } from "../data/WikiData";
import { CommentData, WikiCard, WikiCardContent, WikiCardProps} from "./WikiCard";



type WikiTabProps = {
    openLink: (page: number) =>  void,
    wikiEntries: WikiCardContent[],
    setWikiContent: (array: WikiCardContent[]) => void,
}

export function WikiTab(props : WikiTabProps) {
    //const [wikiContent, setWikiContent] = React.useState<WikiCardContent[]>([wikiCardTip, wikiCardWarning, wikiCardChangelog]);

    return <>
        <Box display='flex'>
            <Button startIcon="Create" variant="contained">Create Entry</Button>
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

    function addComment(index: number, comment: CommentData) {
        let wikiContent = props.wikiEntries
        let nextArray = wikiContent.slice(0, index);
        console.log(wikiContent.length, index)
        let nextComments = wikiContent[index].comments.concat(comment)
        nextArray = nextArray.concat({...wikiContent[index], comments: nextComments})
        nextArray = nextArray.concat(wikiContent.slice(index+1, wikiContent.length))
        console.log(nextArray)
        props.setWikiContent(nextArray)
    }
}