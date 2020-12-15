import logo from './logo.svg'
import './App.css'
import { DataStore } from '@aws-amplify/datastore'
import { Storage } from 'aws-amplify'
import { Course, Video } from './models'
import { useEffect, useState } from 'react'
import VideoForm from './VideoForm'

function App () {
  const [courses, setCourses] = useState([])
  const [video, setVideo] = useState()
  const [videoLink, setVideoLink] = useState()

  useEffect(() => {
    const pullData = async () => {
      try {
        console.log('hi')
        const models = await DataStore.query(Course)
        console.log(models)
        setCourses(models)
        const videoQuery = await DataStore.query(Video)
        setVideo(videoQuery[0])
        const videoFile = await Storage.get(videoQuery[videoQuery.length - 1].id)
        setVideoLink(videoFile)
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
          <VideoForm courseId={course.id} />
        </div>
      ))}
      <video src={videoLink} controls />
      <button onClick={addCourse}>Add Course</button>
    </div>
  )
}

export default App
