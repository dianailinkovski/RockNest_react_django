import React, { useEffect, useState } from "react";
import { Row, Col, Typography, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { MinusSquareOutlined, PlusSquareOutlined } from "@ant-design/icons";
import Sidebar from "./sidebar";
import { Link, useParams, useNavigate } from "react-router-dom";
// import "./custom";
import $ from "jquery";
import axios from "axios";
import { getProduct,getCart_list } from "../redux/actions/recipes";

// import { AiOutlineMinus } from "react-icons/ai";
const { Title, Paragraph } = Typography;
const baseURL = "https://rocknest-backend.vercel.app/rocknest";

export default function Product() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let { id } = useParams();
  const { getproduct, img_list } = useSelector((state) => state.recipes);
  const { token } = useSelector((state) => state.auth);
  console.log(token,"token123");
  // let img_list=getproduct.images?getproduct.images:[];
  // console.log(getproduct, "getproduct");
  // console.log(img_list, "img_list");
  const [detail_image, setDetail_image] = useState(
    sessionStorage.getItem("image_url")
  );
  useEffect(() => {
    dispatch(getProduct(id));
  }, [dispatch, id]);

  const [qty_val, setQty_val] = useState(1);
  useEffect(() => {
    if (qty_val > 1) {
      $(".product_minus").addClass("active");
    } else {
      $(".product_minus").removeClass("active");
    }
  }, [qty_val]);
  const Qty = (flag) => {
    if (flag == "plus") {
      const set_val = Number(qty_val) + 1;
      setQty_val(set_val);
      // setQty_val(qty_val + 1);
    } else {
      if (qty_val == 1) {
        return;
      }
      const set_val = Number(qty_val) - 1;
      setQty_val(set_val);
    }
  };
  const select_image = (id, image_url) => {
    $("#image" + id).addClass("active");
    $("#image" + id)
      .siblings(".detail_image")
      .removeClass("active");
    // const img_url = "http://localhost:8000/" + image_url;
    setDetail_image(image_url);
  };
  const add_cart = (id) => {
    // const token=JSON.parse(localStorage.getItem("rocket_user"))
    if (token) {
      const data = {
        id: Number(id),
        qty: qty_val,
        username:JSON.parse(sessionStorage.getItem("username")) 
      };
      axios
        .post(`${baseURL}/add-to-cart/`, data)
        .then((res) => {
          console.log(res.data, "add_cart");
          message.success("Cart is added successfully!");
          const data1 = {
            username: JSON.parse(sessionStorage.getItem("username")),
          };
          dispatch(getCart_list(data1));
        })
        .catch((err) => {
          console.log(err);
        });
    }
    else{
      navigate("/login");
    }
  };
  // console.log(img_list,"img_list");
  return (
    <>
      <Row className="body_space">
        <div className="sidebar_position">
          <Sidebar />
        </div>
        <div className="page_content">
          <Row>
            <Col span={24}>
              <Row>
                <Col xl={11} lg={10} md={24} sm={24} className="product_left">
                  <Row className="mt-5 product_mobile_left">
                    <Col
                      style={{ fontSize: "15px", marginLeft: "20px" }}
                      span={20}
                    >
                      <span style={{ color: "#32383E", opacity: "0.43" }}>
                        {" "}
                        Home
                      </span>{" "}
                      &nbsp;&nbsp; &gt; &nbsp;&nbsp;
                      <Link
                        to={`/`}
                        style={{
                          textDecoration: "none",
                          color: "#32383E",
                          opacity: "0.43",
                        }}
                      >
                        {" "}
                        Products{" "}
                      </Link>
                      &nbsp;&nbsp; &gt;&nbsp;&nbsp;
                      <b className="detail_path"> {getproduct.name} </b>
                    </Col>
                  </Row>
                  <Row className="mt-5" justify="center">
                    <Col lg={20} md={20} sm={24}>
                      <img
                        src={`https://rocknest-backend.vercel.app${detail_image}`}
                        alt={`product detail${getproduct.id}`}
                        style={{ margin: "auto", height: "550px" }}
                      />
                    </Col>
                  </Row>
                  <Row className="mt-3" justify="center">
                    {img_list.map((item, i) => (
                      <img
                        src={`https://rocknest-backend.vercel.app${item.image}`}
                        className={
                          i == 1 ? "detail_image active" : "detail_image"
                        }
                        alt={`detail${i}`}
                        id={`image${i}`}
                        onClick={() => select_image(i, item.image)}
                      />
                    ))}

                    {/* <img
                      src={`http://localhost:8000/${detail_image}`}
                      className="detail_image "
                      alt="detail1"
                      id="image1"
                      onClick={() => select_image(1)}
                    />
                    <img
                      src="../../landing.svg"
                      className="detail_image active"
                      alt="detail2"
                      id="image2"
                      onClick={() => select_image(2)}
                    />
                    <img
                      src="../../landing.svg"
                      className="detail_image"
                      alt="detail3"
                      id="image3"
                      onClick={() => select_image(3)}
                    /> */}
                  </Row>
                </Col>
                <Col
                  xl={11}
                  lg={11}
                  md={24}
                  sm={24}
                  xs={24}
                  className="mt-4 product_right"
                >
                  <Row className="product_name_mobile">
                    <Col span={24}>
                      <Title className="product_name">{getproduct.name}</Title>
                    </Col>
                  </Row>
                  <Row className="border_bottom pb-3 product_name_mobile">
                    <Col>
                      <Paragraph className="product_dec">
                        {getproduct.description}
                      </Paragraph>
                    </Col>
                  </Row>
                  <Row className="mt-4">
                    <Col xl={12} lg={12} md={12} sm={14} xs={15}>
                      <p className="product_size">Dimensions</p>
                    </Col>
                    <Col xl={10} lg={10} md={10} sm={10} xs={9}>
                      <p className="product_size">Made In</p>
                    </Col>
                  </Row>
                  <Row className=" border_bottom pb-3">
                    <Col xl={12} lg={12} md={12} sm={14} xs={14}>
                      <Paragraph className="product_size_value">
                        {getproduct.dimension}
                      </Paragraph>
                    </Col>
                    <Col xl={10} lg={10} md={10} sm={10} xs={10}>
                      <Paragraph className="product_size_value">
                        {getproduct.made_in}
                      </Paragraph>
                    </Col>
                  </Row>
                  <Row className="mt-4">
                    <Col span={12}>
                      <p className="product_size">Material</p>
                    </Col>
                  </Row>
                  <Row className=" border_bottom pb-3">
                    <Col span={24}>
                      <Paragraph className="product_size_value">
                        {" "}
                        {getproduct.material}
                      </Paragraph>
                    </Col>
                  </Row>
                  <Row className="mt-4">
                    <Col span={20}>
                      <p className="product_size">Estimated production time</p>
                    </Col>
                  </Row>
                  <Row className="mt-3 border_bottom pb-3">
                    <Col span={24}>
                      <Paragraph className="product_size_value">
                        {getproduct.estimated_time}
                      </Paragraph>
                    </Col>
                  </Row>
                  <Row
                    className="mt-3 border_bottom pb-3"
                    align="middle"
                    justify="space-between"
                  >
                    <Col span={12}>
                      <p className="product_size">Qty</p>
                    </Col>
                    <Col span={10} style={{ textAlign: "end" }}>
                      <Row justify="end" align="middle">
                        <Col>
                          <MinusSquareOutlined
                            className="product_minus"
                            onClick={() => Qty("minus")}
                          />
                        </Col>
                        <Col>
                          <input
                            type="text"
                            // placeholder="1"
                            value={qty_val}
                            onChange={(e) => setQty_val(e.target.value)}
                            style={{
                              width: "32px",
                              height: "32px",
                              fontSize: "20 px",
                              fontWeight: "bolder",
                              textAlign: "center",
                              outline: "none",
                            }}
                            className="Qty_val"
                          />
                        </Col>
                        <Col>
                          <PlusSquareOutlined
                            className="product_plus"
                            onClick={() => Qty("plus")}
                          />
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                  <Row className="mt-3" justify="space-between" align="middle">
                    <Col span={12}>
                      <p className="product_size">Total Price</p>
                    </Col>
                    <Col span={10} style={{ textAlign: "end" }}>
                      <p className="product_price">
                        {getproduct.price * qty_val}{" "}
                      </p>
                    </Col>
                  </Row>
                  <Row className="mt-3">
                    <Col span={24}>
                      {/* <Link to="/cart"> */}
                      <button
                        className="add_cart"
                        onClick={() => add_cart(getproduct.id)}
                      >
                        Add To Cart
                      </button>
                      {/* </Link> */}
                    </Col>
                  </Row>
                  <Row className="mt-3">
                    <Col>
                      <p className="product_size">Custom Size</p>
                    </Col>
                  </Row>

                  <Row className="mt-2 mb-3">
                    <Col span={24} className="product_custom_size">
                      <p className="product_custom_val">
                        {getproduct.custom_size}{" "}
                      </p>
                      <div className="product_custom_arrow">&gt;</div>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Col>
          </Row>
        </div>
      </Row>
    </>
  );
}
