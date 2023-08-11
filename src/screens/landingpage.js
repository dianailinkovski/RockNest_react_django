import React, { useEffect, useState } from "react";
import { Row, Col } from "antd";
import { useDispatch, useSelector } from "react-redux";

import Sidebar from "./sidebar";
import { getProducts, getclassic_product, getmodern_product, getmaterial_product } from "../redux/actions/recipes";
import { Link, useNavigate  } from "react-router-dom";
import { FiVolume2 } from "react-icons/fi";
import { InstagramOutlined } from "@ant-design/icons";
import Loading from './loading';
import $ from 'jquery';
export default function Landingpage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { getproducts } = useSelector((state) => state.recipes);
  var audio = new Audio("../../sound.mp3");
  const start = () => {
    audio.play();
  };
  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);
  console.log(getproducts, "getproducts");
  // let products_data = getproducts ? getProducts : []
  const goto_detail = (id, image, category) => {
    // alert(category);
    sessionStorage.setItem('image_url',image);
    if(category == "classic" || category =="modern"){
      navigate(`/products/${id}`);
    }
    else{
      navigate(`/material/${id}`);
    }
    // console.log(category,"category");
  }
  const getclassic = () => {
    $('.landing_btn_group button').map((index, element) => {
      if(element.classList.contains('active')){
        element.classList.remove('active');
      }
    });
    $('.landing_btn_group1').addClass('active');
    dispatch(getclassic_product())
  }
  const getmodern = () => {
    $('.landing_btn_group button').map((index, element) => {
      if(element.classList.contains('active')){
        element.classList.remove('active');
      }
    });
    $('.landing_btn_group2').addClass('active');
    dispatch(getmodern_product())
  }
  const getmaterial = () => {
    $('.landing_btn_group button').map((index, element) => {
      if(element.classList.contains('active')){
        element.classList.remove('active');
      }
    });
    $('.landing_btn_group3').addClass('active');
    dispatch(getmaterial_product())
  }
  return (
    <>  
     {/* {isloading ? (
        <Loading />
      ) : ( */}
      <Row className="body_space">
        <div className="sidebar_position">
          <Sidebar />
        </div>
        <div className="page_content">
          <Row>
            <Col span={24}>
              <Row
                className="mt-5 landing_btn_group"
                align="middle"
                justify="left"
              >
                <Col>
                  <button className="btn_white  px-4 py-2 landing_btn_group1" onClick={()=>getclassic()}>
                    {" "}
                    Classic Mmxxii
                  </button>
                </Col>
                <Col>
                  <button className="btn_white  px-4 py-2 landing_btn_group2" onClick={()=>getmodern()}>
                    Modern mmxxiii{" "}
                  </button>
                </Col>
                <Col>
                  <button className="btn_white px-4 py-2 landing_btn_group3" onClick={()=>getmaterial()}>
                    Material mmxxiii{" "}
                  </button>
                </Col>
              </Row>
              <Row className="landing_image_mobile">
                {getproducts.map((item) => (
                  <div className="landing_img_item">
                    {/* <Link to={`/products/${item.id}`}> */}
                      {" "}
                      <img src={`${item.main_image}`} alt="landing image1" onClick={()=>goto_detail(item.id,item.main_image,item.category)} />
                    {/* </Link> */}
                    <p className="landing_img_title">{ item.name }</p>
                  </div>
                ))}
                {/* <div className="landing_img_item">
// https://rocknest.s3.amazonaws.com/rocknest_images/a_a.jpeg
                    <Link to={`/products/1`}> 
                      {" "}
                      <img src="landing.svg" alt="landing image1" />
                    </Link>
                    <p className="landing_img_title">Alexander The Great</p>
                  </div> */}

              </Row>



              <Row className="mobile_sidebar" align="middle">
                <Col span={2}>
                  <FiVolume2 className="volume_icon mx-auto" onClick={start} />
                </Col>
                <Col span={2} style={{ textAlign: "end" }}>
                  <a href="https://www.instagram.com/rocknestlimited/" > <InstagramOutlined className="instagram_icon" /></a>
                </Col>
              </Row>
            </Col>
          </Row>
        </div>
      </Row>
      {/* )} */}

    </>
  );
}
