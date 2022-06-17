import React, { useState } from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepContent from "@mui/material/StepContent";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormAccountInfo from "../../components/FormAccountInfo";
import FormUserName from "../../components/FormUserName";

const Register = () => {
  const [currentStep, setCurrentStep] = useState(0);

  const [firstName, setFirstName] = useState("");
  const [firstNameError, setFirstNameError] = useState(true);

  const [lastName, setLastName] = useState("");
  const [lastNameError, setLastNameError] = useState(true);

  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(true);

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [passwordError, setPasswordError] = useState(true);
  const [confirmPasswordError, setConfirmPasswordError] = useState(true);

  const [userName, setUserName] = useState("");

  function handleButton() {
    const meetsAllReq = true;
    if (firstName.length < 2) return;

    if (lastName.length < 2) return;

    // if (/^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/.test(email)) setEmailError(false);

    if (password !== confirm) return;

    if (password.length < 8) return;

      setCurrentStep((prev) => prev + 1);
  }

  const steps = ["Account Details", "User Name"];
  return (
    <>
      <Stepper activeStep={currentStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

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
          setFirstName={setFirstName}
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
      <Button variant="contained" onClick={() => handleButton()}>
        {currentStep === 1 ? "Completed" : "Next"}
      </Button>
    </>
  );
};

export default Register;
