import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { api } from '../api/api';
import { getLocalAccessToken, getLocalRefreshToken } from '../utils/auth';
import { getAllDivisions } from '../utils/division';
import { getAllUsersDetail } from '../utils/user';
import jwt from 'jwt-decode';

// Components
import {
  Layout,
  LayoutLogin,
  LayoutManage,
  LayoutCourse,
  LayoutNavbar,
} from './layout/index';
import { Home } from './';
import {
  OverviewPage,
  ArticlePage,
  DiscussionPage,
  AddDiscussionPage,
  CommentPage,
} from './course';
import { ForgotPassword, Login, Register } from './auth';
import {
  ManageArticlesPage,
  ManageChaptersPage,
  ManageCoursesPage,
  AddCoursePage,
  AddArticlePage,
} from './manageCourse';
import ManageUsersPage from './manageUser/ManageUsersPage';
import { ProfilePage } from './user';

const Main = () => {
  const [token, setToken] = useState(getLocalAccessToken());
  const [divisi, setDivisi] = useState([]);
  const [userData, setUserData] = useState({});
  const [isAuthed, setIsAuthed] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const setTokenHandler = (token) => setToken(() => token);

  useEffect(() => {
    if (token) {
      const { id, division } = jwt(token);
      getAllUsersDetail(id).then(({ data }) => {
        const { fullName, email, username, id_role, photoProfile } = data;
        setUserData({
          fullName,
          email,
          username,
          id_role,
          division,
          photoProfile,
        });
      });
    }
  }, [token]);

  useEffect(() => {
    // Get divisi
    getAllDivisions()
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
                  setIsAuthed={setIsAuthed}
                />
              }
            />

            {/* User */}
            <Route
              path='u/:username/'
              element={<LayoutNavbar userData={userData} />}
            >
              <Route path='profile' element={<ProfilePage />} />
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
                    <ManageUsersPage
                      divisi={divisi}
                      setIsAuthed={setIsAuthed}
                    />
                  }
                />
              </Route>

              {/* Manage Materi */}
              <Route path='course/'>
                <Route index element={<ManageCoursesPage />} />
                <Route
                  exact
                  path='add/'
                  element={<AddCoursePage divisi={divisi} />}
                />
                <Route
                  exact
                  path=':id_materi/'
                  element={<ManageChaptersPage />}
                />
                <Route
                  exact
                  path=':id_materi/:id_bab/'
                  element={<ManageArticlesPage />}
                />
                <Route
                  exact
                  path=':id_materi/:id_bab/add/'
                  element={<AddArticlePage />}
                />
              </Route>
            </Route>

            {/* Course */}
            <Route path='course/:id_course/' element={<LayoutCourse />}>
              <Route index element={<OverviewPage />} />
              <Route
                exact
                path='chapter/:id_chapter/article/:id_article'
                element={<ArticlePage />}
              />
              <Route exact path='discussion/' element={<DiscussionPage />} />
              <Route
                exact
                path='discussion/add/'
                element={<AddDiscussionPage />}
              />
              <Route
                exact
                path='discussion/:id_discussion/'
                element={<CommentPage />}
              />
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
