import { useState } from 'react'
import { supabase } from './supabase'

function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!email) {
      alert('Please write email!')
      return
    }

    setLoading(true)

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: 'http://localhost:5173/reset-password'
    })

    if (error) {
      alert('Error: ' + error.message)
    } else {
      alert('Please check your gmail reset link has been sent✅')
    }

    setLoading(false)
  }

  return (
    <div>
      <h1>Forgot Password 🔑</h1>
      <p>Write your email, will send you password reset link!</p>
      <form onSubmit={handleForgotPassword}>
        <div>
          <input
            type="email"
            placeholder="Please write your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Sending...' : 'send reset password link'}
        </button>
      </form>
    </div>
  )
}

export default ForgotPassword