import React, { useState, useEffect } from "react";
import { Row, Col, Divider, Typography, Progress } from "antd";
import   LandingImage  from '../assets/landing_image.png';
const { Paragraph } = Typography;

export default function Loading() {
  // const Progress = () => {
  //   // for(var i=1; i<100; i=i+10) {
  //     return <Progress steps={3} percent={i} size={[20, 30]} />
  // //   }
  // }
  var audio = new Audio("../../sound.mp3");
  const start = () => {
    audio.play();
  };
  let [percent, setPercent] = useState(0);

  useEffect(() => {
    changePercent();
  }, []);
  const changePercent = () => {
    let intVal = setInterval(() => {
      if (percent < 100) {
        percent = percent + 1;
        setPercent(percent);
      }
      if (percent === 100) {
        clearInterval(intVal);
      }
    }, 10);
  };

  return (
    <>
      <Row className="body_space mobile_body">
        <Col span={24} className="loading_page" >
          <Row className="mx-6 loading_header" justify="center">
            <Col span={20} className="mt-5">
              
            </Col>
            <Col span={20} className="mt-2">

            </Col>
          </Row>
          <Row justify="center" style={{ marginTop: "230px" }}>
            <Col span={20} style={{ textAlign: "center" }}>
              <img src = { LandingImage } style= {{ width : '100%' }} />
            </Col>
          </Row>
          
          <Row justify="center" align="middle" >
            <Col span={16} style={{ textAlign: "center" }}>
              <Progress
                percent={percent}
                steps={50}
                size={[10, 30]}
                className="progress_customize1"
                 
              />
            </Col>
            <Col span={16} style={{ textAlign: "center" }}>
              <Progress
                percent={percent}
                steps={50}
                size={[6, 30]}
                className="progress_customize2"
              />
            </Col>

            <Col span={16} style={{ textAlign: "center" }}>
              <Progress
                percent={percent}
                steps={28}
                size={[10, 30]}
                className="progress_customize3"
              />
            </Col>

            <Col span={16} style={{ textAlign: "center" }}>
              <Progress
                percent={percent}
                steps={40}
                size={[5, 30]}
                className="progress_customize4"
              />
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
}
