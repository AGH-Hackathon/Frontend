import { CreateRoomView } from "./views/CreateRoomView";
import {createTheme, ThemeProvider, Typography} from "@mui/material";

const darkTheme = createTheme({
    palette: {
        mode: 'light',
    },
});

function App() {
  return (
      <ThemeProvider theme={darkTheme}>
          <div className="App">
              <CreateRoomView />
          </div>
      </ThemeProvider>
  );
}

export default App;
