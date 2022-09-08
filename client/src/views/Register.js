import React, { useState } from "react";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import FormAccountInfo from "../components/LoginAndReg/FormAccountInfo";
import FormUserName from "../components/LoginAndReg/FormUserName";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import route from "../utils/server_router";
import "../CSS/Register.css";

const Register = () => {
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

  const navigate = useNavigate();

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
              console.log(email);
              localStorage.setItem("currUser", JSON.stringify(res.data[0]));
              navigate("/main/feed");
            });
          })
          .catch((err) => console.log(err));
      } else {
        setErrorMessages(tempErrorMessage);
      }
    }
  }

  const steps = ["Account Details", "User Name"];
  return (
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
  );
};

export default Register;
