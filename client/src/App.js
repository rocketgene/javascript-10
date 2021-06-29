import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

//import components
import Header from './components/header';
import Courses from './components/courses';
import CreateCourse from './components/create-course';
import UpdateCourse from './components/update-course';
import CourseDetail from './components/course-detail';
import UserSignIn from './components/user-sign-in';
import UserSignUp from './components/user-sign-up';
import UserSignOut from './components/user-sign-out';
import NotFound from './components/not-found';
import {withContext} from './Context';
import PrivateRoute from './PrivateRoute';
import Forbidden from './components/forbidden';
import UnhandledError from './components/error';

const HeaderWithContext = withContext(Header);
const CoursesWithContext = withContext(Courses);
const UpdateCourseWithContext = withContext(UpdateCourse);
const CourseDetailWithContext = withContext(CourseDetail);
const CreateCourseWithContext = withContext(CreateCourse);

const UserSignUpWithContext = withContext(UserSignUp);
const UserSignInWithContext = withContext(UserSignIn);

export default function App() {
  return (
    <Router>
      <HeaderWithContext />
      <Switch>
          <Route exact path="/" component={CoursesWithContext} />
          <PrivateRoute path="/courses/create" component={CreateCourseWithContext} />
          <PrivateRoute path="/courses/:id/update" component={UpdateCourseWithContext} />
          <Route path="/courses/:id" render={ ({match}) => <CourseDetailWithContext match={match.params.id} />} />
          <Route path="/signin" component={UserSignInWithContext} />
          <Route path="/signup" component={UserSignUpWithContext} />
          <Route path="/signout" component={UserSignOut} />
          <Route path="/error" component={UnhandledError} />
          <Route path="/forbidden" component={Forbidden} />
          <Route component={NotFound} />
        </Switch>
    </Router>
  )
};