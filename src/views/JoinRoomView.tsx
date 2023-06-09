import { Box, Card, styled } from "@mui/material";
import { memo } from "react";
import { Button } from "../components/Button";
import { BodyTypography, SubtitleTypography, TitleTypography } from "../components/Typography";
import { OutlinedTextField } from "../components/TextField";
import { Controller, useForm } from "react-hook-form";
import { SOCKET_URL } from "../const";


const StyledCard = styled(Card)(({ theme }) => ({
  background: theme.palette.primary.main,
  display: "flex",
  flexDirection: "column",
  maxWidth: "320px",
  margin: "auto",
  padding: "32px",
  gap: theme.spacing(2),
}))

const StyledForm = styled('form')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(4),
}))

type CreateUserType = {
  username: string;
}


export const JoinRoomView = memo((props: JoinRoomView) => {

  const { control, handleSubmit } = useForm<CreateUserType>({
    defaultValues: {

    }
  })

  const createUser = async (data: CreateUserType) => {
    const res = await fetch(`http://localhost:8008/game/${props.roomId}/join`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({username: data.username})
    })
    const json = await res.json()
    props.setUsername(json.id)
  }

  return (
    <StyledCard>
        <StyledForm onSubmit={handleSubmit(createUser)}>
        <TitleTypography align="center">Join room</TitleTypography>
        <BodyTypography>Room Id: {props.roomId}</BodyTypography>
        <Box>
          <BodyTypography>Your nickname:</BodyTypography>
          <Controller
            control={control}
            name="username"
            render={({ field }) => (
              <OutlinedTextField {...field}></OutlinedTextField>
            )}
          />
        </Box>
      <Button type="submit" style={{ marginLeft: "auto" }}>Submit</Button>
    </StyledForm>
    </StyledCard >
  )
})

interface JoinRoomView {
  roomId: string;
  setUsername: (user) => void;
}