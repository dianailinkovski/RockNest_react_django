import React from "react";
import { Link,useNavigate } from "react-router-dom";
import { MenuIcon } from "@heroicons/react/outline";
import { Row, Col, Badge } from "antd";
import { useDispatch, useSelector } from "react-redux";

// import { Button } from "react-bootstrap";

export default function Header() {
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);
  console.log(token,"token");
  const logout = () => {
    localStorage.removeItem("rocket_user");
    navigate('/');
    alert("Successfully Logout");
  }
  return (
    <>
      <Row
        className="header_style body_space"
        align="middle"
        justify="space-between"
      >
        {/* <Col xxl={10} xl={10} lg={10} md={12} sm={17}> */}
        {/* <Row align="middle"> */}
        <Col xxl={1} xl={2} lg={2} md={3} sm={3}>
          <Link to="/">
            <button style={{ padding: "5px", border: "2px solid #CBCBCB" }}>
              <MenuIcon
                className="block h-6 w-6 bucket "
                aria-hidden="true"
                style={{ color: "#CBCBCB" }}
              />
            </button>
          </Link>
        </Col>
        <Col
          className="mx-3 header_title_position"
          xxl={21}
          xl={19}
          lg={19}
          md={16}
          sm={15}
        >
          <span className="header_title" style={{ color: "#32383E" }}>
            Rocknest
          </span>{" "}
          &nbsp;
          <span className="header_title" style={{ color: "#FF5858" }}>
            store
          </span>
        </Col>
        {/* </Row> */}
        {/* </Col> */}

        <Col xxl={1} xl={2} lg={2} md={3} sm={3} style={{ textAlign: "end" }}>
          {
            token  && <button style={{ padding: "5px", border: "2px solid #CBCBCB" }} onClick={()=>logout()} >Logout</button>
          }
          
          <Link to="/cart">
            <Badge count={2}>
              <button style={{ padding: "5px", border: "2px solid #CBCBCB" }}>
                <img src="../../bucket.svg" alt="bucket" className="bucket" />
              </button>
            </Badge>
          </Link>
        </Col>
      </Row>
    </>
  );
}
