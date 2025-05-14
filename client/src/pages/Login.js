

import { useState }   from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  // ── local component state ──
  const [email,    setEmail] = useState('');
  const [password, setPass]  = useState('');
  const [error,    setError] = useState(null);

  const navigate = useNavigate();

  // ── submit handler ──
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('/api/auth/login', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        const { error } = await res.json();
        throw new Error(error || 'Login failed');
      }

      const { token } = await res.json();

      // persist JWT for future requests
      localStorage.setItem('token', token);

      // navigate to home/dashboard
      navigate('/dashboard');
    } catch (err) {
      console.error(err);
      setError(err.message);
    }
  };

  // ── JSX ──
  return (
    <div style={{ maxWidth: 400, margin: '2rem auto' }}>
      <h1>Login</h1>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <form onSubmit={handleSubmit}>
        <label>
          Email<br />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <br /><br />

        <label>
          Password<br />
          <input
            type="password"
            value={password}
            onChange={(e) => setPass(e.target.value)}
            required
          />
        </label>
        <br /><br />

        <button type="submit">Log In</button>
      </form>
    </div>
  );
}
