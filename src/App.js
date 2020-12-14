import './App.css'
import { DataStore } from '@aws-amplify/datastore'
import { withAuthenticator } from '@aws-amplify/ui-react'
import { Course } from './models'
import { useEffect } from 'react'

function App () {
  useEffect(() => {
    const pullData = async () => {
      const models = await DataStore.query(Course)
      console.log(models)
    }

    pullData()
  }, [])

  const addCourse = async () => {
    await DataStore.save(
      new Course({
        title: window.prompt(),
        description: window.prompt()
      })
    )
  }

  return (
    <div className='App'>
      <button onClick={addCourse}>Add Course</button>
    </div>
  )
}

export default withAuthenticator(App)
