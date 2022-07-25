import React, {useState} from 'react'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import PersonIcon from "@mui/icons-material/Person";
import "../CSS/followersAndFollowingModal.css";
import { useNavigate } from "react-router-dom";

const FollowersAndFollowingModal = ({
  num,
  relationship,
  handle = false,
}) => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const navigate = useNavigate(); 

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

      let handleFunction = (id)=>{
        if(handle){
          console.log(`Hello ${id}`)
        }else{
          navigate("/profile/page/" + id)
        }
      }

        
        
      
  return (
    <div>
    <Button onClick={handleOpen}>{num}</Button>
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        {relationship.map(item=>{
            return(
                <div 
                key={item.id} 
                id="modal-modal-description" 
                sx={{ mt: 2 }} 
                className="modalProfileCard"
                onClick={()=> handleFunction(item.id) }
                >

                    <div className='account'>
                        <div><PersonIcon sx={{ fontSize: 65 }}/></div>
                        <div className='names'>
                          <p className='accountName'>{item.first_name} {item.last_name}</p>
                            <p>@{item.username}</p>
                        </div>
                    </div>
              </div>
            )
        })}

      </Box>
    </Modal>
  </div>
  )
}

export default FollowersAndFollowingModal