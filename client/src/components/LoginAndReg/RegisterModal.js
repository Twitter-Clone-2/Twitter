import React, { useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import { Link, useNavigate } from "react-router-dom";
import route from "../../utils/server_router";
import axios from "axios";
import "../../CSS/Login.css";
import "../../CSS/Register.css";
import CloseIcon from "@mui/icons-material/Close";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import FormAccountInfo from "./FormAccountInfo";
import FormUserName from "./FormUserName";

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

export default function BasicModal({ openRegister, setOpenRegister }) {
  const handleOpen = () => setOpenRegister(true);
  const handleClose = () => setOpenRegister(false);
  const navigate = useNavigate();

  const [currentStep, setCurrentStep] = useState(0);
  const [firstName, setFirstName] = useState("");
  const [firstNameError, setFirstNameError] = useState(true);
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [userName, setUserName] = useState("");
  const [bio, setBio] = useState("");
  const [location, setLocation] = useState("");
  const [errorMessages, setErrorMessages] = useState([]);

  function handleButton() {
    let meetsAllReq = true;
    let tempErrorMessage = [];

    if (currentStep == 0) {
      if (firstName.length < 2) {
        tempErrorMessage.push("First name needs to be at least 2 characters.");
        meetsAllReq = false;
      }

      if (lastName.length < 2) {
        tempErrorMessage.push("Last name needs to be at least 2 characters.");
        meetsAllReq = false;
      }

      if (!/^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/.test(email) || email.length == 0) {
        tempErrorMessage.push("Must be a valid email.");
        meetsAllReq = false;
      }

      if (password !== confirm) {
        tempErrorMessage.push("Passwords must match.");
        meetsAllReq = false;
      }

      if (password.length <= 7) {
        tempErrorMessage.push("Password needs to be at least 8 characters.");
        meetsAllReq = false;
      }

      if (meetsAllReq) {
        setCurrentStep((prev) => prev + 1);
        setErrorMessages([]);
      } else {
        setErrorMessages(tempErrorMessage);
      }
      tempErrorMessage = [];
    }

    if (currentStep == 1) {
      if (userName.length === 0) {
        tempErrorMessage.push("Must enter a username.");
        meetsAllReq = false;
      }

      if (meetsAllReq) {
        axios
          .post(route + "/api/register", {
            first_name: firstName,
            last_name: lastName,
            email: email,
            password: password,
            username: userName,
            bio: bio,
            location: location,
          })
          .then(() => {
            axios.get(route + "/api/user/email/" + email).then((res) => {
              localStorage.setItem("currUser", JSON.stringify(res.data[0]));
              navigate("/main/feed");
            });
          })
          .catch((err) => console.error(err));
      } else {
        setErrorMessages(tempErrorMessage);
      }
    }
  }

  const steps = ["Account Details", "User Name"];
  return (
    <div>
      <button
        id="signUpButton"
        className="mainPageFont mainPageButtonShape"
        onClick={handleOpen}
      >
        Sign up with an email
      </button>

      <Modal
        open={openRegister}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className="box">
          <div id="loginTopIcons">
            <CloseIcon className="loginCloseButton" onClick={handleClose} />
            <img
              id="loginTwitterLogo"
              src="https://www.iconpacks.net/icons/2/free-twitter-logo-icon-2429-thumb.png"
            />
            <div></div>
          </div>

          <div id="registerMainDiv">
            <div>
              <Stepper activeStep={currentStep} alternativeLabel>
                {steps.map((label) => (
                  <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                  </Step>
                ))}
              </Stepper>
            </div>
            <div>
              <ul>
                {errorMessages.map((error, i) => (
                  <li key={i}>{error}</li>
                ))}
              </ul>
            </div>
            {currentStep === 0 && (
              <FormAccountInfo
                firstName={firstName}
                setFirstName={setFirstName}
                firstNameError={firstNameError}
                setFirstNameError={setFirstNameError}
                lastName={lastName}
                setLastName={setLastName}
                email={email}
                setEmail={setEmail}
                password={password}
                setPassword={setPassword}
                confirm={confirm}
                setConfirm={setConfirm}
              />
            )}

            {currentStep === 1 && (
              <FormUserName
                firstName={firstName}
                userName={userName}
                setUserName={setUserName}
                bio={bio}
                setBio={setBio}
                location={location}
                setLocation={setLocation}
              />
            )}
            <Button
              id="stepperButton"
              variant="contained"
              onClick={() => handleButton()}
            >
              {currentStep === 1 ? "Completed" : "Next"}
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
