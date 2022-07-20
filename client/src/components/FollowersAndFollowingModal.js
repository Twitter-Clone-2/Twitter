import React, {useState} from 'react'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import PersonIcon from "@mui/icons-material/Person";
import "../CSS/followersAndFollowingModal.css";



const FollowersAndFollowingModal = (props) => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 500,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
      };

  return (
    <div>
    <Button onClick={handleOpen}>{props.num}</Button>
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        {props.relationship.map(item=>{
            return(
                <Typography key={item.id} id="modal-modal-description" sx={{ mt: 2 }} className="modalProfileCard">
                {/* <div className='account'>{item.first_name} {item.last_name}</div> */}
                <div className='account'>
                    <div><PersonIcon sx={{ fontSize: 65 }}/></div>
                    <div className='names'>
                        <p className='accountName'>{item.first_name} {item.last_name}</p>
                        <p>@{item.username}</p>
                    </div>
                </div>
              </Typography>
            )
        })}

      </Box>
    </Modal>
  </div>
  )
}

export default FollowersAndFollowingModal