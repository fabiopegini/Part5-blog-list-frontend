import { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, blogs, setBlogs, user }) => {
  const [isExtended, setIsExtended] = useState(false)

  const addLike = () => {
    const blogToUpdate = { likes: ++blog.likes, ...blog }
    blogService.update(blog.id, blogToUpdate).then(result => {
      const newBlogs = blogs.map(blog => blog.id !== result.id ? blog : result)
      setBlogs(newBlogs)
    })
  }

  const removeBlog = () => {
    if(!window.confirm(`Do you want to delete the blog: "${blog.title}" by "${blog.author}"`)) return
    blogService.remove(blog.id).then(() => {
      const newBlogs = blogs.filter(oldBlog => oldBlog.id !== blog.id)
      setBlogs(newBlogs)
    })
  }

  return (
    <div className="blog">
      <div>
        {blog.title} - {blog.author}
        <button type="button" onClick={() => setIsExtended(!isExtended)}>{isExtended ? 'Hide' : 'View'}</button>
      </div>
      {isExtended && <>
        <div>{blog.url}</div>
        <div>Likes: {blog.likes}<button type="button" onClick={addLike}>Like</button></div>
        <div>{blog.user.name}</div>
        {user.username === blog.user.username && <button type="button" onClick={removeBlog}>Remove</button>}
      </>}
    </div>
  )
}

export default Blog