import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import LoginForm from './components/LoginForm'
import ShowMsg from './components/ShowMsg'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  return (
  <>
    {!user && <LoginForm  setUser={setUser} setErrorMessage={setErrorMessage}/>}
    {!user && errorMessage && <ShowMsg msg={errorMessage} type={'error'}/>}

    {user && <div>
      <h1>Blogs</h1>
      <h3>{`${user.name} logged in`}</h3>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>}
  </>
 )
}

export default App