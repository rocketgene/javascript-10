import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

//import components
import Header from './components/Header';
import Courses from './components/Courses';
import CreateCourse from './components/CreateCourse';
import UpdateCourse from './components/UpdateCourse';
import CourseDetail from './components/CourseDetail';
import UserSignIn from './components/UserSignIn';
import UserSignUp from './components/UserSignUp';
import UserSignOut from './components/UserSignOut';
import NotFound from './components/NotFound';
import {withContext} from './Context';
import PrivateRoute from './PrivateRoute';
import Forbidden from './components/Forbidden';
import UnhandledError from './components/UnhandledError';

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
          <Route path="/notfound" component={NotFound} />
          <Route component={NotFound} />
        </Switch>
    </Router>
  )
};