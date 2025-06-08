import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
function Settings() {
  const navigate = useNavigate();

  const redirectToUserAccount = () => {
    const userID = JSON.parse(localStorage.getItem("user")).$id;
    navigate(`/settings/account/${userID}`);
    console.log("redirecting to user account");
  };
  useEffect(() => {
    redirectToUserAccount();
  }, []);

  return <div></div>;
}

export default Settings;
