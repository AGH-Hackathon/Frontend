import { Box, Card, styled } from "@mui/material";
import { memo } from "react";
import { Button } from "../components/Button";
import { CustomSlider } from "../components/Slider";
import { BodyTypography, TitleTypography } from "../components/Typography";
import { useState } from "react";
import { Controller, useForm } from 'react-hook-form'
import { SERVER_CREATE_ROOM_URL } from "../const";
import { RoomView } from "./RoomView";
import { Loading } from "./Loading";

enum CreateRoomError {
  ServerError = 'server-error',
  BadParams = 'bad-params',
  Default = 'default'
}

type CreateRoomType = {
  image_amount: number;
  round_amount: number;
}

const StyledCard = styled(Card)(({ theme }) => ({
  background: theme.palette.primary.main,
  display: "flex",
  flexDirection: "column",
  margin: "0 auto",
  maxWidth: theme.spacing(40),
  padding: theme.spacing(4),
  "& > *": {
    margin: "10px 0"
  }
}))

const StyledForm = styled('form')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(4),
}))

export const CreateRoomView = memo(() => {

  const { control, handleSubmit } = useForm<CreateRoomType>({
    defaultValues: {
      image_amount: 5,
      round_amount: 5,
    }
  })

  const [loading, setLoading] = useState(false)
  const [roomId, setRoomId] = useState<string>()

  const createRoom = async (data: CreateRoomType) => {
    try {
      setLoading(true)
      const res = await fetch(`${SERVER_CREATE_ROOM_URL}/room/create`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
      })
      const id = await res.json()
      setLoading(false)
      setRoomId(id)
    } catch (e) {
      setLoading(false)
      return CreateRoomError.ServerError
    }
  }

  const startGame = async () => {
    try {
      const res = await fetch('http://localhost:8008/game/29e243ca-0955-47b5-a14b-3d7471d68900/start')
      if (res.status === 200) {
        console.log("game started")
      }
    } catch (e) {
      console.log("error")
    }
  }

  if (!!roomId) {
    return (
      <RoomView roomId={roomId} startGame={startGame}/>
    )
  }

  if (loading) {
    return (
      <Loading label={"Room is creating..."}/>
    )
  }
   
  return (
    <StyledCard>
      <StyledForm onSubmit={handleSubmit(createRoom)}>
        <TitleTypography>Create room</TitleTypography>
        <Box>
          <BodyTypography>Number of photos</BodyTypography>
          <Controller
            control={control}
            name="image_amount"
            render={({ field }) => (
              <CustomSlider {...field} min={1} max={5} />
            )}
          />
        </Box>
        <Box>
          <BodyTypography>Number of rounds</BodyTypography>
          <Controller
            control={control}
            name="round_amount"
            render={({ field }) => (
              <CustomSlider {...field} min={1} max={5} />
            )}
          />
        </Box>
        <Button type="submit" style={{ marginLeft: "auto" }}>Submit</Button>
      </StyledForm>
    </StyledCard >
  )
})