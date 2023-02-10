import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { api } from '../api/api';
import { getLocalAccessToken, getLocalRefreshToken } from '../Utils/auth';
import { getDivisi, getUserDetail } from '../Utils/getData';
import jwt from 'jwt-decode';

// Components
import {
  Layout,
  LayoutLogin,
  LayoutManageMateri,
  LayoutMateri,
} from './layout/index';
import { Home } from './';
import { OverviewPage, Diskusi, AddDiskusiPage, Komentar } from './course';
import { ForgotPassword, Login, Register } from './login';
import {
  ListArtikelPage,
  ListBabPage,
  ListMateri,
  AddMateri,
  AddArtikelPage,
} from './manageMateri';
import ListUserPage from './manageUser/ListUserPage';

const Main = () => {
  const [token, setToken] = useState(() => {
    const token = getLocalAccessToken();
    if (token) return token;
    return null;
  });
  const [divisi, setDivisi] = useState([]);
  const [userData, setUserData] = useState({});
  const [isAuthed, setIsAuthed] = useState(() =>
    getLocalAccessToken() ? true : false
  );

  const setTokenHandler = (token) => setToken(() => token);
  useEffect(() => {
    if (token) {
      const { id, id_role, division } = jwt(token);
      getUserDetail(id).then(({ data }) => {
        const { email, fullName, username, photoProfile } = data;
        setUserData({
          id_role,
          email,
          fullName,
          username,
          photoProfile,
          division,
        });
      });
    }
  }, [token]);

  useEffect(() => {
    // Get divisi
    getDivisi()
      .then(setDivisi)
      .catch((err) => console.log(err));

    // Check is login exist
    api
      .post('/user/refresh-token', getLocalRefreshToken())
      .then(({ data }) => {
        const { accessToken } = data.data;
        setToken(accessToken);
        setIsAuthed(true);
      })
      .catch(() => setIsAuthed(false));
  }, []);

  if (isAuthed === false)
    return (
      <div className='min-h-screen bg-gray-light'>
        <Routes>
          {/* Login, Register Page */}
          <Route element={<LayoutLogin />}>
            <Route
              path='/*'
              element={
                <Login token={setTokenHandler} setIsAuthed={setIsAuthed} />
              }
            />
            <Route path='forgot-password/' element={<ForgotPassword />} />
            <Route path='register/' element={<Register divisi={divisi} />} />
          </Route>
        </Routes>
      </div>
    );

  return (
    <div className='min-h-screen bg-gray-light'>
      <Routes>
        <Route element={<Layout />}>
          <Route
            path='/*'
            element={
              <Home
                userData={userData}
                divisi={divisi}
                isAuthed
                setIsAuthed={setIsAuthed}
              />
            }
          />

          {/* Manage Materi - Admin Only */}
          <Route
            path='materi/'
            element={
              <LayoutManageMateri
                userData={userData}
                divisi={divisi}
                setIsAuthed={setIsAuthed}
              />
            }
          >
            <Route index element={<ListMateri />} />
            <Route exact path='add/' element={<AddMateri />} />
            <Route exact path=':id_materi/' element={<ListBabPage />} />
            <Route
              exact
              path=':id_materi/:id_bab/'
              element={<ListArtikelPage />}
            />
            <Route
              exact
              path=':id_materi/:id_bab/add/'
              element={<AddArtikelPage />}
            />
          </Route>

          {/* Manage User - Admin Only */}
          <Route
            path='manage/user/'
            element={
              <LayoutManageMateri
                userData={userData}
                divisi={divisi}
                setIsAuthed={setIsAuthed}
              />
            }
          >
            <Route index element={<ListUserPage divisi={divisi} />} />
          </Route>

          {/* Course */}
          <Route path='course/:id_materi/' element={<LayoutMateri />}>
            <Route index element={<OverviewPage />} />
            <Route exact path='diskusi/' element={<Diskusi />} />
            <Route exact path='diskusi/add/' element={<AddDiskusiPage />} />
            <Route exact path='diskusi/:id_diskusi/' element={<Komentar />} />
          </Route>
        </Route>
      </Routes>
    </div>
  );
};

export default Main;
