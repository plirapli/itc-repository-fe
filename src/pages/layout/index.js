import { lazy } from 'react';

const Main = lazy(() => import('./Layout'))
const Auth = lazy(() => import('./LayoutAuth'))
const Manage = lazy(() => import('./LayoutManage'))
const Course = lazy(() => import('./LayoutCourse'))
const LayoutNavbar = lazy(() => import('./LayoutNavbar'))

export { Main, Auth, Manage, Course, LayoutNavbar };
