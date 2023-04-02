import { Card, styled } from "@mui/material";
import { memo } from "react";
import { Button } from "../components/Button";
import { BodyTypography, SubtitleTypography, TitleTypography } from "../components/Typography";
import { OutlinedTextField } from "../components/TextField";


const StyledCard = styled(Card)(({ theme }) => ({
  background: theme.palette.primary.main,
  display: "flex",
  flexDirection: "column",
  maxWidth: "320px",
  margin: "auto",
  padding: "32px",
  gap: theme.spacing(2),
}))


export const JoinRoomView = memo((props: JoinRoomView) => {

  return (
    <StyledCard>
         <TitleTypography align="center">Join room</TitleTypography>
         <BodyTypography>Room Id: {props.roomId}</BodyTypography>
         <BodyTypography>Your nickname:</BodyTypography>  
         <OutlinedTextField></OutlinedTextField>
         <Button onClick={props.joinRoom} sx={{ width: 64, margin: 'auto' }}>Join</Button>
    </StyledCard >
  )
})

interface JoinRoomView {
  roomId: string;
  joinRoom:  () => void;
}