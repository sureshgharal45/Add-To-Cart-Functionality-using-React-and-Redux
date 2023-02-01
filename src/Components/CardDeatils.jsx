import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
// import "./style.css";
import { DLT,REMOVE } from "../Redux/Actions/action";
import { ADD } from "../Redux/Actions/action";

const CardDeatils = () => {

  const [data,setData] = useState([]);

  const {id} = useParams();

  const history = useNavigate();

  const dispatch = useDispatch();

  const getData = useSelector((state) => state.cartReducer.carts);

  const compare = () =>{
    let compareData = getData.filter((e)=>{
      return e.id == id;
    });
    setData(compareData);
  }

  //add data 
  const send = (e) =>{
    dispatch(ADD(e));
  }

  const dlt = (id) =>{
    dispatch(DLT(id));
    history("/");
  }

  //remove one
  const remove = (item) =>{
    dispatch(REMOVE(item))
  }

  useEffect(()=>{
    compare();
  },[id]);

  return (
    <>
      <div className="container mt-2">
        <h2 className="text-center">Items Details Page</h2>
        <section className="container mt-3">
          <div className="itemsdetails">
          {
            data.map((elem)=>{
                return(
                  <>
                  <div className="items_img">
              <img
                src={elem.imgdata}
                alt="myImg"
              />
            </div>
            <div className="details">
                <Table> 
                  <tr>
                    <td>
                      <p><strong>Restaurant</strong> : {elem.rname}</p>
                      <p><strong>price</strong> : {elem.price}</p>
                      <p><strong>Dishes</strong> : {elem.address}</p>
                      <p><strong>Total</strong> : ₹{elem.price * elem.qnty}</p>
                      <div className="mt-5 d-flex justify-content-between align-items-center" style={{width:100,cursor:"pointer",background:"#ddd",color:"#111"}}>
                          <span style={{fontSize:24}} onClick={elem.qnty <=1 ? ()=> dlt(elem.id) : ()=>remove(elem)}>-</span>
                          <span style={{fontSize:22}}>{elem.qnty}</span>
                          <span style={{fontSize:24}} onClick={()=>send(elem)}>+</span>
                      </div>
                    </td>
                    <td>
                      <p><strong>Rating : </strong><span style={{background:"green",color:"#fff",padding:"2px 5px",borderRadius:"5px"}}>{elem.rating}</span></p>
                      <p><strong>Order Review : </strong><span>{elem.somedata}</span></p>
                      <p><strong>Remove : </strong><span><i className="fas fa-trash" onClick={()=>dlt(elem.id)} style={{color:"red",fontSize:20,cursor:"pointer"}}></i></span></p>
                    </td>
                  </tr>
                  
                </Table>
            </div>
                  </>
                )
            })
          }
          </div>
        </section>
      </div>
    </>
  );
};

export default CardDeatils;
