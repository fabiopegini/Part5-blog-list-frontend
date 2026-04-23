import { useState } from "react"
import blogService from '../services/blogs'

const CreateForm = ({ setErrorMessage, setBlogs }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleCreate = async (event) => {
    event.preventDefault()

    try {
      await blogService.create({ title, author, url })

      setTitle('')
      setAuthor('')
      setUrl('')

      const blogs = await blogService.getAll()
      setBlogs(blogs)
    } catch(err) { 
      setErrorMessage(err.response.data.error)
      setTimeout(() => setErrorMessage(''), 5000)
    }
  }

  return (
    <form onSubmit={handleCreate}>
      <h2>Create New Blog</h2>
      <label>
        Title: 
        <input type="text" value={title} onChange={e => setTitle(e.target.value)}/>
      </label>
      <label>
        Author: 
        <input type="text" value={author} onChange={e => setAuthor(e.target.value)}/>
      </label>
      <label>
        URL: 
        <input type="text" value={url} onChange={e => setUrl(e.target.value)}/>
      </label>
      <button type='submit'>Create</button>
    </form>
  )
}

export default CreateForm