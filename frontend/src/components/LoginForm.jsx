import { useState } from "react"
import loginService from '../services/login'

const LoginForm = ({ setUser, setErrorMessage }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({ username, password })

      setUser(user)
      setUsername('')
      setPassword('')
    } catch(err) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => setErrorMessage(null), 5000)
    }
  }


  return <form onSubmit={handleLogin}>
    <label htmlFor="username">Username:
     <input type="text" name="username" value={username} onChange={(e) => setUsername(e.target.value)} />
    </label>
    <label htmlFor="password">Password: 
      <input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
    </label>
    <button type="submit">Login</button>
  </form>
}

export default LoginForm
