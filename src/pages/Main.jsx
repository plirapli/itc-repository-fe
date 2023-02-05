import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { getLocalAccessToken } from '../Utils/auth';
import jwt from 'jwt-decode';

// Components
import {
  Layout,
  LayoutLogin,
  LayoutManageMateri,
  LayoutMateri,
} from './layout/index';
import { Home } from './index';
import { OverviewPage, Diskusi, Komentar } from './course/index';
import { ForgotPassword, Login, Register } from './login/index';
import {
  ListArtikelPage,
  ListBabPage,
  ListMateri,
  AddMateri,
} from './manageMateri';
import AddDiskusiPage from './course/AddDiskusiPage';
import { getDivisi } from '../Utils/getData';

const Main = () => {
  const [token, setToken] = useState('');
  const [msg, setMsg] = useState('');
  const [divisi, setDivisi] = useState([]);
  const [userData, setUserData] = useState({});

  const errorHandler = (errMsg) => setMsg(() => errMsg);
  const setTokenHandler = (token) => setToken(() => token);

  useEffect(() => {
    getDivisi()
      .then((data) => setDivisi(data))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    const accessToken = getLocalAccessToken() || token;
    accessToken && setUserData(() => jwt(getLocalAccessToken()));
  }, [token]);

  return (
    <div className='min-h-screen bg-gray-light'>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route
            index
            element={
              <Home
                userData={userData}
                divisi={divisi}
                errorHandler={errorHandler}
              />
            }
          />
          <Route
            path='home/'
            element={
              <Home
                userData={userData}
                divisi={divisi}
                errorHandler={errorHandler}
              />
            }
          />

          {/* Manage Materi - Admin Only */}
          <Route
            path='materi/'
            element={<LayoutManageMateri userData={userData} />}
          >
            <Route index element={<ListMateri />} />
            <Route exact path='add/' element={<AddMateri />} />
            <Route exact path=':id_materi/' element={<ListBabPage />} />
            <Route
              exact
              path=':id_materi/:id_bab'
              element={<ListArtikelPage />}
            />
          </Route>

          {/* Course */}
          <Route path='course/:id_materi/' element={<LayoutMateri />}>
            <Route index element={<OverviewPage />} />
            <Route exact path='diskusi/' element={<Diskusi />} />
            <Route exact path='diskusi/add/' element={<AddDiskusiPage />} />
            <Route exact path='diskusi/:id_diskusi/' element={<Komentar />} />
          </Route>
        </Route>

        {/* Login, Register Page */}
        <Route element={<LayoutLogin />}>
          <Route
            path='login/'
            element={
              <Login
                token={setTokenHandler}
                msg={msg}
                errorHandler={errorHandler}
              />
            }
          />
          <Route
            path='forgot-password/'
            element={<ForgotPassword msg={msg} errorHandler={errorHandler} />}
          />
          <Route
            path='register/'
            element={
              <Register msg={msg} divisi={divisi} errorHandler={errorHandler} />
            }
          />
        </Route>
      </Routes>
    </div>
  );
};

export default Main;
