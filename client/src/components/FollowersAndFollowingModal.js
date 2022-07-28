import React, {useState, useEffect} from 'react'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import PersonIcon from "@mui/icons-material/Person";
import "../CSS/followersAndFollowingModal.css";
import { useNavigate } from "react-router-dom";
import SearchIcon from '@mui/icons-material/Search';

const FollowersAndFollowingModal = ({
  num,
  relationship,
  handle = false,
  setAccountClicked,
  setAccountBeingMessaged,
}) => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const navigate = useNavigate(); 
    const [searchArr, setSearchArr] = useState([]) 
    const [searchValue, setSearchValue] = useState("")

  useEffect(() => {
    setSearchArr([...relationship])
  }, [relationship])
  

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 500,
        bgcolor: 'background.paper',
        borderRadius : "25px",
        boxShadow: 24,
      };

      let handleFunction = (id)=>{
        if(handle){
          setAccountClicked(true)
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
        {searchArr && 
        <div className='searchTopLayer'>
          <SearchIcon sx={{color : "rgb(29,155,240)"}}/>
          <input 
            className='searchModalInput'
            placeholder='Search for someone!'
            onChange={(e)=>{
              setSearchArr(relationship.filter(person => {

                return person.first_name.slice(0 , e.target.value.length).toUpperCase() == e.target.value.toUpperCase() || person.username.slice(0 , e.target.value.length).toUpperCase() == e.target.value.toUpperCase()
              }))
            }}
          />
          </div>}
        {searchArr.map(item=>{
            return(
                <div 
                key={item.id} 
                id="modal-modal-description" 
                sx={{ mt: 2 }} 
                className="modalProfileCard"
                onClick={()=> {
                  handleFunction(item.id)
                  setAccountBeingMessaged(item)
                }}
                >

                    <div className='account'>
                        <div><PersonIcon sx={{ fontSize: 70 }}/></div>
                        <div className='names'>
                          <div className='followerModalAccountName followerModalFont'>
                            {item.first_name} {item.last_name}
                          </div>
                          <div className='followerModalFont followerModalUsername'>@{item.username}</div>
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