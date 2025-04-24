import {useState} from 'react';

export default function Login() {
  const [email, setEmail]   = useState('');
  const [password, setPass] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    console.log({email, password}); // temporary
  };

  return (
    <div style={{maxWidth: 400, margin: '2rem auto'}}>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <label>Email<br/>
          <input type="email" value={email} onChange={e=>setEmail(e.target.value)} required/>
        </label><br/><br/>
        <label>Password<br/>
          <input type="password" value={password} onChange={e=>setPass(e.target.value)} required/>
        </label><br/><br/>
        <button type="submit">Log In</button>
      </form>
    </div>
  );
}
