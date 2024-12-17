import React, { useState } from "react";
import useFetchApi from "../../hooks/useFetchApi";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Box,
  TextField,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Modals from "./Modals";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, searchCart, sortCart } from "../../redux/slice/cryptoSlice";
import { useFetchCoin } from "../../hooks/react-query/coin.query";

const Home = () => {
  const {data} = useFetchCoin();
  console.log(data);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { searchTerm, sortOrder } = useSelector((state) => state.crypto);

  const handleSearch = (e) => {
    dispatch(searchCart(e.target.value));
  };
  const handleSort = () => {
    dispatch(sortCart());
  };
  const handleAdd = (product) => {
    dispatch(addToCart(product));
    navigate("/cart");
  };
  // console.log(data);
  const [modalOpen, setModalOpen] = useState(false);
  const [productId, setProductId] = useState(null);

  const handleEdit = (id) => {
    setModalOpen(true);
    setProductId(id);
    console.log(id)
  };
  const handleClose = () => {
    setModalOpen(false);
    setProductId(null);
  };

  const displayedData = data?.data?.filter((item) =>
          item.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .sort((a, b) => {
          const aValue = a.name.toLowerCase();
          const bValue = b.name.toLowerCase();
          return sortOrder === "asc" ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
        })
    ;
  return (
    <>
      <TextField sx={{ my: 3 }} label="Search" onChange={handleSearch} />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="product table">
          <TableHead>
            <TableRow>
              <TableCell>Sl No</TableCell>
              <TableCell>Symbol</TableCell>
              <TableCell onClick={handleSort} sx={{ cursor: "pointer" }}>
                Name {sortOrder === "asc" ? "↑" : "↓"}
              </TableCell>
              <TableCell>Price</TableCell>
              <TableCell colSpan={2}>Add To Cart</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {displayedData && displayedData?.map((product) => (
              <TableRow key={product.id}>
                <TableCell>{product.rank}</TableCell>
                <TableCell>{product.symbol}</TableCell>
                <TableCell>{product.name}</TableCell>
                <TableCell>{product.priceUsd}</TableCell>
                <TableCell colSpan={2}>
                  <Box sx={{ display: "flex", gap: 2 }}>
                    <Button
                      variant="contained"
                      onClick={() => handleAdd(product)}
                    >
                      <ShoppingCartIcon />
                    </Button>
                    <Button
                      variant="contained"
                      onClick={() => handleEdit(product.id)}
                    >
                      Edit Coin
                    </Button>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {modalOpen && (
        <Modals open={modalOpen} handleClose={handleClose} id={productId} />
      )}
    </>
  );
};

export default Home;
