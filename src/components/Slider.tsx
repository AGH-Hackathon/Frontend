import { Slider, SliderProps, styled } from "@mui/material"

const StyledSlider = styled(Slider)({
    color: "#3d7935"
})

export const CustomSlider = (props: SliderProps) => {
    return (
        <StyledSlider aria-label="Default" valueLabelDisplay="auto" step={1} {...props} />
    )
}