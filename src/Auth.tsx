import { useState } from 'react'
import { supabase } from './supabase'

function Auth() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLogin, setIsLogin] = useState(true)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    if (isLogin) {
      const { error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) alert('Error: ' + error.message)
      else alert('Login successfull! ✅')
    } else {
      const { error } = await supabase.auth.signUp({ email, password })
      if (error) alert('Error: ' + error.message)
      else alert('Registration successfull! ✅')
    }
    setLoading(false)
  }

  const handleGitHubLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'github',
      options: {
        redirectTo: 'http://localhost:5173'
      }
    })
    if (error) alert('Error: ' + error.message)
  }

  const handleGoogleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: 'http://localhost:5173' }
    })
    if (error) alert('Error: ' + error.message)
  }

  return (
    <div>
      <h1>{isLogin ? 'Login' : 'Register'}</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Loading...' : isLogin ? 'Login' : 'Register'}
        </button>
      </form>

      <button onClick={handleGitHubLogin}>
        Login with GitHub
      </button>

      <button onClick={handleGoogleLogin}>
        Login with Google 🔵
      </button>
      
      <button onClick={() => setIsLogin(!isLogin)}>
        {isLogin ? 'Dont have an account? Register now' : 'Have Account? Login now'}
      </button>
    </div>
  )
}

export default Auth