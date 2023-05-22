import React from "react";
import { MenuIcon } from "@heroicons/react/outline";
import { Row, Col, Badge } from "antd";
import { Link } from "react-router-dom";

// import { Button } from "react-bootstrap";

export default function header() {
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
