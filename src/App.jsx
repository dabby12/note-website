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
import LandingPage from "./components/LandingPage/LandingPage";
import Pricing from "./components/LandingPage/Pricing";
import Features from "./components/LandingPage/Features";
import FAQ from "./components/LandingPage/FAQ";
import NotDone from "./components/NotDone"
import Payment from "./components/Payment"
function App() {
console.log("Made with ❤️ by @dabby12, hope you enjoy! Funny how its built by a 13 year old 😂");
console.log("If you have any questions, feel free to ask me on Discord Make_aguess");
console.log("Tech Stack: React, TailwindCSS, Appwrite, Vite");
  
  return (
    <Router>
      <Routes>
        {/* Landing pages */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/features" element={<Features />} />
        <Route path="/faq" element={<FAQ />} />
        
        {/* Authentication */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        
        {/* Main app */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/edit/:id" element={<EditScreen />} />
        <Route path="/new" element={<NewNote />} />
        <Route path="/images" element={<Images />} />
        
        {/* Settings */}
        <Route path="/settings/:id" element={<Settings />} />
        <Route path="/settings/account/:userid" element={<UserAccount />} />
        <Route path="/settings/preferences/:userid" element={<AppPreferences />} />
        <Route path="/settings/privacy/:userid" element={<PrivacySecurity />} />
        
        {/* Legal */}
        <Route path="/terms" element={<Terms />} />
        <Route path="/conditions" element={<Conditions />} />
        
        {/* 404 */}
        <Route path="*" element={<NotFound />} />

        {/* Not Done */}
        <Route path="/notdone" element={<NotDone />} />

        {/* Payment */}
        <Route path="/payment" element={<Payment />} />
      </Routes>
    </Router>
  );
}

export default App;