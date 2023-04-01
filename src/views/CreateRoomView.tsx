import { Card, styled } from "@mui/material";
import { memo } from "react";
import { ContainedButton } from "../components/Button";
import { CustomSlider } from "../components/Slider";
import { BodyTypography, TitleTypography } from "../components/Typography";
import { useState } from "react";
import { SERVER_URL } from "../const";
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

const createRoom = async (data: CreateRoomType) => {
  try {
    console.log(data)
    // const res = await fetch(`${SERVER_URL}/create-room`, {
    //   method: 'POST',
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(data)
    // })
    // console.log(res)
  } catch (e) {
    return CreateRoomError.ServerError
  }
}

export const CreateRoomView = memo(() => {

  const { control, handleSubmit } = useForm<CreateRoomType>({
    defaultValues: {
      imageAmount: 5,
      roundAmount: 5,
    }
  })

  const [error, setError] = useState(CreateRoomError.Default)

  return (
    <StyledCard>
      <form onSubmit={handleSubmit(createRoom)}>
        <TitleTypography>Create room</TitleTypography>
        <BodyTypography>Number of photos</BodyTypography>
        <Controller
          control={control}
          name="imageAmount"
          render={({ field }) => (
            <CustomSlider {...field} min={1} max={20} />
          )}
        />
        <BodyTypography>Time</BodyTypography>
        <Controller
          control={control}
          name="roundAmount"
          render={({ field }) => (
            <CustomSlider {...field} min={1} max={20} />
          )}
        />
        <ContainedButton type="submit" style={{ marginLeft: "auto" }}>Submit</ContainedButton>
      </form>
    </StyledCard>
  )
})