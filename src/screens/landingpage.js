import React, { useEffect } from "react";
import { Row, Col } from "antd";
import { useDispatch, useSelector } from "react-redux";

import Sidebar from "./sidebar";
import { getProducts } from "../redux/actions/recipes";
import { Link } from "react-router-dom";
import { FiVolume2 } from "react-icons/fi";
import { InstagramOutlined } from "@ant-design/icons";

export default function Landingpage() {
  const dispatch = useDispatch();
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
  return (
    <>
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
                  <button className="btn_black px-4 py-2 landing_btn_group1">
                    {" "}
                    Classic Mmxxii
                  </button>
                </Col>
                <Col>
                  <button className="btn_white px-4 py-2 landing_btn_group2">
                    Modern mmxxiii{" "}
                  </button>
                </Col>
                <Col>
                  <button className="btn_white px-4 py-2 landing_btn_group3">
                    Material mmxxiii{" "}
                  </button>
                </Col>
              </Row>
              <Row className="landing_image_mobile">
                {getproducts.map((item) => (
                  <div className="landing_img_item">
                    <Link to={`/products/${item.id}`}>
                      {" "}
                      <img src={`http://localhost:8000/${item.image}`} alt="landing image1" />
                    </Link>
                    <p className="landing_img_title">{ item.name }</p>
                  </div>
                ))}
              </Row>
              <Row className="mobile_sidebar" align="middle">
                <Col span={2}>
                  <FiVolume2 className="volume_icon mx-auto" onClick={start} />
                </Col>
                <Col span={2} style={{ textAlign: "end" }}>
                  <InstagramOutlined className="instagram_icon" />
                </Col>
              </Row>
            </Col>
          </Row>
        </div>
      </Row>
    </>
  );
}
