import React, {useState, useEffect, useContext} from 'react';
import { Link, useHistory, Redirect } from 'react-router-dom';
import Data from '../Data';
import Context from '../Context'
import ErrorsDisplay from './errors-display';

export default function UpdateCourse({match}) {

    //states
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [userId, setUserId] = useState(null);
    const [materialsNeeded, setMaterialsNeeded] = useState("");
    const [estimatedTime, setEstimatedTime] = useState("");
    const [course, setCourse] = useState([]);
    const [errors, setErrors] = useState([]);
    const [forbiddenRoute, setForbiddenRoute] = useState(null)

    const data = new Data();
    const history = useHistory();
    const that = useContext(Context.Context)
    
    //fetch course data
    useEffect( () => {
        async function fetchData () {
            try {
                const courseData = await data.getCourse(`/${match.params.id}`);
                if (courseData) {
                    setCourse(courseData);
                    setUserId(courseData.user.id)
        
                    //set initial states based on fetched course data
                    setTitle(course.title);
                    setDescription(course.description);
                    setMaterialsNeeded(course.materialsNeeded);
                    setEstimatedTime(course.estimatedTime);

                    setForbiddenRoute(<Redirect to="/forbidden" />)
                } else {
                    history.push('notfound')
                }
            } catch (error) {
                history.push('/error')
            }
        }
        fetchData();
    }, [match.params.id, course.title, course.description, course.materialsNeeded, course.estimatedTime, history]);

    //set state for each input
    const change = (event) => {
        const value = event.target.value;
        switch (event.target.name) {
            case 'courseTitle':
                setTitle(value);
                break;
            case 'courseDescription':
                setDescription(value);
                break;
            case 'materialsNeeded':
                setMaterialsNeeded(value);
                break;
            case 'estimatedTime':
                setEstimatedTime(value);
                break;
            default:
                return;
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        submit();
    }

    const submit = async () => {
        // set obj for req body
        const courseDetails = {
            "title": title,
            "description": description,
            "userId": userId,
            "materialsNeeded": materialsNeeded,
            "estimatedTime": estimatedTime,
        }

        try {
            const response = await data.updateCourse(`/${match.params.id}`, courseDetails, JSON.stringify(that.userCredentials) );
            if (response === true) {
                history.push(`/courses/${match.params.id}`)
            } else {
                setErrors(response)
            }
        } catch (error) {
            history.push('/error')
        }
    }

    return (
        <div className="wrap">
        {
            //check if logged in user is the course owner
            userId === that.authenticatedUser.id
            ? 
            <>
                <h2>Update Course</h2>
                <ErrorsDisplay errors={errors}/>
                
                <form onSubmit={handleSubmit}>
                    <div className="main--flex">
                        <div>
                            <label htmlFor="courseTitle">Course Title</label>
                            <input id="courseTitle" name="courseTitle" type="text" defaultValue={course.title} onChange={(e) => setTitle(e.target.value)} />
                                {
                                    course.user 
                                    ? <p>By {course.user.firstName} {course.user.lastName}</p>
                                    : null
                                }
                            <label htmlFor="courseDescription">Course Description</label>
                            <textarea id="courseDescription" name="courseDescription" defaultValue={course.description} onChange={change} /> 
                        </div>
                        <div>
                            <label htmlFor="estimatedTime">Estimated Time</label>
                            <input id="estimatedTime" name="estimatedTime" type="text" defaultValue={course.estimatedTime} onChange={change} />

                            <label htmlFor="materialsNeeded">Materials Needed</label>
                            {
                                course.materialsNeeded
                                ? <textarea id="materialsNeeded" name="materialsNeeded" defaultValue={course.materialsNeeded} onChange={change} />
                                : <textarea id="materialsNeeded" name="materialsNeeded" placeholder="Please start each line with an asterisk (*) followed by a space to style as bullet list" onChange={change} />
                            }
                        </div>
                    </div>
                    <button className="button" type="submit">Update Course</button>
                    <Link to={`/courses/${match.params.id}`} className="button button-secondary">Cancel</Link>
                </form>
            </>
            : forbiddenRoute
        }
            
        </div>
        
    )
};
