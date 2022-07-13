import styled from "@emotion/styled";
import { Card, CardProps } from "@mui/material";


const BlueCard = styled(Card)<CardProps>(({theme}) => ({
    backgroundColor:"#2279ec5E",
    marginBottom: "10px",
    marginTop: "10px",
}))


export {BlueCard};