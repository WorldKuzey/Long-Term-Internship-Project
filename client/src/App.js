import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import ReportPage from "./pages/ReportPage/ReportPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/report-page/:recNo/:queryItem/:reportTitle/:initRun"
          element={<ReportPage />}
        />
      </Routes>
    </Router>
  );
}

export default App;
