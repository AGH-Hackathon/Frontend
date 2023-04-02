import {styled, Typography, TypographyProps} from "@mui/material"

const StyledTypographyTitle = styled(Typography)({
  color: "#FFFFFF"
})

export const TitleTypography = (props: TypographyProps) => {
  return (
    <StyledTypographyTitle variant="h4" {...props} />
  )
}

export const SubtitleTypography = (props: TypographyProps) => {
  return (
      <StyledTypographyTitle variant="h6" {...props} />
  )
}


export const BodyTypography = (props: TypographyProps) => {
  return (
      <StyledTypographyTitle variant="body1" {...props} />
  )
}
