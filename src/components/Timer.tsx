import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { Typography } from "@mui/material";

const renderTime = ({ remainingTime }) => {
  return (
    <Typography variant="h4" style={{ color: "#FFFFFF" }} >{remainingTime}</Typography>
  );
};


export const Timer = (props) => {
<<<<<<< HEAD
    
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
=======

  return (
    <CountdownCircleTimer
      size={100}
      isPlaying
      duration={props.time}
      colors={["#004777", "#F7B801", "#A30000", "#A30000"]}
      colorsTime={[props.time, 6, 3, 0]}
      onComplete={() => ({ shouldRepeat: false, delay: 1 })}
    >
      {renderTime}
    </CountdownCircleTimer>
  )
>>>>>>> 4c1f536 (feat: refactor socket connections)
}
