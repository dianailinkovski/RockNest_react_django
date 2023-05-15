import React, { useEffect, useState } from "react";
import { Row, Col, Typography, InputNumber } from "antd";
// import { useDispatch, useSelector } from "react-redux";
import { MinusSquareOutlined, PlusSquareOutlined } from "@ant-design/icons";
import Sidebar from "./sidebar";
import { Link } from "react-router-dom";
// import "./custom";
import $ from "jquery";
import { Card } from "react-bootstrap";
// import { AiOutlineMinus } from "react-icons/ai";
// import { getProducts } from "../redux/actions/recipes";
const { Title, Paragraph } = Typography;
export default function Cart() {
  //   const dispatch = useDispatch();
  //   const { getproducts } = useSelector((state) => state.recipes);

  //   useEffect(() => {
  //     dispatch(getProducts());
  //   }, [dispatch]);

  const Qty = (flag, id) => {
    if (flag == "plus") {
      $("#minus" + id).addClass("active");
      const set_val = Number($("#input" + id).val()) + 1;
      $("#input" + id).val(set_val);
      // setQty_val(qty_val + 1);
    } else {
      if ($("#input" + id).val() == 1) {
        return;
      }
      const set_val = Number($("#input" + id).val()) - 1;
      $("#input" + id).val(set_val);
      if (set_val == 1) {
        $("#minus" + id).removeClass("active");
      }
    }
  };
  const onChange = (id) => {
    const set_val = Number($("#input" + id).val());
    console.log(set_val, "setval");
    $("#input" + id).val(set_val);
  };
  return (
    <>
      <Row className="body_space">
        <div className="sidebar_position">
          <Sidebar />
        </div>
        <div className="page_content">
          <Row>
            <Col span={24} className="cart_mobile_position">
              <Row className="mt-5">
                <Col style={{ fontSize: "15px" }} span={20}>
                  <Link
                    to={`/`}
                    style={{
                      textDecoration: "none",
                      color: "#32383E",
                      opacity: "0.43",
                    }}
                  >
                    {" "}
                    Home{" "}
                  </Link>
                  &nbsp;&nbsp; &gt;&nbsp;&nbsp;
                  <b className="detail_path">Cart</b>
                </Col>
              </Row>
              <Row className="mt-4">
                <Col span={20}>
                  <Title level={2} className="cart_name">
                    Cart
                  </Title>
                </Col>
              </Row>
              <Row className="mt-3">
                <Col span={24}>
                  <Card style={{ border: "none" }}>
                    <Card.Body style={{ backgroundColor: "#F9F9FA" }}>
                      <Row>
                        <div className="cart_img_position">
                          <img
                            src="../../landing.svg"
                            className="cart_img"
                            alt="cart_image"
                          />
                        </div>
                        <div className="cart_img_right">
                          <Row>
                            <Col>
                              <p className="cart_product_name">
                                Alexander The Great
                              </p>
                            </Col>
                          </Row>
                          <Row className="cart_bottom">
                            <Col span={24}>
                              <Paragraph className="cart_product_desc">
                                Italian Arabescato Marble Sculpture Handcrafted
                                in Egypt
                              </Paragraph>
                            </Col>
                          </Row>
                          <Row justify="space-between" className="cart_bottom">
                            <Col span={12}>
                              <p className="cart_price_title">Price</p>
                            </Col>
                            <Col span={12} style={{ textAlign: "end" }}>
                              <p> $369 </p>
                            </Col>
                          </Row>
                          <Row className="mt-3" align="middle">
                            <Col>
                              <MinusSquareOutlined
                                className="product_minus"
                                onClick={() => Qty("minus", "1")}
                                id="minus1"
                              />
                            </Col>
                            <Col>
                              <input
                                type="text"
                                // placeholder="1"
                                id="input1"
                                value="1"
                                onChange={() => onChange(1)}
                                style={{
                                  width: "32px",
                                  height: "32px",
                                  fontSize: "20 px",
                                  fontWeight: "bolder",
                                  textAlign: "center",
                                  outline: "none",
                                  backgroundColor: "#F9F9FA",
                                }}
                                className="Qty_val"
                              />
                            </Col>
                            <Col>
                              <PlusSquareOutlined
                                className="product_plus"
                                onClick={() => Qty("plus", "1")}
                              />
                            </Col>
                          </Row>
                        </div>
                      </Row>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
              <Row className="mt-3">
                <Col span={24}>
                  <Card style={{ border: "none" }}>
                    <Card.Body style={{ backgroundColor: "#F9F9FA" }}>
                      <Row>
                        <div className="cart_img_position">
                          <img
                            src="../../landing.svg"
                            className="cart_img"
                            alt="cart_image"
                          />
                        </div>
                        <div className="cart_img_right">
                          <Row>
                            <Col>
                              <p className="cart_product_name">
                                Alexander The Great
                              </p>
                            </Col>
                          </Row>
                          <Row className="cart_bottom">
                            <Col span={24}>
                              <Paragraph className="cart_product_desc">
                                Italian Arabescato Marble Sculpture Handcrafted
                                in Egypt
                              </Paragraph>
                            </Col>
                          </Row>
                          <Row justify="space-between" className="cart_bottom">
                            <Col span={12}>
                              <p className="cart_price_title">Price</p>
                            </Col>
                            <Col span={12} style={{ textAlign: "end" }}>
                              <p> $369 </p>
                            </Col>
                          </Row>
                          <Row className="mt-3" align="middle">
                            <Col>
                              <MinusSquareOutlined
                                className="product_minus"
                                onClick={() => Qty("minus", "1")}
                                id="minus1"
                              />
                            </Col>
                            <Col>
                              <input
                                type="text"
                                // placeholder="1"
                                id="input1"
                                value="1"
                                onChange={() => onChange(1)}
                                style={{
                                  width: "32px",
                                  height: "32px",
                                  fontSize: "20 px",
                                  fontWeight: "bolder",
                                  textAlign: "center",
                                  outline: "none",
                                  backgroundColor: "#F9F9FA",
                                }}
                                className="Qty_val"
                              />
                            </Col>
                            <Col>
                              <PlusSquareOutlined
                                className="product_plus"
                                onClick={() => Qty("plus", "1")}
                              />
                            </Col>
                          </Row>
                        </div>
                      </Row>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
              <Row justify="space-between" className="mt-4 cart_bottom pb-4">
                <Col span={10}>
                  <p className="cart_price_title" style={{ fontSize: "18px" }}>
                    Subtotal
                  </p>
                </Col>
                <Col
                  span={10}
                  style={{ textAlign: "end", fontSize: "18px", color: "black" }}
                >
                  <p> $369 </p>
                </Col>
              </Row>
              <Row justify="space-between" className="mt-4">
                <Col span={10}>
                  <p className="cart_price_title" style={{ fontSize: "18px" }}>
                    Total
                  </p>
                </Col>
                <Col
                  span={10}
                  style={{ textAlign: "end", fontSize: "18px", color: "black" }}
                >
                  <p> $234 </p>
                </Col>
              </Row>
              <Row className="check_height">
                <Col lg={12} md={12} sm={24} xs={24}>
                  <button className="btn_check">Check Out</button>
                </Col>
              </Row>
            </Col>
          </Row>
        </div>
      </Row>
    </>
  );
}
