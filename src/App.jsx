import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import EditScreen from "./components/EditScreen";
import Terms from "./components/TermsAndConditions/Terms";
import Conditions from "./components/TermsAndConditions/Conditions";
import Images from "./components/Images";
import NotFound from "./components/NotFound";
import NewNote from "./components/NewNote";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/edit/:id" element={<EditScreen />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/conditions" element={<Conditions />} />
        <Route path="Images" element={<Images />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/new" element={<NewNote />} />

      </Routes>
    </Router>
  );
}

export default App;
