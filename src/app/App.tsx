import { BrowserRouter as Router } from "react-router-dom";
import Routes from "../routes/index";
import Navbar from "./UI/Navbar";

export function App() {
  return (
    <div className="min-h-screen">
      <Router>
        <Navbar />
        <main className="container mx-auto px-4">
          <Routes />
        </main>
      </Router>
    </div>
  );
}
