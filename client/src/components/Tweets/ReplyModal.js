import React, {useState} from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import CloseIcon from '@mui/icons-material/Close';
import "../../CSS/ReplyModal.css"
import PersonIcon from "@mui/icons-material/Person";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  borderRadius: "25px",
  boxShadow: 24,
  p: 2,
};

export default function ReplyModal() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
        <ChatBubbleOutlineIcon
            onClick={(event) => {
              event.stopPropagation();
              handleOpen();
            }}
          />
      <Modal
        open={open}
        onClose={(event)=>{
            event.stopPropagation();
            handleClose();
        }}
        onClick={(event)=>{
            event.stopPropagation();
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div >
            <CloseIcon 
            className='replyModalCloseIcon'
            onClick={(event)=>{
                event.stopPropagation();
                handleClose();
            }} />
          </div>

          <div>

            {/* TOP */}
            <div className='replyModalUserAndTweet'>
                <PersonIcon sx ={{fontSize : "80px"}}/>
                <div>
                    <div>
                        <span className='replyModalFont' id='replyModalAccountName'>Account Name </span>
                        <span className='replyModalFont replyModalGray'>@account userName</span>
                        <span className='replyModalFont replyModalGray'> * time</span>
                    </div>
                    <div className='replyModalFont'>What ever the user you are commenting to tweeted out</div>
                </div>
            </div>

            {/* MID */}
            <div className='replyModalFont replyModalMiddle'>
                Replying to <span onClick={()=>console.log("take to their profile")} className="replyModalAccountLink">@account userName</span>
            </div>

            {/* BOT */}
            <div></div>

          </div>
        </Box>
      </Modal>
    </div>
  );
}