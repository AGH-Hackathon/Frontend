import { Box, styled, ThemeProvider } from "@mui/material";
import SockJsClient from 'react-stomp';
import { useState } from "react";
import { MatchingGameView } from "./views/MatchingGameView";
import { theme } from "./theme";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { CreateRoomView } from "./views/CreateRoomView";
import './global.css'

const StyledContainer = styled(Box)(({ theme }) => ({
  background: theme.palette.secondary.main,
  width: '100vw',
  height: '100vh',
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
      <SockJsClient
        url={'http://localhost:8008/ws-message'}
        topics={['/game/29e243ca-0955-47b5-a14b-3d7471d68900']}
        onConnect={onConnected}
        onDisconnect={console.log("Disconnected!")}
        onMessage={(msg: any) => onMessageReceived(msg)}
        debug={false}
      />
      <StyledContainer>
        <BrowserRouter>
          <Routes>
            <Route path='create-room' element={<CreateRoomView />} />
            <Route path='/game' element={<MatchingGameView />} />
          </Routes>
        </BrowserRouter>
      </StyledContainer>
    </ThemeProvider>
  );
}

export default App;
