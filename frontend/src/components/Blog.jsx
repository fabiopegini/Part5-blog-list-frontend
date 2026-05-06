import { useState } from "react"
import blogService from '../services/blogs'

const Blog = ({ blog, blogs, setBlogs }) => {
  const [isExtended, setIsExtended] = useState(false)

  const addLike = () => {
    const blogToUpdate = { likes: ++blog.likes, ...blog }
    blogService.update(blog.id, blogToUpdate).then(result => {
      const newBlogs = blogs.map(blog => blog.id !== result.id ? blog : result)
      setBlogs(newBlogs)
    })
  }

  return (
    <div className="blog">
      <div>
        {blog.title} - {blog.author} 
        <button type="button" onClick={() => setIsExtended(!isExtended)}>{isExtended ? 'Hide' : 'View'}</button>
      </div>
      {isExtended && <div>
        <div>{blog.url}</div>
        <div>Likes: {blog.likes} <button type="button" onClick={addLike}>Like</button></div>
        <div>{blog.user.name}</div>
      </div>}
    </div>
  )
}

export default Blog