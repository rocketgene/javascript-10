import React, { useEffect, useState } from 'react';
import CourseBlock from './CourseBlock';
import { Link } from 'react-router-dom';
import Data from '../Data';

const Courses = (props) => {

    const [courses, setCourses] = useState([]);
    const {context} = props;
    const data = new Data();

    useEffect( () => {
        async function fetchData () {
            try {
                const courseData = await data.getCourses();
                setCourses(courseData);
            } catch (error) {
                props.history.push('/error')
            }
        }
        fetchData();
    }, [props.history]);

    //loop over courses to create html divs
    let courseBlocks = [];
    if (courses.length > 0) {
        for (let course of courses) {
            courseBlocks.push(<CourseBlock title={course.title} id={course.id} context={context} key={course.id}/>)
        }
    }

    return (
        <div className="wrap main--grid">
            {courseBlocks}
            <Link className="course--module course--add--module" to={'/courses/create'}>
                <span className="course--add--title">
                    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                    viewBox="0 0 13 13" className="add"><polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 "></polygon></svg>
                    New Course
                </span>
            </Link>
        </div>
    )
};

export default Courses