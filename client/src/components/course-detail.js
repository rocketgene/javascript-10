import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import ReactMarkdown from 'react-markdown'

import Data from '../Data';
import NotFound from './not-found'

export default function CourseDetail(props) {

    //states
    const [course, setCourse] = useState([]);
    const [dataLoaded, setDataLoaded] = useState(false);
    const [courseNotFound, setCourseNotFound] = useState(false)

    //importing variables
    const {context} = props;
    const history = useHistory();
    const data = new Data();

    //fetch course data
    useEffect( () => {
        async function fetchData () {
            try {
                const courseData = await data.getCourse(`/${props.match}`);
                setCourse(courseData);
                courseData === null ? setCourseNotFound(true) : setDataLoaded(true);
            } catch (error) {
                history.push('/error')
            }
        }
        fetchData();
    }, [props.match, history]);

    const deleteCourse = async () => {
        try {
            const response = await data.deleteCourse(`/${props.match}`, JSON.stringify(context.userCredentials) );
            if (response) {
                history.push('/')
            }
        } catch (error) {
            history.push('/error')
        }
    }
    
    return (
        <>
        {
            dataLoaded === true
            ? 
                <div>
                    <div className="actions--bar">
                        <div className="wrap">
                            {/* only render update/delete buttons if authenticated user is course owner */}
                            {
                                course.user && context.authenticatedUser && course.user.emailAddress === context.authenticatedUser.emailAddress
                                ? 
                                    <>
                                        <Link className="button" to={`/courses/${props.match}/update`}>Update Course</Link> 
                                        <button className="button" onClick={deleteCourse}>Delete Course</button>
                                    </>  
                                : null
                            }
                            <Link className="button button-secondary" to={`/`}>Return to List</Link>
                        </div>
                    </div>
                    
                    <div className="wrap">
                        <h2>Course Detail</h2>
                        <form>
                            <div className="main--flex">
                                <div>
                                    <h3 className="course--detail--title">Course</h3>
                                    <h4 className="course--name">{course.title}</h4>
                                    {
                                        course.user 
                                        ? <p>By {course.user.firstName} {course.user.lastName}</p>
                                        : null
                                    }
                                    <ReactMarkdown>{course.description}</ReactMarkdown>
                                </div>
                                <div>
                                    <h3 className="course--detail--title">Estimated Time</h3>
                                    <p>{course.estimatedTime}</p>

                                    <h3 className="course--detail--title">Materials Needed</h3>
                                    <div className="course--detail--list">
                                        <ReactMarkdown>{course.materialsNeeded}</ReactMarkdown>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            
            : (courseNotFound ? <NotFound /> : null)
        }
        </>
    )
};
