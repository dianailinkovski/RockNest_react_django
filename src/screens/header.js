import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MenuIcon } from "@heroicons/react/outline";
import { Row, Col, Badge, Dropdown } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/actions/auth";

// import { Button } from "react-bootstrap";
import { getCart_list } from "../redux/actions/recipes";

export default function Header() {
  // const navigate = useNavigate();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);
  // console.log(token, "token");
  const { getcart_list } = useSelector((state) => state.recipes);
  // console.log(getcart_list.length, "getcart_list_header");
  useEffect(() => {
    if (token) {
      const data = {
        username: JSON.parse(sessionStorage.getItem("username")),
      };
      dispatch(getCart_list(data));
    }
  }, [dispatch, token]);
  const items1 = [
    {
      key: "1",
      label: <Link to="/login"> Login </Link>,
    },
    {
      key: "2",
      label: <Link to="/register">Sign Up </Link>,
    },
  ];
  const items2 = [
    {
      key: "3",
      label: <Link onClick={() => handleLogoutClick()}> Logout </Link>,
    },
  ];
  const items = token ? items2 : items1;
  let cart_length=null; 
  if(JSON.parse(sessionStorage.getItem("cartlist_session"))){
     cart_length=JSON.parse(sessionStorage.getItem("cartlist_session")).length;
  }
  const handleLogoutClick = () => {
    // navigate("/");
    dispatch(
      logout({
        refresh: JSON.parse(sessionStorage.getItem("rocket_user")),
      })
    );
    

  };
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
          <Dropdown
            menu={{
              items,
            }}
            placement="bottomLeft"
            arrow
          >
            {/* <Link to="/"> */}
            <button style={{ padding: "5px", border: "2px solid #CBCBCB" }}>
              <MenuIcon
                className="block h-6 w-6 bucket "
                aria-hidden="true"
                style={{ color: "#CBCBCB" }}
              />
            </button>
            {/* </Link> */}
          </Dropdown>
        </Col>
        <Col
          className="mx-3 header_title_position"
          xxl={21}
          xl={19}
          lg={19}
          md={16}
          sm={15}
        >
          <Link to="/" style={{ textDecoration: "none" }}>
            <span className="header_title" style={{ color: "#32383E" }}>
              Rocknest
            </span>{" "}
            &nbsp;
            <span className="header_title" style={{ color: "#FF5858" }}>
              store
            </span>
          </Link>
        </Col>
        {/* </Row> */}
        {/* </Col> */}

        <Col xxl={1} xl={2} lg={2} md={3} sm={3} style={{ textAlign: "end" }}>
          <Link to="/cart">
            <Badge count={cart_length}>
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
