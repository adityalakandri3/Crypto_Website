import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
// import { useParams } from 'react-router-dom';
import useFetchApi from '../../hooks/useFetchApi';
import { useFetchCoinById, useUpdateCoin } from '../../hooks/react-query/coin.query';
import { TextField } from '@mui/material';
// import { useParams } from 'react-router-dom';

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

const Modals = ({open,handleClose,id}) => {
//  const {id} = useParams()
 const {data,loading,error} = useFetchCoinById(id);
 const [input,setInput] = useState({
  name:'',
  symbol:''
 })

 const {mutate} = useUpdateCoin();
//  console.log(id);

useEffect(() => {
  if (data?.data) {
    setInput((prev) => ({
      ...prev,
      name: data.data.name || '',
      symbol: data.data.symbol || '',
    }));
  }
}, [data]);

const handleSubmit = async () => {
  mutate({ ...input, id })
  handleClose(),
  setInput({
    name: '',
    symbol:''
  })
}
console.log(data)
  return (
    <div>
      
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {loading && (
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Loading...
            </Typography>
          )}

          {error && (
            <Typography id="modal-modal-title" variant="h6" component="h2" color="error">
              Error fetching data!
            </Typography>
          )}

          {data && !loading && !error && data.data ? (
            <>
            <Typography id="modal-modal-title" variant="h3" sx={{textAlign:"center"}} component="h4">
                EDIT COIN
              </Typography>
              <TextField value={input.name} onChange={(e)=>setInput({...input,name:e.target.value})}></TextField>
              <TextField value={input.symbol} onChange={(e)=>setInput({...input,symbol:e.target.value})}></TextField>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <strong>Price:</strong> ${parseFloat(data.data.priceUsd).toFixed(2)}
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <strong>Market Cap:</strong> ${parseFloat(data.data.marketCapUsd).toFixed(0)}
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <strong>24h Change:</strong> {data.data.changePercent24Hr}%
              </Typography>
              <Button variant='contained' onClick={handleSubmit}>
          Update
        </Button>
            </>
          ) : (
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              No data available.
            </Typography>
          )}
        </Box>
      </Modal>
    </div>
  );
};

export default Modals;
