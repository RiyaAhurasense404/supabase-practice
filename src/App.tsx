import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { supabase } from './supabase'
import Auth from './Auth'
import ContactForm from './ContactForm'

function App() {
  const [session, setSession] = useState<any>(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    setSession(null)
  }

  return (
    <BrowserRouter>
      {/* Navigation */}
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

      {/* Routes */}
      <Routes>
        <Route path="/" element={<ContactForm />} />
        <Route path="/auth" element={<Auth />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
