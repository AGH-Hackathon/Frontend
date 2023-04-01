import { CreateRoomView } from "./views/CreateRoomView";
import { createTheme, ThemeProvider } from "@mui/material";
import SockJsClient from 'react-stomp';
import { useState } from "react";

const darkTheme = createTheme({
  palette: {
    mode: 'light',
  },
});

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
    <ThemeProvider theme={darkTheme}>
      <div className="App">
        <SockJsClient
          url={'http://localhost:8080/ws-message'}
          topics={['/topic/message']}
          onConnect={onConnected}
          onDisconnect={console.log("Disconnected!")}
          onMessage={(msg: any) => onMessageReceived(msg)}
          debug={false}
        />
        <CreateRoomView />
      </div>
    </ThemeProvider>
  );
}

export default App;
