import {MenuItem, Select, SelectProps, styled} from "@mui/material"

const StyledSelect = styled(Select)({
    width: '100%',
})

export const CustomSelect = (props: SelectProps) => {
    return (
        <StyledSelect {...props}>
            <MenuItem value="">
                <em>None</em>
            </MenuItem>
        </StyledSelect>
    )
}