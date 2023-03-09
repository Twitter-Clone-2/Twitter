import React, { useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import { Link, useNavigate } from "react-router-dom";
import route from "../../utils/server_router";
import axios from "axios";
import "../../CSS/Login.css";
import CloseIcon from "@mui/icons-material/Close";
import { Button } from "antd";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "550px",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 2,
};

export default function BasicModal({ setOpenRegister }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const navigate = useNavigate();
  const [emailOrUserName, setEmailOrUserName] = useState("guest@gmail.com");
  const [password, setPassword] = useState("12345678");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    axios
      .post(route + "/api/login", {
        email: emailOrUserName,
        password,
      })
      .then((res) => {
        if (res.data) {
          setLoading(false);
          navigate("/main/feed");
          localStorage.setItem("currUser", JSON.stringify(res.data.user));
        } else {
          setError(true);
        }
      })
      .catch((err) => console.error(err));
  };

  return (
    <div>
      <button
        id="mainPageSignInButton"
        className="mainPageButtonShape mainPageHeaderFont "
        onClick={handleOpen}
      >
        Sign in
      </button>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className="box" id="loginModalMobile">
          <div id="loginTopIcons">
            <CloseIcon className="loginCloseButton" onClick={handleClose} />
            <img
              id="loginTwitterLogo"
              src="https://www.iconpacks.net/icons/2/free-twitter-logo-icon-2429-thumb.png"
            />
            <div></div>
          </div>

          <div id="loginHeader" className="loginFont middle">
            Sign in to Twitter
          </div>
          <Box>
            {error && (
              <ol>
                <li className="middle loginErrorMessage">
                  Email and/or Password is incorrect!
                </li>
              </ol>
            )}

            <div className="loginFont middle" id="loginEmailInput">
              <TextField
                id="outlined-basic"
                error={error}
                label="Email"
                variant="outlined"
                value={emailOrUserName}
                onChange={(e) => setEmailOrUserName(e.target.value)}
              />
            </div>

            <div className="loginFont middle">
              <TextField
                id="outlined-error"
                error={error}
                label="Password"
                variant="outlined"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
              />
            </div>
          </Box>
          <div className="middle">
            <Button
              className="loginButtonShape middle loginFont"
              id="loginButton"
              onClick={handleLogin}
              loading={loading}
            >
              Sign In
            </Button>
          </div>

          <div className="middle loginFont" id="loginQuestion">
            Don't have an account?{" "}
            <span id="registerLink" onClick={() => setOpenRegister(true)}>
              Sign up
            </span>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
