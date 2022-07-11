import React from "react";
import { wikiCardChangelog, wikiCardTip, wikiCardWarning } from "../data/WikiData";
import { CommentData, WikiCard, WikiCardContent, WikiCardProps} from "./WikiCard";



type WikiTabProps = {
    openLink: (page: number) =>  void,
}

export function WikiTab(props : WikiTabProps) {
    const [wikiContent, setWikiContent] = React.useState<WikiCardContent[]>([wikiCardTip, wikiCardWarning, wikiCardChangelog]);

    return (
        <div>
            {wikiContent.map((wikiCard, index) => {
                return (
                    <WikiCard key={"wiki-card-" + wikiCard.author + "-" + wikiCard.date} content={wikiCard} addComment={(comment) => addComment(index, comment)} openLink={props.openLink}/>
                );
            })
        }
        </div>
    );

    function addComment(index: number, comment: CommentData) {
        let nextArray = wikiContent.slice(0, index);
        console.log(wikiContent.length, index)
        let nextComments = wikiContent[index].comments.concat(comment)
        nextArray = nextArray.concat({...wikiContent[index], comments: nextComments})
        nextArray = nextArray.concat(wikiContent.slice(index+1, wikiContent.length))
        console.log(nextArray)
        setWikiContent(nextArray)
    }
}