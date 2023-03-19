import { lazy } from 'react';

const Courses = lazy(() => import('./ManageCoursesPage'))
const Chapters = lazy(() => import('./ManageChaptersPage'))
const Articles = lazy(() => import('./ManageArticlesPage'))
const AddCourse = lazy(() => import('./AddCoursePage'))
const AddArticle = lazy(() => import('./AddArticlePage'))
const EditArticle = lazy(() => import('./EditArticlePage'))

export { Courses, Chapters, Articles, AddCourse, AddArticle, EditArticle };
