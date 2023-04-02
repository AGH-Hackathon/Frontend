import { Button as MuiButton, ButtonProps, styled } from "@mui/material"

const StyledButton = styled(MuiButton)({
    padding: '10px',
    background: '#3d7935',
})

export const Button = (props: ButtonProps) => {
    return (
        <StyledButton variant="contained" {...props} />
    )
}
