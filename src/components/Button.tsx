import { Button, ButtonProps, styled } from "@mui/material"

const StyledButton = styled(Button)({
    padding: '10px',
    background: '#3d7935',
})

export const OutlinedButton = (props: ButtonProps) => {
    return (
        <StyledButton variant="outlined" {...props} />
    )
}

export const ContainedButton = (props: ButtonProps) => {
    return (
        <StyledButton variant="contained" {...props} />
    )
}
