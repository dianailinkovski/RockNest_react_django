import React from "react";
import { Row, Col, Divider } from "antd";
import { InstagramOutlined } from "@ant-design/icons";
import { FiVolume2 } from "react-icons/fi";
export default function Sidebar() {
  var audio = new Audio("../../sound.mp3");
  const start = () => {
    audio.play()
  }
  return (
    <>
      <Row className="sidebar">
        <Col span={24}>
          <Row>
            <Col
              span={24}
              className="mt-5"
              style={{ textAlign: "center", height: "30px" }}
            >
              Sound On
            </Col>
          </Row>
          <Row justify="center">
            <Col span={24}>
              <FiVolume2 className="volume_icon mx-auto" style={{ width: '100%' }} onClick={start} />
            </Col>
          </Row>
          <Row justify="center" className="">
            <Col span={15}>
              <Divider style={{ border: "1px solid rgba(60, 67, 74, 0.12)" }} />
            </Col>
          </Row>
          <Row justify="center">
            <Col span={24} style={{ display: 'flex', justifyContent : 'center'}}>
              <a href="https://www.instagram.com/rocknestlimited/" > <InstagramOutlined className="instagram_icon" /></a>
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
}
