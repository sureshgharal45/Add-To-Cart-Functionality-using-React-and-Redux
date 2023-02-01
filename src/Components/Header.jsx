import React, { useEffect } from "react";
import Navbar from "react-bootstrap/Navbar";
import Table from "react-bootstrap/Table";
import Container from "react-bootstrap/Container";
import Badge from "@mui/material/Badge";
import Nav from "react-bootstrap/Nav";
import Menu from "@mui/material/Menu";
// import MenuItem from "@mui/material/MenuItem";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DLT } from "../Redux/Actions/action";

const Header = () => {

  const [price, setPrice] = useState(0);

  const getData = useSelector((state) => state.cartReducer.carts);

  const dispatch = useDispatch();
 

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);

  };

  //delete items
  const dlt = (id) =>{
    dispatch(DLT(id));
  }

  const total = () =>{
    let price = 0;
    getData.map((elem,k)=>{
      price = elem.price*elem.qnty + price
    });
    setPrice(price);
  }

  useEffect(()=>{
    total()
  },[total])

  return (
    <>
      <Navbar bg="dark" variant="dark" style={{ height: 60 }}>
        <Container>
          <Link to="/" className="text-decoration-none text-light mx-3">
            Add To Cart
          </Link>
          <Nav className="me-auto">
            <Link to="/" className="text-decoration-none text-light">
              Home
            </Link>
          </Nav>
          <Badge
            badgeContent={getData.length}
            color="primary"
            id="basic-button"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
          >
            <i
              class="fa-solid fa-cart-shopping text-light"
              style={{ fontSize: 25, cursor: "pointer" }}
            ></i>
          </Badge>
        </Container>

        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
        {
          getData.length ? 
          <div className="card_details" style={{width:"24rem", padding:10}}>
            <Table>
              <thead>
                <tr>
                  <th>Selected Dishes</th>
                  <th>Restaurant Name</th>
                </tr>
              </thead>
              <tbody>
                {
                  getData.map((e)=>{
                    return(
                      <>
                        <tr>
                          <td>
                          <Link to={`/cart/${e.id}`} onClick={handleClose}>
                          <img src={e.imgdata} style = {{width:"5rem", height:"5rem"}}alt='myImg'/>
                          </Link>  
                          </td>
                          <td>
                            <p>{e.rname}</p>
                            <p>Price : ₹{e.price}</p>
                            <p>Quantity : {e.qnty}</p>
                            <p style={{color:"red",fontSize:20,cursor:"pointer"}} onClick={()=>dlt(e.id)}>
                              <i className="fas fa-trash smalltrash"/>
                            </p>
                          </td>

                          <td className="mt-5" style={{color:"red",fontSize:20,cursor:"pointer"}} onClick={()=>dlt(e.id)}>
                          <i className="fas fa-trash largetrash"/>
                          </td>
                        </tr>
                      </>
                    )
                  })
                }
                <p className="text-center">Total : ₹{price}</p>
              </tbody>
            </Table>
          </div>:
          <div
            className="card-details d-flex justify-content-center align-items-center"
            style={{ width: "24rem", padding: 10, position: "relative" }}
          >
            <i
              className="fas fa-close smallclose"
              style={{
                position: "absolute",
                top: 2,
                right: 20,
                fontSize: 23,
                cursor: "pointer",
              }}
              onClick={handleClose}
            />
            <p style={{ fontSize: 22 }}>Your Cart is Empty</p>
            <img
              src="https://i.pinimg.com/originals/66/22/ab/6622ab37c6db6ac166dfec760a2f2939.gif "
              className="emptycart_img"
              style={{ width: "6rem", padding: 10 }}
              alt="myGif"
            />
          </div>
        }
{/* 
          <div
            className="card-details d-flex justify-content-center align-items-center"
            style={{ width: "24rem", padding: 10, position: "relative" }}
          >
            <i
              className="fas fa-close smallclose"
              style={{
                position: "absolute",
                top: 2,
                right: 20,
                fontSize: 23,
                cursor: "pointer",
              }}
              onClick={handleClose}
            />
            <p style={{ fontSize: 22 }}>Your Cart is Empty</p>
            <img
              src="https://i.pinimg.com/originals/66/22/ab/6622ab37c6db6ac166dfec760a2f2939.gif "
              className="emptycart_img"
              style={{ width: "6rem", padding: 10 }}
              alt="myGif"
            />
          </div> */}
        </Menu>
      </Navbar>
    </>
  );
};

export default Header;
