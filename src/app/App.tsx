import { BrowserRouter } from "react-router-dom";
import Routes from "../routes";
import Navbar from "./UI/Navbar";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar>
          <Routes />
        </Navbar>
      </div>
    </BrowserRouter>
  );
}

export default App;
