import { Typography } from "@mui/material";
import { memo } from "react";
import { CustomButton } from "../components/Button";

export const CreateRoomView = memo(() => {
  return (
    <>
      <Typography variant="h1">Create room</Typography>
      <CustomButton />
    </>
  )
})