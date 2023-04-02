import { Grid, Input, Slider, SliderProps, styled } from "@mui/material"

const StyledSlider = styled(Slider)({
    color: "#3d7935"
})

const StyledInput = styled(Input)({
    color: "#FFFFFF",
    width: "20px",
    height: "30px",
    paddingLeft: "10px"

})

export const CustomSlider = (props: SliderProps) => {
    return (
        <Grid container spacing={2} alignItems="center">
        <Grid item xs>
        <StyledSlider aria-label="Default" valueLabelDisplay="auto" step={1} {...props} />
        </Grid>
        <Grid item>
          <StyledInput
            value={props.value}
            readOnly
            disableUnderline
          />
        </Grid>
      </Grid>
    )
}