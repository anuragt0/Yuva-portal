import { useEffect, useState } from 'react';
import {React} from 'react'
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();

    const host = 'http://localhost:5000';
    const [courses, setCourses] = useState([]);
    useEffect(() => {
        fetch(`${host}/api/getcourses`, {
            method: 'GET', 
            headers: {
                'Content-Type': 'application/json',
            },
            })
            .then((response) => response.json())
            .then((dataa) => {
                console.log("Got the courses: ");
                console.log(dataa);
                setCourses(dataa);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    
    }, [])

        const handleClick = ()=>{
            console.log('Clicked');
            navigate('/anything')

            
        }


  return (
    <>
    <div>Home</div>
    <button onClick={handleClick}>go to hell</button>
    </>
  )
}

export default Home