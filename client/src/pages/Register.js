import { useState }   from 'react';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  // ── local component state ──
  const [email,       setEmail]    = useState('');
  const [password,    setPassword] = useState('');
  const [confirm,     setConfirm]  = useState('');
  const [error,       setError]    = useState(null);

  const navigate = useNavigate();

  // ── submit handler ──
  const handleSubmit = async (e) => {
    e.preventDefault();

    // simple client-side validation
    if (password !== confirm) {
      setError('Passwords do not match');
      return;
    }

    try {
      const res = await fetch('/auth/register', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        const { error } = await res.json();
        throw new Error(error || 'Registration failed');
      }

      // on success, redirect to login
      navigate('/login');
    } catch (err) {
      console.error(err);
      setError(err.message);
    }
  };

  // ── JSX ──
  return (
    <div style={{ maxWidth: 400, margin: '2rem auto' }}>
      <h1>Register</h1>

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
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <br /><br />

        <label>
          Confirm Password<br />
          <input
            type="password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            required
          />
        </label>
        <br /><br />

        <button type="submit">Register</button>
      </form>
    </div>
  );
}
