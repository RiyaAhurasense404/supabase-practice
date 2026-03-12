import { useState, useEffect } from 'react'
import { supabase } from './supabase'
import { useNavigate } from 'react-router-dom'

function ResetPassword() {
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [sessionReady, setSessionReady] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        setSessionReady(true)
      } else {
        alert('Link expire ho gaya! Dobara try karo.')
        navigate('/forgot-password')
      }
    })
  }, [])

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault()

    if (password !== confirmPassword) {
      alert('Passwords match nahi kar rahe! ❌')
      return
    }

    if (password.length < 6) {
      alert('Password kam se kam 6 characters ka hona chahiye!')
      return
    }

    setLoading(true)

    const { error } = await supabase.auth.updateUser({
      password: password
    })

    if (error) {
      alert('Error: ' + error.message)
    } else {
      alert('Password reset ho gaya! ✅')
      await supabase.auth.signOut()
      navigate('/auth')
    }

    setLoading(false)
  }

  if (!sessionReady) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <h1>Reset Password </h1>
      <form onSubmit={handleReset}>
        <div>
          <input
            type="password"
            placeholder="Naya Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="Password Confirm Karo"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Loading...' : 'Reset Password'}
        </button>
      </form>
    </div>
  )
}

export default ResetPassword
