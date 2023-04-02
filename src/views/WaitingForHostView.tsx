import { Card, styled } from "@mui/material";
import { memo } from "react";
import { Button } from "../components/Button";
import { SubtitleTypography } from "../components/Typography";


const StyledCard = styled(Card)(({ theme }) => ({
  background: theme.palette.primary.main,
  display: "flex",
  flexDirection: "column",
  margin: "auto",
  maxWidth: theme.spacing(40),
  padding: theme.spacing(4),
  gap: theme.spacing(4),
}))


const StyledImage = styled('img')(({ theme }) => ({
  width: theme.spacing(4),
  height: theme.spacing(4),
  margin: "auto",
}))

export const WaitingForHostView = memo(() => {

  return (
    <StyledCard>
      <SubtitleTypography align="center">Please wait for the host to start this meeting. </SubtitleTypography>
      <StyledImage src="/loading.gif" />
      <Button onClick={() => { console.log("TODO cancel") }} sx={{ width: 64, margin: 'auto' }}>Cancel</Button>
    </StyledCard >
  )
})