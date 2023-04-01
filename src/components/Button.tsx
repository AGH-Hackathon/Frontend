import { Button as MuiButton, ButtonProps, styled } from "@mui/material"

const StyledButton = styled(MuiButton)(({ theme }) => ({
    background: theme.palette.success.main,
}))

export const Button = (props: ButtonProps) => {
    return (
        <StyledButton variant="contained" {...props} />
    )
}
