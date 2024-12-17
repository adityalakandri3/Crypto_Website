import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeCart, updateCart } from "../../redux/slice/cryptoSlice";

const Cart = () => {
  const { cartItem } = useSelector((state) => state.crypto);
  console.log(cartItem);
  const dispatch=useDispatch();

  const totalQuantity = cartItem.reduce((total, item) => total + item.qty, 0);
  const totalAmount = cartItem.reduce((total, item) => total + (item.qty * item.priceUsd), 0);


  const handleUpdate = (id, qty) => {
    if (qty > 0) {
      dispatch(updateCart({ id, qty }));
    }
  };

  const handleRemove = (id)=>{
    dispatch(removeCart(id));
  
  }
  return (
    <>
      <Typography variant="h3" align="center" sx={{ my: 3 }}>
        Add To Cart
      </Typography>

      <Box>
        <Grid container spacing={2}>
          <Grid item xs={8}>
            {cartItem.map((item)=>(

            <Card key={item.id} sx={{ maxWidth: 500 ,my:3 ,mx:10}}>
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {item.name}({item.symbol})
                </Typography>
                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                  Supply:${parseFloat(item.supply).toFixed(0)} <br />
                  MaxSupply:${parseFloat(item.supply).toFixed(0)}
                </Typography>
              </CardContent>
              <CardActions>
              <Button size="small" variant="contained"  onClick={()=>handleUpdate(item.id,item.qty-1)}>-</Button>
                <Typography sx={{mx:2}}>{item.qty}</Typography>
                <Button size="small" variant="contained" sx={{mx:1}} onClick={()=>handleUpdate(item.id,item.qty+1)}>+</Button>
                <Button size="small" variant="contained"  sx={{mx:1 ,backgroundColor:'red'}} onClick={()=>handleRemove(item.id)}><DeleteIcon/></Button>
              </CardActions>
            </Card>
            ))}
          </Grid>
          <Grid item xs={12} md={4}>
          <Card sx={{ padding: 2 }}>
            <Typography variant="h6" gutterBottom>
              Order Summary
            </Typography>
            <Box
              sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}
            >
              <Typography>Total Quantity:</Typography>
              <Typography>{totalQuantity}</Typography>
            </Box>
            <Box
              sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}
            >
              <Typography>Total Amount:</Typography>
              <Typography>${totalAmount.toFixed(2)}</Typography>
            </Box>
            <Button variant="contained" color="primary" fullWidth>
              Proceed to Checkout
            </Button>
          </Card>
        </Grid>

        </Grid>
      </Box>
    </>
  );
};

export default Cart;
