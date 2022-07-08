import { Avatar, IconButton, SvgIconProps,   } from "@mui/material";
const colorsIcon = {
    colorBackgroundHover: "#18dbb2",
    colorBackground: "#38dbb2",
    colorBorder: "#38dbb2",
    colorIcon: "#fff",
};

type Props = {
    child: React.ReactElement<SvgIconProps>,
    ariaLabel: string,
}


export function ColoredIcon(props: Props) {
    return (
        <Avatar sx={{ backgroundColor: colorsIcon.colorBackgroundHover,}} aria-label="recipe">
            <IconButton sx={{backgroundColor: colorsIcon.colorBackground, borderColor: colorsIcon.colorBorder,  color: colorsIcon.colorIcon, }} aria-label={props.ariaLabel}>
                {props.child}
            </IconButton>
        </Avatar>
    );
}