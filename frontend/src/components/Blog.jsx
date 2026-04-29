import { useState } from "react"

const Blog = ({ blog }) => {
  const [isExtended, setIsExtended] = useState(false)

  return (
    <div className="blog">
      <div>
        {blog.title} - {blog.author} 
        <button type="button" onClick={() => setIsExtended(!isExtended)}>{isExtended ? 'Hide' : 'View'}</button>
      </div>
      {isExtended && <div>
        <div>{blog.url}</div>
        <div>Likes: {blog.likes} <button type="button">Like</button></div>
      </div>}
    </div>
  )
}

export default Blog