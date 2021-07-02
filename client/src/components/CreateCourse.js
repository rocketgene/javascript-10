import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import Data from '../Data';
import ErrorsDisplay from './errors-display';

export default function CreateCourse(props) {

    //states
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [userId, setUserId] = useState(null);
    const [materialsNeeded, setMaterialsNeeded] = useState("");
    const [estimatedTime, setEstimatedTime] = useState("");
    const [errors, setErrors] = useState([]);

    const {context} = props;
    const data = new Data();

    useEffect(() => {
        setUserId(context.authenticatedUser.id)
    }, [context.authenticatedUser.id])

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

    const submit = async () => {

        //obj for req body
        const courseDetails = {
            "title": title,
            "description": description,
            "userId": userId,
            "materialsNeeded": materialsNeeded,
            "estimatedTime": estimatedTime,
        }

        try {
            const response = await data.createCourse(courseDetails, JSON.stringify(context.userCredentials) );
            if (response === true) {
                props.history.push('/');
            } else {
                setErrors(response);
            }
        } catch (error) {
            props.history.push('/error')
        }
    }

    return (
        <main>
            <div className="wrap">
                <h2>Create Course</h2>
                <ErrorsDisplay errors={errors} />
                
                <div className="main--flex">
                    <div>
                        <label htmlFor="courseTitle">Course Title</label>
                        <input id="courseTitle" name="courseTitle" type="text" value={title} onChange={change} />

                        <p>By {context.authenticatedUser.firstName} {context.authenticatedUser.lastName}</p>

                        <label htmlFor="courseDescription">Course Description</label>
                        <textarea id="courseDescription" name="courseDescription" value={description} onChange={change} />
                    </div>
                    <div>
                        <label htmlFor="estimatedTime">Estimated Time</label>
                        <input id="estimatedTime" name="estimatedTime" type="text" value={estimatedTime} onChange={change} />

                        <label htmlFor="materialsNeeded">Materials Needed</label>
                        <textarea id="materialsNeeded" name="materialsNeeded" value={materialsNeeded} onChange={change} />
                    </div>
                </div>
                <button className="button" onClick={submit}>Create Course</button>
                <Link to="/" className="button button-secondary">Cancel</Link>
            </div>
        </main>
    )
};
