import React, { useState, useEffect } from "react";
import route from "../utils/server_router";
import axios from "axios";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import "../CSS/followersAndFollowingModal.css";
import PersonIcon from "@mui/icons-material/Person";
import { useNavigate } from "react-router-dom";

const FindAUserModal = () => {
  const [searchArr, setSearchArr] = useState([]);
  const [allAccounts, setAllAccounts] = useState([]);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const navigate = useNavigate();

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 500,
    bgcolor: "background.paper",
    borderRadius: "25px",
    boxShadow: 20,
  };
  useEffect(() => {
    axios
      .get(route + "/api/users")
      .then((res) => setAllAccounts(res.data))
      .catch((e) => console.error(e));
  }, []);

  return (
    <>
      <div className="divForSearchBar">
        <input
          placeholder="Search For People"
          className="messagesSearchBar"
          onChange={(e) => {
            handleOpen();
            if (e.target.value.length == 0) handleClose();
            setSearchArr(
              allAccounts.filter((person) => {
                return (
                  person.first_name
                    .slice(0, e.target.value.length)
                    .toUpperCase() == e.target.value.toUpperCase() ||
                  person.username
                    .slice(0, e.target.value.length)
                    .toUpperCase() == e.target.value.toUpperCase() ||
                  person.last_name
                    .slice(0, e.target.value.length)
                    .toUpperCase() == e.target.value.toUpperCase()
                );
              })
            );
          }}
        />
      </div>

      <Modal
        disableAutoFocus
        open={open}
        onClose={(event) => {
          event.stopPropagation();
          handleClose();
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {searchArr.map((user) => {
            return (
              <div
                key={user.id}
                id="modal-modal-description"
                sx={{ mt: 2 }}
                className="modalProfileCard"
                onClick={() => {
                  handleClose();
                  navigate("/profile/page/" + user.id);
                }}
              >
                <div className="account">
                  <div>
                    {user.profile_picture ? (
                      <img
                        src={user.profile_picture}
                        className="followerModalProfilePicture"
                      />
                    ) : (
                      <PersonIcon sx={{ fontSize: 70 }} />
                    )}
                  </div>
                  <div className="names">
                    <div className="followerModalAccountName followerModalFont">
                      {user.first_name} {user.last_name}
                    </div>
                    <div className="followerModalFont followerModalUsername">
                      @{user.username}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </Box>
      </Modal>
    </>
  );
};

export default FindAUserModal;
