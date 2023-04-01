import { Box, Card, styled } from "@mui/material";
import { memo } from "react";
import { Button } from "../components/Button";
import { CustomSlider } from "../components/Slider";
import { BodyTypography, TitleTypography } from "../components/Typography";
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

const StyledCard = styled(Card)({
  display: "flex",
  flexDirection: "column",
  maxWidth: "320px",
  margin: "auto",
  padding: "32px",
  "& > *": {
    margin: "10px 0"
  }
})

const StyledForm = styled('form')({
  display: 'flex',
  flexDirection: 'column',
  gap: "32px",
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
      <StyledForm onSubmit={handleSubmit(createRoom)}>
        <TitleTypography>Create room</TitleTypography>
        <Box>
          <BodyTypography>Number of photos</BodyTypography>
          <Controller
            control={control}
            name="imageAmount"
            render={({ field }) => (
              <CustomSlider {...field} min={1} max={20} />
            )}
          />
        </Box>
        <Box>
          <BodyTypography>Time</BodyTypography>
          <Controller
            control={control}
            name="roundAmount"
            render={({ field }) => (
              <CustomSlider {...field} min={1} max={20} />
            )}
          />
        </Box>
        <Button type="submit" style={{ marginLeft: "auto" }}>Submit</Button>
      </StyledForm>
    </StyledCard >
  )
})