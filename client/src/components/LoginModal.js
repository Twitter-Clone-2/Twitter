import React, {useState} from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from "@mui/material/TextField";
import "../CSS/Login.css";
import { Link, useNavigate } from "react-router-dom";
import route from "../utils/server_router";
import axios from "axios";
import "../CSS/Login.css";
import CloseIcon from '@mui/icons-material/Close';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: "550px",
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 2,
};

export default function BasicModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const navigate = useNavigate();
  const [emailOrUserName, setEmailOrUserName] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    axios
      .post(route + "/api/login", {
        email: emailOrUserName,
        password,
      })
      .then((res) => {
        if (res.data) {
          navigate("/main/feed");
          console.log(res.data.user);
          localStorage.setItem("currUser", JSON.stringify(res.data.user));
          console.log(localStorage.getItem("currUser"));
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <button 
      id="mainPageSignInButton" 
      className="mainPageButtonShape mainPageHeaderFont " 
      onClick={handleOpen}
      >Sign in
      </button>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className="box">
                <div id='loginTopIcons'>
                        <CloseIcon className='loginCloseButton' onClick={handleClose}/>
                    <img id="loginTwitterLogo" src="https://www.iconpacks.net/icons/2/free-twitter-logo-icon-2429-thumb.png"/>
                    <div></div>
                </div>

                <div id='loginHeader' className='loginFont middle'>Sign in to Twitter</div>
            <Box >
                <div className='loginFont middle' id='loginEmailInput'>
                    <TextField 
                    id="outlined-basic" 
                    label="Email" 
                    variant="outlined" 
                    value={emailOrUserName}
                    onChange={(e)=>setEmailOrUserName(e.target.value)}
                    />
                </div>

                <div className='loginFont middle'>
                    <TextField 
                    id="outlined-basic" 
                    label="Password" 
                    variant="outlined"
                    value={password} 
                    onChange={(e)=> setPassword(e.target.value)}
                    />
                </div>
            </Box>
            <div className='middle'>
              <button 
              className='loginButtonShape middle loginFont' 
              id='loginButton'
              onClick={handleLogin}
              >
              Sign In
              </button>
            </div>

            <div className='middle loginFont' id='loginQuestion'>
              Don't have an account? <Link id="registerLink" to="/register">Sign up</Link>
            </div>
        </Box>
      </Modal>
    </div>
  );
}
