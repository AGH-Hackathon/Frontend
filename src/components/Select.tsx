import { MenuItem, Select, SelectProps, styled } from "@mui/material"

const StyledSelect = styled(Select)({
    width: '100%',
    background: '#303F9F',
})

export const CustomSelect = (props: SelectProps) => {
    return (
        <StyledSelect {...props}>
            <MenuItem>
                <em>None</em>
            </MenuItem>
        </StyledSelect>
    )
}