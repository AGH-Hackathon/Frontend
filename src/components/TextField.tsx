import { styled, TextField, TextFieldProps} from "@mui/material"
import {BodyTypography} from "./Typography";

const StyledTextField = styled(TextField)({
    width: "100%",
})

export const OutlinedTextField = (props: TextFieldProps) => {
    return (
        <StyledTextField variant="outlined" {...props} />
    )
}

export const ContainedTextField  = (props: TextFieldProps) => {
    return (
        <StyledTextField variant="filled" {...props} />
    )
}
