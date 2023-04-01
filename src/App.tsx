import { Box, styled, ThemeProvider } from "@mui/material";
import SockJsClient from 'react-stomp';
import { useState } from "react";
import { MatchingGameView } from "./views/MatchingGameView";
import { theme } from "./theme";

const StyledContainer = styled(Box)(({ theme }) => ({
  background: theme.palette.secondary.main
}))

function App() {

  const [message, setMessage] = useState('You server message here.');

  const onConnected = () => {
    console.log("Connected!!")
  }

  const onMessageReceived = (msg: any) => {
    console.log(msg)
    setMessage(msg.message);
  }

  return (
    <ThemeProvider theme={theme}>
      <StyledContainer>
        <SockJsClient
          url={'http://localhost:8080/ws-message'}
          topics={['/topic/message']}
          onConnect={onConnected}
          onDisconnect={console.log("Disconnected!")}
          onMessage={(msg: any) => onMessageReceived(msg)}
          debug={false}
        />
        {/* <CreateRoomView /> */}
        {<MatchingGameView />}
      </StyledContainer>
    </ThemeProvider>
  );
}

export default App;
