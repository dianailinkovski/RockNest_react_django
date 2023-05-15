import React, { useEffect, useState } from "react";
import { Row, Col, Typography, InputNumber } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { MinusSquareOutlined, PlusSquareOutlined } from "@ant-design/icons";
import Sidebar from "./sidebar";
import { Link, useParams } from "react-router-dom";
// import "./custom";
import $ from "jquery";

// import { AiOutlineMinus } from "react-icons/ai";
import { getProduct } from "../redux/actions/recipes";
const { Title, Paragraph } = Typography;
export default function Product() {
    const dispatch = useDispatch();
    let { id } = useParams();
    const { getproduct } = useSelector((state) => state.recipes);

    useEffect(() => {
      dispatch(getProduct(id));
    }, [dispatch]);

  const [qty_val, setQty_val] = useState(1);
  useEffect(()=>{
    if (qty_val > 1) {
      $(".product_minus").addClass("active");
    } else {
      $(".product_minus").removeClass("active");
    }
  },[qty_val])
  const Qty = (flag) => {
    
    if (flag == "plus") {
      const set_val=Number(qty_val)+1;
      setQty_val(set_val);
      // setQty_val(qty_val + 1);
    } else {
      if (qty_val == 1) {
        return;
      }
      const set_val=Number(qty_val)-1;
      setQty_val(set_val);
    }
  };

  return (
    <>
      <Row className="body_space">
        <div className="sidebar_position">
          <Sidebar />
        </div>
        <div className="page_content" >
          <Row>
            <Col span={24}>
              <Row >
                <Col xl={11} lg={10} md={24} sm={24} className="product_left">
                  <Row className="mt-5 product_mobile_left" >
                    <Col style={{ fontSize: "15px",marginLeft:"20px" }} span={20}>
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
                      <b className="detail_path">Alexander The Great</b>
                    </Col>
                  </Row>
                  <Row className="mt-5" justify="center">
                    <Col lg={20} md={20} sm={24} >
                      <img src="../../landing.svg" alt="product detail" style={{margin : "auto"}} />
                    </Col>
                  </Row>
                </Col>
                <Col xl={11} lg={11} md={24} sm={24} className="mt-4 product_right">
                  <Row className="product_name_mobile">
                    <Col span={24}>
                      <Title className="product_name">
                        Alexander The Great
                      </Title>
                    </Col>
                  </Row>
                  <Row className="border_bottom pb-3 product_name_mobile">
                    <Col>
                      <Paragraph className="product_dec">
                        Italian Arabescato Marble Sculpture Handcrafted In Egypt
                      </Paragraph>
                    </Col>
                  </Row>
                  <Row className="mt-4">
                    <Col xl={12} lg={12} md={12} sm={14} xs={15} >
                      <p className="product_size">Dimensions</p>
                    </Col>
                    <Col xl={10} lg={10} md={10} sm={10} xs={9}>
                      <p className="product_size">Made In</p>
                    </Col>
                  </Row>
                  <Row className=" border_bottom pb-3">
                    <Col xl={12} lg={12} md={12} sm={14} xs={14} >
                      <Paragraph className="product_size_value">
                        H 71cm X D 37cm X W 37cm
                      </Paragraph>
                    </Col>
                    <Col xl={10} lg={10} md={10} sm={10} xs={10}>
                      <Paragraph className="product_size_value">
                        Canada Country
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
                        Italian Arabescato Marble Sculpture Handcrafted in
                        EgyptItalian Arabescato Marble Sculpture.
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
                        8 _ 11 weeks
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
                      <p className="product_price">$123</p>
                    </Col>
                  </Row>
                  <Row className="mt-3">
                    <Col span={24}>
                      <button className="add_cart">Add To Cart</button>
                    </Col>
                  </Row>
                  <Row className="mt-3">
                    <Col>
                      <p className="product_size">Custom Size</p>
                    </Col>
                  </Row>

                  <Row className="mt-2 mb-3">
                    <Col span={24} className="product_custom_size">
                      <p className="product_custom_val">100*100*100</p>
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
