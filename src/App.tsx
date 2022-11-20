import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Login, Register } from "pages";
import {useAppSelector} from "hooks/useAppSelector";
import {selectIsUserAuth} from "store/selectors";
import {Main} from "pages/Main";

function App() {
  const isUserAuth = useAppSelector(selectIsUserAuth);

  return (
    <div className={'wrapper min-vh-100'}>
      <Routes>
        <Route path={'/login'} element={<Login />}/>
        <Route path={'/register'} element={<Register />}/>
        <Route path={'/'} element={ isUserAuth ? <Main /> : <Login />}/>
      </Routes>
    </div>
  );
}

export default App;
