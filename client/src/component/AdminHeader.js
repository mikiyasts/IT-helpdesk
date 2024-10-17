import React from "react";
import Logo from "../asset/Image/logo.png";
import QuestionAnswerRoundedIcon from "@mui/icons-material/QuestionAnswerRounded";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import { useNavigate } from "react-router-dom";
function Header(props) {

  const navigate=useNavigate()
  return (
    <div className="header">
      <div className="header-left">
        <div className="header-humburger" onClick={() => props.togglesidebar()}>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
      <div className="header-right">
        <div className="notification">
          <QuestionAnswerRoundedIcon sx={{ width: 20 }} />{" "}
        </div>
        <div className="user">
          <AccountCircleRoundedIcon /> <span>Wanofi</span>
          <div className="logout active" onClick={()=>{
            document.cookie=`access_token=`
            document.cookie=`refresh_token=`
            navigate("/")
          }}>
            Logout
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
