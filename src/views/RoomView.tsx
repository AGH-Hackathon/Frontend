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


export const RoomView = memo((props: RoomViewProps) => {

  return (
    <StyledCard>
      <SubtitleTypography align="center">Your room is ready </SubtitleTypography>
      <SubtitleTypography align="center">Room id: {props.roomId} </SubtitleTypography>

      <Button onClick={props.startGame} sx={{ width: 64, margin: 'auto' }}>Start Game</Button>
    </StyledCard >
  )
})

interface RoomViewProps {
  roomId: string;
  startGame: () => Promise<void>;
}