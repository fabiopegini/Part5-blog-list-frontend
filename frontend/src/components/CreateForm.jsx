import { useState } from 'react'
import blogService from '../services/blogs'

const CreateForm = ({ setSuccessMessage, setErrorMessage, blogs, setBlogs }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [isHidden, setIsHidden] = useState(false)

  const handleCreate = async (event) => {
    event.preventDefault()

    try {
      const createdBlog = await blogService.create({ title, author, url })
      setSuccessMessage(`Blog successfully added: ${title} by ${author}`)
      setTimeout(() => setSuccessMessage(''), 5000)
      setTitle('')
      setAuthor('')
      setUrl('')

      setBlogs([createdBlog, ...blogs])
    } catch(err) {
      setErrorMessage(err.response.data.error)
      setTimeout(() => setErrorMessage(''), 5000)
    }
  }

  return (
    isHidden
      ? <button type="button" className="button" onClick={() => setIsHidden(false)}>Show Blog Form</button>
      : <form onSubmit={handleCreate}>
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
        <button type="button" onClick={() => setIsHidden(true)}>Hide Blog Form</button>
      </form>
  )
}

export default CreateForm