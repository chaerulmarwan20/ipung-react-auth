import React, { useState, Fragment } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import qs from "query-string";
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

export default function RegisterComp(props) {
  const initialState = {
    isSubmitting: false,
    errorMessage: null,
    isVerified: true,
  };

  const stateForm = {
    username: "",
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
        username: dataForm.username,
        email: dataForm.email,
        password: dataForm.password,
      };

      const config = {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      };

      axios
        .post(`${api}/auth/api/v1/register`, qs.stringify(requestBody), config)
        .then((res) => {
          if (res.data.success && !res.data.isRegistered) {
            setData({
              ...data,
              isSubmitting: false,
              errorMessage: "Success. Please check your email.",
            });
            setDataForm({
              ...dataForm,
              username: "",
              email: "",
              password: "",
            });
          } else if (!res.data.success && res.data.isRegistered) {
            setData({
              ...data,
              isSubmitting: false,
              errorMessage: "Ooops!!! Your account has been registered",
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
            <h1>Registrasi Form</h1>
            <hr />
            {data.errorMessage && (
              <Alert variant="success">{data.errorMessage}</Alert>
            )}
            <Form onSubmit={handleFormSubmit}>
              <Form.Group className="mb-3" controlId="username">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  name="username"
                  value={dataForm.username}
                  onChange={handleInputChange}
                  placeholder="Enter username"
                />
              </Form.Group>
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
              <Button
                variant="secondary"
                type="submit"
                disabled={data.isSubmitting}
                className="mt-3"
              >
                {data.isSubmitting ? "...Loading" : "Register"}
              </Button>
            </Form>
            <p className="mt-2">
              Sudah punya akun?{" "}
              <Link to="/login" style={{ textDecoration: "none" }}>
                Login
              </Link>
            </p>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
}
