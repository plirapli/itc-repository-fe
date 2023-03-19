import { lazy } from 'react';

const Overview = lazy(() => import('./OverviewPage'))
const Article = lazy(() => import('./ArticlePage'))
const Discussions = lazy(() => import('./DiscussionPage'))
const AddDiscussion = lazy(() => import('./AddDiscussionPage'))
const Comments = lazy(() => import('./CommentPage'))

export { Overview, Article, Discussions, AddDiscussion, Comments };
