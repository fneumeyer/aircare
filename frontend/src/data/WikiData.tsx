import { WikiCardContent } from "../Wiki/WikiCard"

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

const wikiCardTip2 : WikiCardContent = {
    author: "Felix Neumeyer",
    date: "June 13, 2022",
    title: "Inspection of O-seals before installation",
    text: "I noticed the last few times that the o-seals below the cover to be prone to damages. I recommend checking them before putting on the engine cover.",
    cardType: "tip",
    comments: [
        { author: "Lutian Zhang", date: "June 15, 2022", message: "Thanks for the suggestion!", points: 3 },
        { author: "Maximilian Geitner", date: "June 22, 2022", message: "Before the installation, I didn't find any damages. But after installing a few parts, I noticed one of the damaged o-seals. I think it has to do something with this step.", points: 2 },
        
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

const wikiCardWarning2 : WikiCardContent = {
    author: "Maximilian Geitner",
    date: "June 28, 2022",
    title: "O-Seals Damages during Front Cover Installation",
    text: "The sealings can be easily damaged during installation of the more heavy covers, I would recommend to do this task with at least two people.",
    cardType: "warning",
    comments: [
        { author: "Maximilian Pfleger", date: "June 28, 2022", message: "That happened to me, too. It's so stressful to hold the cover in place and tighten the bolts...", points: 4 },
        { author: "Clara Iversen", date: "July 1, 2022", message: "I put a marker on the mastercard for better visibility of the problem. there Have a great day!", points: 0 },
    ],
    points: 15,
}

const wikiCardChangelog: WikiCardContent = {
    author: "Administrator",
    date: "May 4, 2022",
    title: "Mastercard #3 Changes: New Graphics",
    text: "Some of the new graphics have been added to the document on page 11 and 12. Additionally, two people are recommended for step 1.",
    cardType: "change-notification",
    comments: [],
    points: 25,
    mastercardLink: [{page: 11, title: "New Graphics"}, {page: 1, title: "Step 1"},],
}

const wikiCardChangelog2: WikiCardContent = {
    author: "Administrator",
    date: "July 5, 2022",
    title: "Mastercard #3 Changes: New Graphics",
    text: "Some of the new graphics have been added to the document on page 11 and 12. Be aware of problems at o-seal installation at page 12 (Step 4).",
    cardType: "change-notification",
    comments: [],
    points: 25,
    mastercardLink: [{page: 11, title: "New Graphics"}, {page: 12, title: "O-Seal installation"},],
}

const wikiEntries4New = [wikiCardTip2, wikiCardWarning2, wikiCardChangelog2]

export {wikiCardChangelog,wikiCardChangelog2, wikiCardWarning, wikiCardTip, wikiEntries4New};