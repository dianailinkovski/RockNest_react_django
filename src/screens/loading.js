import React, { useState, useEffect } from "react";
import { Row, Col, Divider, Typography, Progress } from "antd";
import { FiVolume2 } from "react-icons/fi";
import { green, red } from "@ant-design/colors";
// import { ProgressBarComponent } from "@syncfusion/ej2-react-progressbar";
// import { LinearProgressBar, CircularProgressBar  } from "react-percentage-bar";
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
                <FiVolume2
                  className="volume_loading mx-auto"
                  onClick={start}
                />{" "}
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

            {/* <button onClick={()=>changePercent()} >timezone</button> */}
            {/* {
                Progress()
                  
                
              } */}

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
            {/* </Col> */}
          </Row>
        </Col>
      </Row>
    </>
  );
}
