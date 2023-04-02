import { Card, styled } from "@mui/material";
import { memo } from "react";
import { Button } from "../components/Button";
import { BodyTypography, SubtitleTypography, TitleTypography } from "../components/Typography";

const StyledCard = styled(Card)(({ theme }) => ({
  background: theme.palette.primary.main,
  display: "flex",
  flexDirection: "column",
  margin: "auto",
  width: theme.spacing(40),
  padding: theme.spacing(4),
  gap: theme.spacing(2),
}))

const scores = [
  {
    "username": "nick1",
    "score": 5
  },
  {
    "username": "nick2",
    "score": 10
  }
]
const totalScore = 20

type ScoreViewProps = {
  score: any
}

export const ScoresView = memo(({score}: ScoreViewProps) => {
  console.log(score)
  return (
    <StyledCard>
      <TitleTypography align="center">Scores</TitleTypography>
      {/* <BodyTypography align="center">Max score: {totalScore}</BodyTypography> */}
        {Object.values(score).map((data: any, i) => <SubtitleTypography>{i+1}. {data.username} <p style={{ display: 'inline-block', float: 'right', margin: 0 }}>{`${data.score.correct}/${data.score.total}`}</p></SubtitleTypography>)}
      <Button onClick={()=>{}} sx={{ width: 120, margin: 'auto' }}>Play Again</Button>
    </StyledCard>
  )
})
