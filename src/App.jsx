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
import Settings from "./components/Settings";
import UserAccount from "./components/Settings/UserAccount";
import AppPreferences from "./components/Settings/AppPreferences";
import PrivacySecurity from "./components/Settings/PrivacySecurity";
import LandingPage from "./components/LandingPage/LandingPage"


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/edit/:id" element={<EditScreen />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/conditions" element={<Conditions />} />
        <Route path="/images" element={<Images />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/new" element={<NewNote />} />
        <Route path="/settings/:id" element={<Settings />} />
        <Route path="/settings/account/:userid" element={<UserAccount />} />
        <Route path="/settings/preferences/:userid" element={<AppPreferences />} />
        <Route path="/settings/privacy/:userid" element={<PrivacySecurity />} />

      </Routes>
    </Router>
  );
}

export default App;