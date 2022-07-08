import React, {useState} from 'react'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';



const FollowersAndFollowingModal = (props) => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
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
                <Typography key={item.id} id="modal-modal-description" sx={{ mt: 2 }}>
                <div>{item.first_name} {item.last_name}</div>
              </Typography>
            )
        })}

      </Box>
    </Modal>
  </div>
  )
}

export default FollowersAndFollowingModal