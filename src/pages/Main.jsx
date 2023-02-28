import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { getAccessToken, getLocalAccessToken } from '../utils/auth';
import { getAllDivisions } from '../utils/division';
import { getUserOwnProfile } from '../utils/user';

// Components
import * as Layout from './layout/index';
import { Home } from './';
import * as CoursePage from './course';
import * as AuthPage from './auth';
import * as ManageCoursePage from './manageCourse';
import ManageUsersPage from './manageUser/ManageUsersPage';
import { ProfilePage } from './user';

const Main = () => {
  const [divisions, setDivisions] = useState([]);
  const [userData, setUserData] = useState({});
  const [isAuthed, setIsAuthed] = useState(false);
  const [isInitializing, setIsInitializing] = useState(true);

  useEffect(() => {
    // Get divisi
    getAllDivisions()
      .then(setDivisions)
      .catch(({ data }) => console.log(data.message));

    // Check is login exist
    if (getLocalAccessToken()) {
      getAccessToken()
        .then(() => setIsAuthed(true))
        .finally(() => setIsInitializing(false));
    } else {
      setIsInitializing(false);
    }
  }, []);

  useEffect(() => {
    if (isAuthed) getUserOwnProfile().then(setUserData);
  }, [isAuthed]);

  if (!isInitializing) {
    // Kalo belum login
    if (!isAuthed)
      return (
        <div className='min-hs-screen bg-gray-light'>
          <Routes>
            {/* Login, Register Page */}
            <Route element={<Layout.Auth />}>
              <Route
                path='/*'
                element={<AuthPage.Login setIsAuthed={setIsAuthed} />}
              />
              <Route
                path='forgot-password/'
                element={<AuthPage.ForgotPassword />}
              />
              <Route
                path='register/'
                element={<AuthPage.Register divisi={divisions} />}
              />
            </Route>
          </Routes>
        </div>
      );

    // Kalo dah login
    return (
      <div className='min-h-screen bg-gray-light'>
        <Routes>
          <Route element={<Layout.Main />}>
            {/* User */}
            <Route
              element={
                <Layout.LayoutNavbar
                  userData={userData}
                  setIsAuthed={setIsAuthed}
                />
              }
            >
              <Route
                path='/'
                element={<Home userData={userData} divisi={divisions} />}
              />

              <Route path='u/:username/'>
                <Route
                  path='profile'
                  element={
                    <ProfilePage
                      userData={userData}
                      setUserData={setUserData}
                      divisi={divisions}
                    />
                  }
                />
              </Route>
            </Route>

            {/* Manage - Admin Only */}
            <Route
              path='manage/'
              element={
                <Layout.Manage userData={userData} setIsAuthed={setIsAuthed} />
              }
            >
              {/* Manage User */}
              <Route path='user/'>
                <Route
                  index
                  element={<ManageUsersPage setIsAuthed={setIsAuthed} />}
                />
              </Route>

              {/* Manage Materi */}
              <Route path='course/'>
                <Route
                  index
                  element={<ManageCoursePage.Courses divisi={divisions} />}
                />
                <Route
                  exact
                  path='add/'
                  element={<ManageCoursePage.AddCourse divisi={divisions} />}
                />
                <Route
                  exact
                  path=':id_materi/'
                  element={<ManageCoursePage.Chapters />}
                />
                <Route
                  exact
                  path=':id_materi/:id_bab/'
                  element={<ManageCoursePage.Articles />}
                />
                <Route
                  exact
                  path=':id_materi/:id_bab/add/'
                  element={<ManageCoursePage.AddArticle />}
                />
              </Route>
            </Route>

            {/* Course */}
            <Route path='course/:id_course/' element={<Layout.Course />}>
              <Route index element={<CoursePage.Overview />} />
              <Route
                exact
                path='chapter/:id_chapter/article/:id_article'
                element={<CoursePage.Article />}
              />
              <Route
                exact
                path='discussion/'
                element={<CoursePage.Discussions user={userData} />}
              />
              <Route
                exact
                path='discussion/add/'
                element={<CoursePage.AddDiscussion />}
              />
              <Route
                exact
                path='discussion/:id_discussion/'
                element={<CoursePage.Comments user={userData} />}
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
