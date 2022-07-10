import React from "react";
import { CommentData, WikiCard, WikiCardContent, WikiCardProps} from "./WikiCard";



type WikiTabProps = {
    openLink: (page: number) =>  void,
}

const wikiCardTip : WikiCardContent = {
    author: "Felix Neumeyer",
    date: "June 27, 2022",
    title: "Install Engine Cover 7 before Engine Cover 3",
    text: "After installing Engine Cover 7, it is much easier to hold Engine Cover 3 in place and tighten the screws.",
    cardType: "tip",
    comments: [
        { author: "Clara Iversen", date: "July 2, 2022", message: "Great tip!", points: 2 },
        { author: "Lutian Zhang", date: "July 6, 2022", message: "Thanks for the suggestion!", points: 0 },
    ],
    points: 15,
}
const wikiCardWarning : WikiCardContent = {
    author: "Maximilian Geitner",
    date: "June 28, 2022",
    title: "Sealing Damages during Installation of Engine Cover 3",
    text: "The sealings can be easily damaged with the screwdriver, some screws of Engine Cover 3 are difficult to reach.",
    cardType: "warning",
    comments: [
        { author: "Maximilian Pfleger", date: "July 3, 2022", message: "That happened to me, too. Very annoying to install the cover...", points: 4 },
        { author: "Clara Iversen", date: "July 6, 2022", message: "Ask someone to hold the cover, then you can pay more careful on fixing the screws. Have a great day!", points: 0 },
    ],
    points: 15,
}
const wikiCardChangelog: WikiCardContent = {
    author: "Administrator",
    date: "May 4th, 2022",
    title: "Mastercard #3 Changes: New Graphics",
    text: "Some of the new graphics have been added to the document on page 11 and 12. Additionally, two people are recommended for step 1.",
    cardType: "change-notification",
    comments: [],
    points: 25,
    mastercardLink: [{page: 11, title: "New Graphics"}, {page: 1, title: "Step 1"},],
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