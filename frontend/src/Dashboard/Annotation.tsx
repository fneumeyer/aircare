import { AccountCircle, Cancel, Comment, Send } from "@mui/icons-material";
import { Avatar, Box, Card, CardContent, CardHeader, Divider, Grid, IconButton, TextField } from "@mui/material";
import { red } from "@mui/material/colors";
import { useCallback, useMemo, useState } from "react";
import { PDFAnnotation } from "./StepOverview"

type Props = {
  annotation: PDFAnnotation
}

export function Annotation({annotation}: Props){
  
  const [show, setShow] = useState<boolean>(false);

  const onClickComment = useCallback(() => {
    setShow(true);
  }, [])

  const onCloseComment = useCallback(() => {
    setShow(false);
  }, [])

  const annotationComponent = useMemo(() => {
    switch(annotation.type){
      case 'comment':
        return <>
          <div style={{
            position: 'absolute',
            left: `${annotation.location.position.x}%`,
            top: `${annotation.location.position.y}%`,
            zIndex: 100,
            }}
          >
            {annotation.icon ? <IconButton onClick={onClickComment}><Comment sx={{color: red[300]}} /></IconButton> : null}
            {show && <Box sx={{width: '30vw'}}>
              <Card elevation={5}>
                <CardHeader
                  avatar={
                    <Avatar sx={{ bgcolor: red[300] }} aria-label="recipe">
                      {annotation.author?.charAt(0).toUpperCase()}
                    </Avatar>
                  }
                  action={
                    <IconButton onClick={onCloseComment} aria-label="close">
                      <Cancel />
                    </IconButton>
                  }
                  title={annotation.author}
                  subheader="June 14, 2022"
                />
                <CardContent>
                  <Grid spacing={2} container>
                    <Grid item xs={12}>
                      {annotation?.text}
                      <Divider></Divider>
                    </Grid>
                    <Grid item xs>
                      <TextField multiline sx={{width: "100%", padding: '0'}} label="Add comment" variant="outlined" />
                    </Grid>
                    <Grid item xs="auto" sx={{display: 'inline-flex', alignItems: 'center'}}>
                      <IconButton><Send /></IconButton>
                    </Grid>
                  </Grid>
                  
                </CardContent>
              </Card>
            </Box>}
          </div>
        </>

      default:
        return <></>
    }
  }, [annotation.author, annotation.icon, annotation.location.position.x, annotation.location.position.y, annotation?.text, annotation.type, onClickComment, onCloseComment, show])

  return <>
    {annotationComponent}
  </>
}