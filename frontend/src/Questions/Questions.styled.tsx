import styled from "@emotion/styled";
import { Card, CardProps } from "@mui/material";

const ResultCard = styled(Card)<CardProps>(({theme}) => ({
    backgroundColor: "#fff",
    marginBottom: "15px",
    marginTop: "15px",
}))

export {ResultCard};