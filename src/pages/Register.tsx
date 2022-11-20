import React, {FormEvent, useState} from 'react';
import {checkIsLoginAlreadyExist, registerUser} from "store/reducers/auth/thunks/thunks";
import {useAppDispatch} from "hooks/useAppDispatch";
import {Button, Form, Toast, ToastContainer} from "react-bootstrap";
import {NavLink, useNavigate} from "react-router-dom";
import {Title} from "components";
import {useAppSelector} from "hooks/useAppSelector";
import {selectAuthError} from "store/selectors";
import {setError} from "store/reducers/auth/authReducer";

export const Register = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const authError = useAppSelector(selectAuthError);

  const [validated, setValidated] = useState(false);
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.checkValidity()) {
      event.preventDefault();
      event.stopPropagation();
    }
    else {
      dispatch(registerUser({login, password, email}))
      navigate('/login');
    }

    setValidated(true);
  }

  const handleCloseToast = () => {
    dispatch(setError(''));
    refreshForm();
  }

  const refreshForm = () => {
    setLogin('');
    setPassword('');

    setValidated(false);
  }

  const handleBlurLoginField = () => {
    if (login.trim()) {
      dispatch(checkIsLoginAlreadyExist(login));
    }
  }

  return (
    <div className={'d-flex flex-column justify-content-center align-items-center vh-100'}>
      <Title title={'Register page'} />

      <Form noValidate validated={validated} onSubmit={handleSubmit}>

        <Form.Group className="mb-3">
          <Form.Label>Login</Form.Label>
          <Form.Control
            type="text"
            placeholder="Login"
            required
            value={login}
            onChange={e => setLogin(e.target.value)}
            onBlur={handleBlurLoginField}
          />
          <Form.Control.Feedback type="invalid">
            Please provide a valid login.
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Email"
            required
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <Form.Control.Feedback type="invalid">
            Please provide a valid email.
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            required
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <Form.Control.Feedback type="invalid">
            Please provide a valid password.
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group
          className="mb-3 d-flex justify-content-between align-items-center"
          controlId="formBasicPassword">
          <Button variant="primary" type="submit">
            Register
          </Button>
          <NavLink to={'/login'}>Sign In</NavLink>
        </Form.Group>

      </Form>

      {authError && (
        <ToastContainer position={'top-end'}>
          <Toast
            onClose={handleCloseToast}
            className="d-inline-block m-1"
            bg={'danger'}
          >
            <Toast.Header className={'d-flex justify-content-end'} />
            <Toast.Body className={'bg-danger text-white'}>
              {authError}
            </Toast.Body>
          </Toast>
        </ToastContainer>
      )}

    </div>
  );
};