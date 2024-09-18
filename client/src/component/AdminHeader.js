import React from 'react'
import Logo from "../asset/Image/logo.png"
import QuestionAnswerRoundedIcon from '@mui/icons-material/QuestionAnswerRounded';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
function Header(props) {

  return (
    <div className='header'>
      <div className="header-left">
        <div className="header-humburger" onClick={()=>props.togglesidebar()}>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
      <div className="header-right">
        <div className="notification"><QuestionAnswerRoundedIcon sx={{width:20}}/></div> 
        <div className="user"><AccountCircleRoundedIcon/> <span>Wanofi</span></div> 
      </div>
    </div>
  )
}

export default Header
