import {Slider, SliderProps, styled} from "@mui/material"

const StyledSlider = styled(Slider)({})

export const CustomSlider = (props: SliderProps) => {
    return (
        <StyledSlider aria-label="Default" valueLabelDisplay="auto" step={1} {...props}/>
    )
}