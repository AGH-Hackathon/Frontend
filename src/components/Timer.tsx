import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { Typography } from "@mui/material";

const renderTime = ({ remainingTime }) => {
  return (
    <Typography variant="h4" style={{ color: "#FFFFFF" }} >{remainingTime}</Typography>
  );
};


export const Timer = (props) => {
    
    return (
        <CountdownCircleTimer
        size={60}
        strokeWidth={6}
        isPlaying
        duration={props.time}
        colors={["#004777", "#F7B801", "#A30000", "#A30000"]}
        colorsTime={[props.time, 6, 3, 0]}
        onComplete={() => ({ shouldRepeat: false, delay: 1 })}
      >
        {renderTime}
      </CountdownCircleTimer>
    )
}
