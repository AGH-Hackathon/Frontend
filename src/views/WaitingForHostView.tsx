import { Box, Card, styled } from "@mui/material";
import { memo } from "react";
import { Button } from "../components/Button";
import { CustomSlider } from "../components/Slider";
import { BodyTypography, SubtitleTypography, TitleTypography } from "../components/Typography";
import { useState } from "react";
import { Controller, useForm } from 'react-hook-form'

enum CreateRoomError {
  ServerError = 'server-error',
  BadParams = 'bad-params',
  Default = 'default'
}

type CreateRoomType = {
  imageAmount: number;
  roundAmount: number;
}

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


export const WaitingForHostView = memo(() => {

  return (
    <StyledCard>
         <SubtitleTypography align="center">Please wait for the host to start this meeting. </SubtitleTypography>
         <StyledImage src="./loading-gif.gif" />
         <Button onClick={()=>{console.log("TODO cancel")}} sx={{ width: 64, margin: 'auto' }}>Cancel</Button>

    </StyledCard >
  )
})