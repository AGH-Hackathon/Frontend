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


const StyledImage = styled('img')(({ theme }) => ({
  width: theme.spacing(4),
  height: theme.spacing(4),
  margin: "auto",
}))

export const WaitingRoomCreatingView = memo(() => {

  return (
    <StyledCard>
         <SubtitleTypography align="center">Room is creating...</SubtitleTypography>
         <StyledImage src="/loading.gif" />
    </StyledCard >
  )
})