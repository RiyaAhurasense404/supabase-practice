import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { supabase } from './supabase'
import Auth from './Auth'
import ContactForm from './ContactForm'
import ForgotPassword from './ForgotPassword'
import ResetPassword from './ResetPassword'

function Nav({ session, handleLogout }: any) {
  const location = useLocation()

  if (location.pathname === '/reset-password') return null
  if (location.pathname === '/forgot-password') return null

  return (
    <nav>
      <Link to="/">Contact Form</Link> |{' '}
      <Link to="/auth">Login / Register</Link>
      {session && (
        <>
          {' '}| <span>{session.user.email}</span>{' '}
          <button onClick={handleLogout}>Logout</button>
        </>
      )}
    </nav>
  )
}

function App() {
  const [session, setSession] = useState<any>(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    supabase.auth.onAuthStateChange((event, session) => {
      setSession(session)
      if (event === 'PASSWORD_RECOVERY') {
        window.location.href = '/reset-password'
      }
    })
  }, [])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    setSession(null)
  }

  return (
    <BrowserRouter>
      <Nav session={session} handleLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<ContactForm />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
