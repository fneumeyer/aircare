import styled from "@emotion/styled";
import { Card, CardProps } from "@mui/material";



/*export const ResultCard = styled(Card)`
sx= {
    backgroundColor:"##aaa",
    marginBottom: "15px",
    marginTop: "15px",
}
` */

const ResultCard = styled(Card)<CardProps>(({theme}) => ({
    backgroundColor: "#fff",
    marginBottom: "15px",
    marginTop: "15px",
}))

export {ResultCard};