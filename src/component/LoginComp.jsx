import React, { useContext, useState, Fragment } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import qs from "query-string";
import { authContext } from "../store";
import {
  Col,
  Container,
  Row,
  Form,
  Button,
  Card,
  Alert,
} from "react-bootstrap";
import Recaptcha from "react-recaptcha";

const api = "http://localhost:3001";

export default function LoginComp(props) {
  const { dispatch } = useContext(authContext);

  const initialState = {
    isSubmitting: false,
    errorMessage: null,
    isVerified: false,
  };

  const stateForm = {
    email: "",
    password: "",
  };

  const [data, setData] = useState(initialState);
  const [dataForm, setDataForm] = useState(stateForm);

  const callback = () => {
    console.log("Done!!!");
  };

  const verifyCallback = (response) => {
    console.log(response);
    if (response) {
      setData({
        ...data,
        isVerified: true,
      });
    }
  };

  const handleInputChange = (event) => {
    setDataForm({
      ...dataForm,
      [event.target.name]: event.target.value,
    });
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();

    if (data.isVerified) {
      setData({
        ...data,
        isSubmitting: true,
        errorMessage: null,
      });

      const requestBody = {
        email: dataForm.email,
        password: dataForm.password,
      };

      const config = {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      };

      axios
        .post(`${api}/auth/api/v1/login`, qs.stringify(requestBody), config)
        .then((res) => {
          if (res.data.success && res.data.isVerified === 1) {
            dispatch({ type: "LOGIN", payload: res.data });
            props.history.push("/dashboard");
          } else if (res.data.success && res.data.isVerified === 0) {
            setData({
              ...data,
              isSubmitting: false,
              errorMessage: "Your email has not been verified",
            });
          } else {
            setData({
              ...data,
              isSubmitting: false,
              errorMessage: res.data.Message,
            });
          }
        })
        .catch((err) => {
          setData({
            ...data,
            isSubmitting: false,
            errorMessage: err.message,
          });
        });
    } else {
      setData({
        ...data,
        isSubmitting: false,
        errorMessage: "Invalid login",
      });
    }
  };

  return (
    <Fragment>
      <Container>
        <br />
        <Row>
          <Col>
            <Card.Img
              width="100%"
              src="https://placeimg.com/640/480/people"
            ></Card.Img>
          </Col>
          <Col>
            <h1>Login Form</h1>
            <hr />
            <Form onSubmit={handleFormSubmit}>
              <Form.Group className="mb-3" controlId="email">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={dataForm.email}
                  onChange={handleInputChange}
                  placeholder="Enter email"
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  value={dataForm.password}
                  onChange={handleInputChange}
                  placeholder="Password"
                />
              </Form.Group>
              <Recaptcha
                sitekey="6Lf447gbAAAAAHQK-YrkS-a3ivwQ50ASIFC_J6cJ"
                render="explicit"
                verifyCallback={verifyCallback}
                onloadCallback={callback}
              />
              <br />
              {data.errorMessage && (
                <Alert variant="danger">{data.errorMessage}</Alert>
              )}
              <Button
                variant="secondary"
                type="submit"
                disabled={data.isSubmitting}
              >
                {data.isSubmitting ? "...Loading" : "Login"}
              </Button>
            </Form>
            <p className="mt-2">
              Belum punya akun?{" "}
              <Link to="/register" style={{ textDecoration: "none" }}>
                Register
              </Link>
            </p>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
}
