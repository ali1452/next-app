import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Stack } from '@mui/material';
import { useDispatch } from 'react-redux';
import { incrementByAmount } from '@/redux/slice/counterSlice';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

type Iprops ={
    modal:boolean,
    setModal: (modal: boolean) => void,
    setProduct: (item: any) => void
}

export default function DeleteModal({modal, setModal, setProduct}:Iprops) {
  const dispatch = useDispatch()
  const handleClose = () => setModal(false);
  const deleteItem = () =>{
    setProduct([])
    dispatch(incrementByAmount(0))
    setModal(false)
  }

  return (
    <div>
      <Modal
        open={modal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Do you want to delete?
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          <Stack spacing={2} direction="row">
          <Button variant="contained" style={{backgroundColor:'blue'}} onClick={()=>handleClose()}>No</Button>
          <Button onClick={()=>{deleteItem()}} style={{backgroundColor:'red'}} variant="contained">Yes</Button>

    </Stack>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}
