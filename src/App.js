import './App.css'
import { DataStore } from '@aws-amplify/datastore'
import { Course } from './models'
import { useEffect, useState } from 'react'

function App () {
  const [courses, setCourses] = useState([])

  useEffect(() => {
    const pullData = async () => {
      try {
        const models = await DataStore.query(Course)
        setCourses(models)
        console.log(models)
      } catch (err) {
        console.log(err)
      }
    }

    pullData()
  }, [])

  const addCourse = async () => {
    try {
      const course = await DataStore.save(
        new Course({
          title: window.prompt(),
          description: window.prompt()
        })
      )
      console.log(course)
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className='App'>
      <h1>Video Courses</h1>
      {courses.map(course => (
        <div key={course.id}>
          <h2>{course.title}</h2>
          <p>{course.description}</p>
        </div>
      ))}
      <button onClick={addCourse}>Add Course</button>
    </div>
  )
}

export default App
