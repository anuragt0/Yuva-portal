import CourseContext from './CourseContext';

import {React, useState} from 'react'

const CourseState = (props) => {
    const [course, setCourse] = useState(null);
    const [videocontext, setVideoContext] = useState(null);
    const [adminCourse, setAdminCourse] = useState(null);
    // console.log(CourseContext);

  return (


    <CourseContext.Provider value={{course, setCourse, videocontext, setVideoContext, adminCourse, setAdminCourse}}>
            {props.children}
    </CourseContext.Provider>


  )
}

export default CourseState;