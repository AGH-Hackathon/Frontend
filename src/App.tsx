import { Box, styled, ThemeProvider } from "@mui/material";
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
  return (
    <ThemeProvider theme={theme}>
      <StyledContainer>
        <BrowserRouter>
          <Routes>
            <Route path='create-room' element={<CreateRoomView />} />
            <Route path='game/:room_id' element={<MatchingGameView />} />
          </Routes>
        </BrowserRouter>
      </StyledContainer>
    </ThemeProvider>
  );
}

export default App;
