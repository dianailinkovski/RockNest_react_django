import React from "react";
import { Row, Col, Divider, Typography } from "antd";
import { FiVolume2 } from "react-icons/fi";
import { ProgressBarComponent } from "@syncfusion/ej2-react-progressbar";
const { Paragraph } = Typography;
export default function Loading() {
  return (
    <>
      <Row className="body_space">
        <Col span={24} className="loading_page">
          <Row className="mx-6 loading_header" justify="center">
            <Col span={20} className="mt-5">
              <p
                style={{
                  color: "rgba(255, 255, 255, 0.76)",
                  textAlign: "center",
                }}
              >
                May 14, 2023{" "}
              </p>
              <button className="loading_volume">
                {" "}
                <FiVolume2 className="volume_loading mx-auto" />{" "}
              </button>
            </Col>
            <Col span={20} className="mt-2">
              <Divider
                style={{ border: "1px solid rgba(248, 248, 248, 0.16) " }}
              />
            </Col>
          </Row>
          <Row justify="center" style={{ marginTop: "230px" }}>
            <Col span={20} style={{ textAlign: "center" }}>
              <p className="loading_title">Rocknest </p>
            </Col>
          </Row>
          <Row justify="center" className="mt-2">
            <Col span={20} style={{ textAlign: "center" }}>
              <Paragraph className="loading_dec">
                Italian Arabescato Marble Sculpture Handcrafted in EgyptItalian
              </Paragraph>
            </Col>
          </Row>
          <Row justify="center">
            <Col span={16}>
              {/* <ProgressBarComponent
                id="linear"
                type="Linear"
                trackThickness={24}
                progressThickness={24}
                value={100}
                segmentCount={65}
                animation={{
                  enable: true,
                  duration: 4000,
                  delay: 0,
                }}
              ></ProgressBarComponent> */}
               
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
}
