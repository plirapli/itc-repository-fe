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
  LayoutManage,
  LayoutManageMateri,
  LayoutMateri,
  LayoutNavbar,
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
import ArticlePage from './course/ArticlePage';
import { Profile } from './user';

const Main = () => {
  const [token, setToken] = useState(getLocalAccessToken());
  const [divisi, setDivisi] = useState([]);
  const [userData, setUserData] = useState({});
  const [isAuthed, setIsAuthed] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

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
        setIsLoading(false);
      })
      .catch(() => {
        setIsAuthed(false);
        setIsLoading(false);
      });
  }, []);

  if (!isLoading) {
    if (!isAuthed)
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

            {/* User */}
            <Route
              path='u/:username/'
              element={<LayoutNavbar userData={userData} />}
            >
              <Route path='profile' element={<Profile />} />
            </Route>

            {/* Manage - Admin Only */}
            <Route
              path='manage/'
              element={
                <LayoutManage userData={userData} setIsAuthed={setIsAuthed} />
              }
            >
              {/* Manage User */}
              <Route path='user/'>
                <Route
                  index
                  element={
                    <ListUserPage divisi={divisi} setIsAuthed={setIsAuthed} />
                  }
                />
              </Route>

              {/* Manage Materi */}
              <Route path='course/'>
                <Route index element={<ListMateri />} />
                <Route
                  exact
                  path='add/'
                  element={<AddMateri divisi={divisi} />}
                />
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
            </Route>

            {/* Course */}
            <Route path='course/:id_materi/' element={<LayoutMateri />}>
              <Route index element={<OverviewPage />} />
              <Route
                exact
                path='chapter/:id_chapter/article/:id_article'
                element={<ArticlePage />}
              />
              <Route exact path='diskusi/' element={<Diskusi />} />
              <Route exact path='diskusi/add/' element={<AddDiskusiPage />} />
              <Route exact path='diskusi/:id_diskusi/' element={<Komentar />} />
            </Route>
          </Route>
        </Routes>
      </div>
    );
  } else {
    return <div>Loading...</div>;
  }
};

export default Main;
