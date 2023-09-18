import React, { useState, useEffect } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import fetch from "isomorphic-fetch";
import RevolutCheckout from "@revolut/checkout";
import { Row, Col, Space } from "antd";
import { useDispatch, useSelector } from "react-redux";
import Sidebar from "./sidebar";
import ReactFlagsSelect from "react-flags-select";
import PhoneInput from 'react-phone-input-2'
import "react-phone-input-2/lib/style.css";
import "./flags.css";
import { CountryDropdown, RegionDropdown  } from 'react-country-region-selector';
import PhoneNumber from 'libphonenumber-js';
import axios from 'axios'
import { countries, continents } from 'country-data';
import dayjs from 'dayjs';
// import * as turf from '@turf/turf';
// import CountryFlag from './countryFlag';
import {
  Steps,
  Typography,
  Input,
  Divider,
  Tooltip,
  Radio,
  DatePicker,
  message,
  Select
} from "antd";
import {
  UserOutlined,
  QuestionOutlined,
  EditOutlined,
} from "@ant-design/icons";
import {
  MdLocationOn,
  MdLanguage,
  MdOutlineAssignment,
  MdEmail,
  MdCreditCard,
} from "react-icons/md";
import { Form as Form1, Button } from "react-bootstrap";
import {
  getCart_list,
  create_address,
  payment_save,
  getpayment,
} from "../redux/actions/recipes";

const inputStyle = {
  height: "48px",
  padding: "10px 10px 10px 16px",
  borderRadius: "1px",
  fontSize: "15px",
};
const selectStyle = {
  height: "48px",
  padding: "10px 10px 10px 16px",
  borderRadius: "1px",
  fontSize: "15px",
  width: "100%",
  border:"1px solid #d9d9d9"
};
const ToolTip = {
  background: "#CF3A2B",
  borderRadius: "50px",
  color: "white",
  fontSize: "10px",
  padding: "2px",
  scale: "1.3",
};
const { Step } = Steps;
const { Text, Paragraph } = Typography;
const { Option } = Select;
const steps = [
  {
    title: "Shipping Address",
  },
  {
    title: "Shipping Method",
  },
  {
    title: "Payment",
  },
  {
    title: "Review",
  },
];
function ProductStep() {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const [sub_total, set_subtotal] = useState(0);
  const { getcart_list } = useSelector((state) => state.recipes);
  const { getpayment_data } = useSelector((state) => state.recipes);
  const [first_name, setFirst_name] = useState("");
  const [last_name, setlast_name] = useState("");
  const [address, setaddress] = useState("");
  const [country, setcountry] = useState("");

  const [countryCode, setcountryCode] = useState('');

  const [city, setcity] = useState("");
  const [phone_number, setphone_number] = useState("");
  const [post_code, setpost_code] = useState("");
  const [state_region, setstate_region] = useState("");
  const [company, setcompany] = useState("");
  const [current, setCurrent] = useState(0);
  const [method, setMethod] = useState(1);
  const [enable, setEnable] = useState(false);

console.log(phone_number,' phone number')
  const shipping_address = JSON.parse(sessionStorage.getItem('shipping_address'))
  useEffect(() => {
    if (shipping_address) {
      if(shipping_address.username == JSON.parse(sessionStorage.getItem("username"))){
        setFirst_name(shipping_address.first_name);
        setlast_name(shipping_address.last_name);
        setaddress(shipping_address.address);
        setcountry(shipping_address.country);
        setcity(shipping_address.city);
        setphone_number(shipping_address.phone_number);
        setpost_code(shipping_address.post_code)
        setstate_region(shipping_address.state_region)
        setcompany(shipping_address.company)
      }
      
    }
  }, [])

  
  const changecountry =async (val) => {
    setcountry(val);
    console.log(val,'set country125');
  //  const code = fetchCountryCode(val);
    // console.log(code,'countryCode')
    const response = await axios.get(`https://restcountries.com/v3/name/${val}`);
    const data = response.data[0];
    const code = data.cca2
    console.log(code,' code')
    setcountryCode(code);
    const phoneNumberObj = PhoneNumber.getExampleNumberForType(code, 'MOBILE');
    if (phoneNumberObj) {
      const phonePrefix = PhoneNumber.format(phoneNumberObj, PhoneNumber.NATIONAL);
      setphone_number(phonePrefix);
      console.log(phonePrefix,'phonePrefix')
    } else {
      setphone_number('N/A'); // Handle countries without mobile number examples
    }
  }
  
  //get continent
  // function getContinentByCountry(countryIdentifier) {
  //   let country;
  
  //   // Check if the input is a country code
  //   if (countryIdentifier.length === 2) {
  //     country = countries[countryIdentifier.toUpperCase()];
  //   } else {
  //     // Find the country by name (case-insensitive)
  //     const countryName = countryIdentifier.toLowerCase();
  //     country = Object.values(countries).find((c) => c.name.toLowerCase() === countryName);
  //   }
  
  //   if (!country) {
  //     return 'Unknown'; // Handle cases where the country is not found
  //   }
  
  //   const continentName = continents[country.region].name;
  //   return continentName;
  // }
  
  // // Example usage:
  // const countryCode123 = 'US'; // or 'United States'
  // const continent = getContinentByCountry(countryCode123);
  // console.log(`The continent for ${countryCode123} is ${continent}`);

  // console.log(getpayment_data.payment_response.public_id,"getpayment_data")
  useEffect(() => {
    // if(current === 3){
    const data = {
      username: JSON.parse(sessionStorage.getItem("username")),
      amount: 0
    };
    dispatch(getpayment(data));
    // }


  }, [])
  // console.log(getpayment_data.payment_response.public_id,"public_id")
  async function handleFormSubmit(event) {
    event.preventDefault();
    const data1 = {
      username: JSON.parse(sessionStorage.getItem("username")),
      amount: sub_total + shipping_price
    };
    dispatch(getpayment(data1));
    const data = {
      username: JSON.parse(sessionStorage.getItem("username")),
    };
    console.log(data.username, "234567");
    const RC = await RevolutCheckout(
      getpayment_data.payment_response.public_id,
      "sandbox"
    );

    RC.payWithPopup({
      name: data.username,
      onSuccess() {
        const data = {
          username: JSON.parse(sessionStorage.getItem("username")),
        };
        dispatch(payment_save(data));
        // alert("Thank you");

      },
      onError(message) {
        alert("Oh no : (" + message);
      },
      onCancel() {
        alert("Payment cancelled");
      },
    });
  }


  // console.log(getcart_list, "getcart_list");
  useEffect(() => {
    if (token && getCart_list.length === 0) {
      const data = {
        username: JSON.parse(sessionStorage.getItem("username")),
      };
      dispatch(getCart_list(data));
    }
    let total = 0;
    if (getcart_list.length > 0)
      getcart_list.map((val) => {
        return (total += val.total_item_price);
      });
    set_subtotal(total);
  }, [dispatch, getcart_list]);


  const shipping_price = method == 1 ? 12 : 0;
  // const next = () => {
  //   setCurrent(current + 1);
  // };

  const prev = () => {
    setCurrent(current - 1);
  };

  const continue1 = () => {
    if (
      !first_name ||
      !last_name ||
      !address ||
      !country ||
      !city ||
      !phone_number ||
      !post_code ||
      !state_region ||
      !company
    ) {
      message.error("You have to enter all items.");
      return;
    }
    const data = {
      username: JSON.parse(sessionStorage.getItem("username")),
      first_name: first_name,
      last_name: last_name,
      address: address,
      country: country,
      city: city,
      phone_number: phone_number,
      post_code: post_code,
      state_region: state_region,
      company: company
    };
    dispatch(create_address(data));
    sessionStorage.setItem('shipping_address', JSON.stringify(data));
    setCurrent(current + 1);
  };
  const continue2 = () => {
    setCurrent(current + 1);
  };
  const continue3 = () => {
    // alert("continue3");
    setCurrent(current + 1);
  };

  const changeRadioMethod = (e) => {
    setMethod(e.target.value);
    // console.log(e.target.value);
  };

  //set card number format
    const [cardNumber, setCardNumber] = useState('');

    const handleInputChange = (e) => {
      const inputText = e.target.value;
      // Remove any non-digit characters
      const cleanedInput = inputText.replace(/\D/g, '');
      
      // Format the cleaned input with dashes
      const formattedInput = formatCardNumber(cleanedInput);
      
      setCardNumber(formattedInput);
    };

    const formatCardNumber = (input) => {
      if (input.length < 4) {
        return input;
      }

      return input.match(/.{1,4}/g).join(' ');
    };
  //end
  //set disable date
  const disabledDate = (current) => {
    // Can not select days before today and today
    return current && current < dayjs().endOf('day');
  };

  return (
    <>
      <Row className="body_space">
        <div className="sidebar_position">
          <Sidebar />
        </div>
        <div className="page_content">

          <Row>
            <Col md={24} lg={14} className="step-left">
              <Row>
                <Steps size="small" current={current}>
                  {steps.map((item) => (
                    <Step key={item.title} title={item.title} />
                  ))}
                </Steps>
              </Row>
              {current === 0 ? (
                <div>
                  <Row className="my-4">
                    <Text className="font-title">Shipping Address</Text>
                  </Row>
                  <Row gutter={[12, 12]}>
                    <Col xs={24} sm={12}>
                      <Row>
                        <Text className="font-label">First Name</Text>
                      </Row>
                      <Row className="mt-1">
                        <Input
                          prefix={<UserOutlined style={{ scale: "1.5" }} />}
                          placeholder="mostafa"
                          style={inputStyle}
                          value={first_name}
                          onChange={(e) => setFirst_name(e.target.value)}
                          required
                        />
                      </Row>
                    </Col>
                    <Col xs={24} sm={12}>
                      <Row>
                        <Text className="font-label">Last Name</Text>
                      </Row>
                      <Row className="mt-1">
                        <Input
                          prefix={<UserOutlined style={{ scale: "1.5" }} />}
                          placeholder="taghipour"
                          style={inputStyle}
                          value={last_name}
                          onChange={(e) => setlast_name(e.target.value)}
                        />
                      </Row>
                    </Col>
                  </Row>
                  <Row className="mt-3">
                    <Col span={24}>
                      <Row>
                        <Text className="font-label">Address</Text>
                      </Row>
                      <Row className="mt-1">
                        <Input
                          placeholder="Parker Rd. Allentown, New Mexico 31134"
                          prefix={<MdLocationOn style={{ scale: "1.7" }} />}
                          style={inputStyle}
                          value={address}
                          onChange={(e) => setaddress(e.target.value)}
                        />
                      </Row>
                    </Col>
                  </Row>
                  <Row className="mt-3">
                    <Col span={24}>
                      <Row>
                        <Text className="font-label">Company</Text>
                      </Row>
                      <Row className="mt-1">
                        <Input
                          prefix={<img alt="company" src="company.svg" />}
                          placeholder="company (optional)"
                          style={inputStyle}
                          value={company}
                          onChange={(e) => setcompany(e.target.value)}
                        />
                      </Row>
                    </Col>
                  </Row>
                  <Row className="mt-3">
                    <Col span={24}>
                      <Row>
                        <Text className="font-label">Country</Text>
                      </Row>
                      <Row className="mt-1">
                        <CountryDropdown
                          value={country}
                          onChange={(val) => changecountry(val)}
                          style={selectStyle} />

                        {/* <ReactFlagsSelect
                            selected={country}
                            onSelect={onSelect}
                            searchable={searchable}
                          /*showSelectedLabel={showSelectedLabel}
                          selectedSize={selectedSize}
                          showOptionLabel={showOptionLabel}
                          optionsSize={optionsSize}
                          placeholder={placeholder}
                          searchable={searchable}
                          searchPlaceholder={searchPlaceholder}
                          alignOptionsToRight={alignOptionsToRight}
                          fullWidth={fullWidth}
                          disabled={disabled}  
              />*/  }
                        {/* <Input
                            prefix={<img alt="country" src="country.svg" />}
                            placeholder="Egypt"
                            style={inputStyle}
                            value={country}
                            onChange={(e) => setcountry(e.target.value)}
                          /> */}
                        {/* <Select
                          size="large"
                          showSearch
                          placeholder="Select a person"
                          optionFilterProp="children"
                          onChange={onCountryChange}
                          onSearch={onCountrySearch}
                          filterOption={(input, option) =>
                            (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                          }
                          style={{ width : '100%',}}
                        >
                          {countries.map((country) => (
                            <Option value={country.code} key={country.name}>
                              {country.name}
                            </Option>
                          ))}
                        </Select> */}

                      </Row>
                    </Col>
                  </Row>
                  <Row className="mt-3">
                    <Col span={24}>
                      <Row>
                        <Text className="font-label">State or Region</Text>
                      </Row>

                      <RegionDropdown
                        country={country}
                        value={state_region}
                        onChange={(val) => setstate_region(val)} 
                        style = { selectStyle }
                        />
                      {/* <Input
                          prefix={<MdLanguage style={{ scale: "1.7" }} />}
                          placeholder="region oliuyr"
                          style={inputStyle}
                          value={state_region}
                          onChange={(e) => setstate_region(e.target.value)}
                        /> */}
                      {/* <Select
                          showSearch
                          size="large"
                          style={{ width: '100%' }}
                          placeholder="Select a region"
                          optionFilterProp="children"
                          onChange={handleRegionChange}
                          filterOption={(input, option) =>
                            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                          }
                          disabled={!selectedCountry}
                        >
                          {regions.length && regions.map((region) => (
                            <Option key={region} value={region}>
                              {region}
                            </Option>
                          ))}
                        </Select> */}
                  
                </Col>
                  </Row>
          <Row className="mt-3" gutter={[12, 12]}>
            <Col xs={24} sm={12}>
              <Row>
                <Text className="font-label">City</Text>
              </Row>
              <Row className="mt-1">
                <Input
                  prefix={<img alt="city" src="city.svg" />}
                  placeholder="Cairo"
                  style={inputStyle}
                  value={city}
                  onChange={(e) => setcity(e.target.value)}
                />
              </Row>
            </Col>
            <Col xs={24} sm={12}>
              <Row>
                <Text className="font-label">Postcode</Text>
              </Row>
              <Row className="mt-1">
                <Input
                  prefix={
                    <MdOutlineAssignment style={{ scale: "1.5" }} />
                  }
                  placeholder="996564736257"
                  style={inputStyle}
                  value={post_code}
                  onChange={(e) => setpost_code(e.target.value)}
                />
              </Row>
            </Col>
          </Row>
          <Row className="mt-3">
            <Col span={24}>
              <Row>
                <Text className="font-label">Phone Number</Text>
              </Row>
              <Row className="mt-1">
                {/* <Input
                          prefix={<img alt="phone" src="phone.svg" />}
                          placeholder="+964 6574 628913 "
                          style={inputStyle}
                          value={phone_number}
                          onChange={(e) => setphone_number(e.target.value)}
                        /> */}
                <PhoneInput
                  country={country}
                  value= {phone_number}
                  onChange={phone => setphone_number(phone)}
                />
              </Row>
            </Col>
          </Row>
        </div>
        ) : current === 1 ? (
        <div>
          <Row className="my-4">
            <Text className="font-title">Shipping Method</Text>
          </Row>
          <Row>
            <Radio.Group
              size="large"
              value={method}
              onChange={(e) => changeRadioMethod(e)}
            >
              <Space direction="vertical">
                <Radio value={1}>
                  <Row align="middle">
                    {" "}
                    <Text className="mr-3">$12 front door</Text>
                    <Tooltip
                      title="shipping method"
                      style={{ top: "0" }}
                      placement="right"
                    >
                      <QuestionOutlined style={ToolTip}>
                        ?
                      </QuestionOutlined>
                    </Tooltip>
                  </Row>
                </Radio>
                <Radio className="mt-3" value={2}>
                  <Row>
                    <Text>Arrange shipping yourself</Text>
                  </Row>
                </Radio>
              </Space>
            </Radio.Group>
            <Row className="mt-2">
              <Paragraph
                style={{ fontSize: "13px", marginLeft: "24px" }}
              >
                Lorem ipsum was conceived as filler text, formatted in
                a certain way to enable the presentation of graphic
                elements in documents, without the need for formal
                copy. Using Lorem Ipsum allows designers to put
                together layouts and the form of the content before
                the content has been
              </Paragraph>
            </Row>
          </Row>
          <Divider />
          <Row className="mt-3">
            <Text strong>Ship Form : </Text>
            <Text strong> &nbsp;&nbsp;&nbsp; {country}</Text>
          </Row>
        </div>
        ) : current === 2 ? (
        <div>
          <Row className="my-4">
            <Text className="font-title">Payment Method</Text>
          </Row>
          <Row gutter={[12, 12]}>
            <Col xs={24} sm={12}>
              <Row>
                <Input
                  prefix={<img alt="card" src="visa.svg" />}
                  suffix={
                    <Form1.Check
                      type="radio"
                      defaultChecked
                      onClick={() => setEnable(false)}
                      name="card"
                      style={{ scale: "1.7" }}
                    />
                  }
                  placeholder="credit card"
                  style={inputStyle}
                />
              </Row>
            </Col>
            <Col xs={24} sm={12}>
              <Row>
                <Input
                  prefix={<img alt="card" src="paypal.svg" />}
                  suffix={
                    <Form1.Check
                      type="radio"
                      name="card"
                      onClick={() => setEnable(true)}
                      style={{ scale: "1.7" }}
                    />
                  }
                  style={inputStyle}
                />
              </Row>
            </Col>
          </Row>
          <Row className="mt-3">
            <Text strong className="font-title">
              Card Details
            </Text>
          </Row>
          <Row className="mt-3">
            <Col span={24}>
              <Row>
                <Text className="font-label">Email</Text>
              </Row>
              <Row className="mt-1">
                <Input
                  disabled={enable}
                  prefix={<MdEmail style={{ scale: "1.5" }} />}
                  placeholder="mostafataghipour108@gmail.com"
                  style={inputStyle}
                  
                />
              </Row>
            </Col>
          </Row>
          <Row className="mt-3">
            <Col span={24}>
              <Row>
                <Text className="font-label">Card Number</Text>
              </Row>
              <Row className="mt-1">
                <Input
                  disabled={enable}
                  prefix={<MdCreditCard style={{ scale: "1.5" }} />}
                  suffix={
                    <img
                      alt="card"
                      src="visa.svg"
                      
                    />
                  }
                  placeholder="6032  4567  9876  9234"
                  style={inputStyle}
                  value={cardNumber}
                  onChange={handleInputChange}
                  maxLength={19}
                />
              </Row>
            </Col>
          </Row>
          <Row className="mt-3">
            <Col span={24}>
              <Row>
                <Text className="font-label">Card Holder</Text>
              </Row>
              <Row className="mt-1">
                <Input
                  disabled={enable}
                  prefix={<UserOutlined style={{ scale: "1.5" }} />}
                  placeholder="Input the card holder name"
                  style={inputStyle}
                />
              </Row>
            </Col>
          </Row>
          <Row className="mt-3" gutter={[12, 12]}>
            <Col xs={24} sm={12}>
              <Row>
                <Text className="font-label">Exp</Text>
              </Row>
              <Row className="mt-1">
                <DatePicker
                  disabled={enable}
                  placeholder="select date"
                  className="w-100"
                  style={inputStyle}
                  disabledDate={disabledDate}
                />
              </Row>
            </Col>
            <Col xs={24} sm={12}>
              <Row className="mt-1">
                <Text className="font-label">Cvv2</Text>
              </Row>
              <Row>
                <Input
                  disabled={enable}
                  prefix={<img alt="cvv2" src="cvv2.svg" />}
                  placeholder="5465"
                  style={inputStyle}
                  maxLength={4}
                />
              </Row>
            </Col>
          </Row>
        </div>
        ) : (
        <div>
          <Row className="my-4">
            <Text className="font-title">Delivery Address</Text>
          </Row>
          <Row align="middle">
            <Col span={22}>
              <Text>
                2972 Westheimer Rd. Santa Ana, Illinois 854862972
                Westheimer{" "}
              </Text>
            </Col>
            <Col span={2} style={{ textAlign: "end" }}>
              <EditOutlined />
            </Col>
          </Row>
          <Divider />
          <Row className="mt-3">
            <Text className="font-title">Payment Method</Text>
          </Row>
          <Row className="mt-3" align="middle">
            <Col xs={4} sm={3} lg={2} xl={1}>
              {enable && <img alt="card" src="card.svg" />}
            </Col>
            <Col xs={18} sm={19} lg={20} xl={21}>
              {enable && <Text>paypal</Text>}
              {!enable && <Text>Credit Card</Text>}
            </Col>
            <Col
              xs={2}
              sm={2}
              lg={2}
              xl={2}
              style={{ textAlign: "end" }}
            >
              <EditOutlined />
            </Col>
          </Row>
          <Divider />
          <Row className="mt-3">
            <Col span={18}>
              <Text className="font-title">Shipping</Text>
            </Col>
            <Col span={6} style={{ textAlign: "end" }}>
              <Text className="font-title">${shipping_price}</Text>
            </Col>
          </Row>
          <Divider />
          <Row className="mt-3">
            <Col span={18}>
              {
                getcart_list.length > 1 && (
                  <Text>Subtotal ({getcart_list.length} items): </Text>
                )
              }
              {
                getcart_list.length === 1 && (
                  <Text>Subtotal ({getcart_list.length} item): </Text>
                )
              }
            </Col>
            <Col span={6} style={{ textAlign: "end" }}>
              <Text className="font-title">${sub_total}</Text>
            </Col>
          </Row>
          <Divider />
          <Row className="mt-3">
            <Col span={18}>
              <Text>Order total</Text>
            </Col>
            <Col span={6} style={{ textAlign: "end" }}>
              <Text className="font-title">
                ${sub_total + shipping_price}
              </Text>
            </Col>
          </Row>
        </div>
              )}
        <Row className="my-5" gutter={[16, 16]}>
          <Col span={current > 0 && current < 3 ? 6 : 0}>
            {current > 0 && current < 3 && (
              <button className="btn_prev" onClick={() => prev()}>
                Back
              </button>
            )}
          </Col>
          <Col span={current > 0 && current < 3 ? 18 : 24}>
            {current < steps.length && (
              <>
                {(current === 0 && (
                  <button
                    className="btn_next"
                    onClick={() => continue1()}
                  >
                    Continue
                  </button>
                )) ||
                  (current === 1 && (
                    <button
                      className="btn_next"
                      onClick={() => continue2()}
                    >
                      Continue
                    </button>
                  )) ||
                  (current === 2 && (
                    <button
                      className="btn_next"
                      onClick={() => continue3()}
                    >
                      Continue
                    </button>
                  )) ||
                  (current === 3 && (
                    <form onSubmit={handleFormSubmit}>
                      <button
                        className="btn_next"
                        id="pay-button"
                      // onClick={() => place_order()}
                      >
                        Place Your Order &nbsp;&nbsp;
                        {(sub_total + shipping_price).toLocaleString("en", {
                          style: "currency",
                          currency: "USD",
                        })}

                      </button>
                    </form>
                    // <PayPalScriptProvider
                    //   options={{
                    //     "client-id":
                    //       "AXSCcOwHPRg0gF2bPA3Zh5INamByFKqPIiWhovn9HI53OktFuuGSE8iigge2jUmJ12tIzR3qU-uA9ed2",
                    //     // 'disable-funding': 'card',
                    //   }}
                    // >
                    //   <PayPalButtons
                    //     style={{ layout: "vertical" }}
                    //     createOrder={createOrder}
                    //     onApprove={onApprove}
                    //   />
                    // </PayPalScriptProvider>
                  ))}
              </>
              // <button
              //   className="btn_next"
              //   onClick={
              //     (current === 0 && (() => continue1())) ||
              //     (current === 1 && (() => continue2())) ||
              //     (current === 2 && (() => continue3())) ||
              //     (current === 3 && (() => place_order()))
              //   }
              // >
              //   {current === 3 ? "Place Your Order" : "Continue"}
              // </button>
            )}
          </Col>
        </Row>
      </Col>
      <Col md={24} lg={10} className="step-right">
        <Row align="middle">
          <Text style={{ fontSize: "18px" }}>
            {/* order summary <Text>{getcart_list.length} items</Text> */}
            {
              getcart_list.length > 1 && (
                <Text>order summary ({getcart_list.length} items): </Text>
              )
            }
            {
              getcart_list.length === 1 && (
                <Text>order summary ({getcart_list.length} item): </Text>
              )
            }
          </Text>
        </Row>
        {getcart_list.map((item) => (
          <Row className="mt-5" align="middle" gutter={[16, 16]}>
            <Col xxl={6} xl={10} lg={12} md={6} sm={8} xs={10}>
              <img
                alt="right_img"
                src={`${item.product.main_image}`}
                className="img-responsive"
              />
            </Col>
            <Col xxl={18} xl={14} lg={12} md={18} sm={16} xs={14}>
              <Row className="mt-3">
                <Text className="font-title">{item.product.name}</Text>
              </Row>
              <Row className="mt-3">
                <Text className="font-label">
                  {item.product.description}
                </Text>
              </Row>
              <Divider className="m-2" />
              <Row>
                <Text>
                  Qtv <Text strong>{item.quantity}</Text>
                </Text>
              </Row>
              <Divider className="m-2" />
              <Row>
                <Text>
                  Price <Text strong>${item.product.price}</Text>
                </Text>
              </Row>
            </Col>
          </Row>
        ))}

        {/* <Row className="mt-5" align="middle" gutter={[16, 16]}>
                <Col xxl={6} xl={10} lg={12} md={6} sm={8} xs={10}>
                  <img
                    alt="right_img"
                    src="right_img.svg"
                    className="img-responsive"
                  />
                </Col>
                <Col xxl={18} xl={14} lg={12} md={18} sm={16} xs={14}>
                  <Row className="mt-3">
                    <Text className="font-title">alexander the great</Text>
                  </Row>
                  <Row className="mt-3">
                    <Text className="font-label">
                      Italian Arabescato Marble Sculpture Handcrafted in Egypt
                    </Text>
                  </Row>
                  <Divider className="m-2" />
                  <Row>
                    <Text>
                      Qtv <Text strong>4</Text>
                    </Text>
                  </Row>
                  <Divider className="m-2" />
                  <Row>
                    <Text>
                      Price <Text strong>$123</Text>
                    </Text>
                  </Row>
                </Col>
              </Row> */}

        <Row className="mt-3" hidden={current === 2 ? false : true}>
          <Col span={24}>
            <Row>
              <Text>Have a voucher code</Text>
            </Row>
            <Row className="mt-1">
              <Input
                placeholder="Enter voucher code"
                style={inputStyle}
                suffix={
                  <Button
                    variant="primary"
                    style={{ borderRadius: "1px" }}
                  >
                    Apply
                  </Button>
                }
              />
            </Row>
          </Col>
        </Row>
        <Row className="mt-5">
          <Col span={18}>
            {/* <Text>Subtotal ({getcart_list.length}items): </Text> */}
            {
              getcart_list.length > 1 && (
                <Text>Subtotal ({getcart_list.length} items): </Text>
              )
            }
            {
              getcart_list.length === 1 && (
                <Text>Subtotal ({getcart_list.length} item): </Text>
              )
            }
          </Col>
          <Col span={6} style={{ textAlign: "end" }}>
            <Text className="font-title">$ {sub_total}</Text>
          </Col>
        </Row>
        <Divider />
        <Row className="mt-3">
          <Col span={18}>
            <Text>Shipping </Text>
          </Col>
          <Col span={6} style={{ textAlign: "end" }}>
            <Text className="font-title">$ {shipping_price}</Text>
          </Col>
        </Row>
        <Divider />
        <Row className="mt-3">
          <Col span={18}>
            <Text>Order total </Text>
          </Col>
          <Col span={6} style={{ textAlign: "end" }}>
            <Text className="font-title">
              $ {sub_total + shipping_price}
            </Text>
          </Col>
        </Row>
      </Col>
    </Row >
        </div >
      </Row >
    </>
  );
}


// export async function getServerSideProps({ query, req }) {
//   const baseUrl = `http://${req.headers.host}`;

//   const response = await fetch(`${baseUrl}/api/orders/${query.order}`);
//   const order = response.ok ? await response.json() : null;

//   return {
//     props: {
//       order
//     }
//   };
// }

export default ProductStep;
