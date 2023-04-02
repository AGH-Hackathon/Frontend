import { Box, Card, styled } from "@mui/material";
import { memo } from "react";
import { Button } from "../components/Button";
import { CustomSlider } from "../components/Slider";
import { BodyTypography, SubtitleTypography, TitleTypography } from "../components/Typography";
import { useState } from "react";
import { Controller, useForm } from 'react-hook-form'


const StyledCard = styled(Card)(({ theme }) => ({
  background: theme.palette.primary.main,
  display: "flex",
  flexDirection: "column",
  maxWidth: "320px",
  margin: "auto",
  padding: "32px",
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