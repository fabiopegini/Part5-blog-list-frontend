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

  useEffect(() => {
    const userFromLocalStorage = window.localStorage.getItem('loggedUser')
    if(userFromLocalStorage) {
      const loggedUser = JSON.parse(userFromLocalStorage)
      setUser(loggedUser)
      }
  }, [])

  const logout = () => {
    window.localStorage.removeItem('loggedUser')
    setUser(null)
  }

  return (
  <>
    {!user && <LoginForm  setUser={setUser} setErrorMessage={setErrorMessage}/>}
    {!user && errorMessage && <ShowMsg msg={errorMessage} type={'error'}/>}

    {user && <div>
      <h1>Blogs</h1>
      <div className='user_info'>
        <div>{`${user.name} logged in`}</div>
        <button type='button' onClick={logout}>Logout</button>
      </div>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>}
  </>
 )
}

export default App