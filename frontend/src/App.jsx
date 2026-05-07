import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import LoginForm from './components/LoginForm'
import ShowMsg from './components/ShowMsg'
import CreateForm from './components/CreateForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    ) 
  }, [])

  useEffect(() => {
    const userFromLocalStorage = window.localStorage.getItem('loggedUser')
    if(userFromLocalStorage) {
      const loggedUser = JSON.parse(userFromLocalStorage)
      setUser(loggedUser)
      blogService.setToken(loggedUser.token)
      }
  }, [])

  const logout = () => {
    window.localStorage.removeItem('loggedUser')
    setUser(null)
  }

  const sortedBlogs = blogs.toSorted((a,b) => a.likes < b.likes)

  return (
  <>
    {!user && <LoginForm  setUser={setUser} setErrorMessage={setErrorMessage} setSuccessMessage={setSuccessMessage} />}
    {!user && errorMessage && <ShowMsg msg={errorMessage} type={'error'} />}

    {user && <div>
      <h1>Blogs</h1>
      <div className='user_info'>
        <div>{`${user.name} logged in`}</div>
        <button type='button' onClick={logout}>Logout</button>
      </div>
      {successMessage && <ShowMsg msg={successMessage} type={'success'} />}
      <CreateForm setSuccessMessage={setSuccessMessage} setErrorMessage={setErrorMessage} blogs={sortedBlogs} setBlogs={setBlogs} />
      {errorMessage && <ShowMsg msg={errorMessage} type={'error'} />}
      {sortedBlogs.map(blog =>
        <Blog key={blog.id} blog={blog} blogs={sortedBlogs} setBlogs={setBlogs} user={user}/>
      )}
    </div>}
  </>
 )
}

export default App