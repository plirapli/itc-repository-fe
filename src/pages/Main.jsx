import { lazy, Suspense, useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { getLocalRefreshToken } from '../utils/auth';
import { getAllDivisions } from '../utils/division';
import { getUserOwnProfile } from '../utils/user';
import { useProfile } from '../hooks';

// Components
import * as Layout from './layout';
import * as AuthPage from './auth';
import * as CoursePage from './course';
import * as ManageCoursePage from './manageCourse';

const HomePage = lazy(() => import('./Home'));
const ManageUsersPage = lazy(() => import('./manageUser/ManageUsersPage'));
const ProfilePage = lazy(() => import('./user/ProfilePage'));
const NotFound = lazy(() => import('./error/NotFound'));

const Main = () => {
  const { profile, setProfile } = useProfile();
  const [divisions, setDivisions] = useState([]);
  const [isInitializing, setIsInitializing] = useState(true);

  useEffect(() => {
    // Get divisi
    getAllDivisions()
      .then(setDivisions)
      .catch(({ data }) => console.log(data.message));

    // Check if login exist
    if (getLocalRefreshToken()) {
      getUserOwnProfile()
        .then(setProfile)
        .finally(() => setIsInitializing(false));
    } else {
      setIsInitializing(false);
    }
  }, []);

  if (!isInitializing) {
    return (
      <Suspense fallback={<div>Loading...</div>}>
        <div className='min-h-screen bg-gray-light'>
          <Routes>
            {!profile?.id ? (
              // Kalo belum login, masuk ke auth page
              <Route element={<Layout.Auth />}>
                <Route path='/*' element={<AuthPage.Login />} />
                <Route
                  path='forgot-password/'
                  element={<AuthPage.ForgotPassword />}
                />
                <Route path='forgot-password/otp' element={<AuthPage.Otp />} />
                <Route
                  path='register/'
                  element={<AuthPage.Register divisi={divisions} />}
                />
              </Route>
            ) : (
              <Route element={<Layout.Main />}>
                {/* User */}
                <Route element={<Layout.LayoutNavbar />}>
                  <Route path='/' element={<HomePage divisi={divisions} />} />
                  <Route path='u/:username/'>
                    <Route
                      path='profile'
                      element={<ProfilePage divisi={divisions} />}
                    />
                  </Route>
                </Route>

                {/* Manage - Admin Only */}
                {profile?.id_role === 2 && (
                  <Route path='manage/' element={<Layout.Manage />}>
                    {/* Manage User */}
                    <Route path='user/'>
                      <Route index element={<ManageUsersPage />} />
                    </Route>

                    {/* Manage Materi */}
                    <Route path='course/'>
                      <Route
                        index
                        element={
                          <ManageCoursePage.Courses divisi={divisions} />
                        }
                      />
                      <Route
                        exact
                        path='add/'
                        element={
                          <ManageCoursePage.AddCourse divisi={divisions} />
                        }
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
                      <Route
                        exact
                        path=':id_materi/:id_bab/:id_artikel/edit/'
                        element={<ManageCoursePage.EditArticle />}
                      />
                    </Route>
                  </Route>
                )}

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
                    element={<CoursePage.Discussions />}
                  />
                  <Route
                    exact
                    path='discussion/add/'
                    element={<CoursePage.AddDiscussion />}
                  />
                  <Route
                    exact
                    path='discussion/:id_discussion/'
                    element={<CoursePage.Comments />}
                  />
                </Route>
              </Route>
            )}

            {/* Not found page */}
            <Route path='not-found' element={<NotFound />} />
            <Route path='*' element={<NotFound />} />
          </Routes>
        </div>
      </Suspense>
    );
  } else {
    return <div>Loading...</div>;
  }
};

export default Main;
