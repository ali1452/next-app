import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Stack } from '@mui/material';
import { useDispatch } from 'react-redux';
import { deleteAllCart } from '@/redux/slice/cartSlice';

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
    dispatch(deleteAllCart())
    setModal(false)
  }

  return (
    <div>
      <Modal
        open={modal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className="flex items-center justify-center p-4"
      >
        <Box className="relative w-full max-w-md mx-auto bg-white rounded-3xl shadow-2xl p-8 transform transition-all duration-300 border border-gray-100">
          {/* Close Button */}
          <button 
            onClick={handleClose}
            className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors duration-200"
          >
            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>

          {/* Warning Icon */}
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center shadow-lg">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
              </svg>
            </div>
          </div>

          {/* Title */}
          <Typography 
            id="modal-modal-title" 
            className="text-center text-2xl font-bold text-gray-800 mb-3"
          >
            Clear Cart?
          </Typography>

          {/* Description */}
          <Typography 
            id="modal-modal-description" 
            className="text-center text-gray-600 mb-8 leading-relaxed"
          >
            Are you sure you want to remove all items from your cart? This action cannot be undone.
          </Typography>

          {/* Action Buttons */}
          <Stack spacing={3} direction="row" className="w-full">
            <Button 
              onClick={handleClose}
              className="flex-1 !py-3 !rounded-xl !text-gray-700 !border-2 !border-gray-300 hover:!bg-gray-50 hover:!border-gray-400 !font-semibold !transition-all !duration-200 !normal-case"
              variant="outlined"
            >
              Cancel
            </Button>
            <Button 
              onClick={deleteItem}
              className="flex-1 !py-3 !rounded-xl !bg-gradient-to-r !from-red-500 !to-red-600 hover:!from-red-600 hover:!to-red-700 !text-white !font-semibold !shadow-lg hover:!shadow-xl !transform hover:!scale-105 !transition-all !duration-200 !normal-case"
              variant="contained"
            >
              Delete All
            </Button>
          </Stack>
        </Box>
      </Modal>
    </div>
  );
}
