import { useState } from 'react'
import { DataStore } from '@aws-amplify/datastore'
import { Storage } from 'aws-amplify'
import { Video } from './models'

export default function VideoForm (props) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [order, setOrder] = useState(0)
  const [videoFile, setVideoFile] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    const video = await DataStore.save(
      new Video({
        title,
        description,
        order,
        courseID: props.courseId
      })
    )
    await Storage.put(video.id, videoFile)
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type='text' onChange={e => setTitle(e.target.value)} />
      <input type='text' onChange={e => setDescription(e.target.value)} />
      <input type='number' onChange={e => setOrder(parseInt(e.target.value))} />
      <input
        type='file'
        accept='.mov,.mp4'
        onChange={e => setVideoFile(e.target.files[0])}
      />
      <input type='submit' value='create video' />
    </form>
  )
}
