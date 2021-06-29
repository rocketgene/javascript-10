import React from 'react';
import { Link } from 'react-router-dom';

const CourseBlock = props => {

    return (
        <Link className="course--module course--link" to={`/courses/${props.id}`}>
            <h2 className="course--label">Course</h2>
            <h3 className="course--title">{props.title}</h3>
        </Link>
    )
};

export default CourseBlock;
