import {Card, styled, Typography} from "@mui/material";
import { memo } from "react";
import {ContainedButton} from "../components/Button";
import {CustomSlider} from "../components/Slider";
import {BodyTypography, TitleTypography} from "../components/Typography";
import {OutlinedTextField} from "../components/TextField";

const StyledCard = styled(Card)({
    display: "flex",
    flexDirection: "column",
    maxWidth: "800px",
    margin: "auto",
    padding: "20px",
    "& > *": {
        margin: "10px 0"
    }
})

export const CreateRoomView = memo(() => {
  return (
    <StyledCard>
        <TitleTypography>Create room</TitleTypography>

        <OutlinedTextField label="Player Name" id="player-name"></OutlinedTextField>

        <BodyTypography>Number of photos</BodyTypography>
        <CustomSlider defaultValue={4} max={20}/>

        <BodyTypography>Time</BodyTypography>
        <CustomSlider defaultValue={4} max={20}/>

        <ContainedButton style={{marginLeft: "auto"}}>Submit</ContainedButton>

    </StyledCard>
  )
})