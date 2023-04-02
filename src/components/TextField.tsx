import { styled, TextField, TextFieldProps } from "@mui/material"

const StyledTextField = styled(TextField)({
    '& label.Mui-focused': {
        color: 'white',
    },
    '& .MuiInput-underline:after': {
        borderBottomColor: 'white',
    },
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
        borderColor: 'white',
        },
        '&:hover fieldset': {
        borderColor: 'white',
        },
        '&.Mui-focused fieldset': {
        borderColor: 'white',
        },
    },
    "input": {
        color: "white",
        height: "15px"
    },
    width: "100%",

})

export const OutlinedTextField = (props: TextFieldProps) => {
    return (
        <StyledTextField variant="outlined" {...props} />
    )
}

export const ContainedTextField = (props: TextFieldProps) => {
    return (
        <StyledTextField variant="filled" {...props} />
    )
}
