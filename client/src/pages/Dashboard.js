// client/src/pages/Dashboard.js
import { useEffect, useState } from 'react';

export default function Dashboard() {
  const [title, setTitle] = useState('');
  const [due, setDue]     = useState('');
  const [tasks, setTasks] = useState([]);

  const token = localStorage.getItem('token');

  const fetchTasks = () =>
    fetch('/tasks', { headers: { Authorization: `Bearer ${token}` } })
      .then(r => r.json()).then(setTasks);

  useEffect(fetchTasks, []);

  const addTask = async (e) => {
    e.preventDefault();
    await fetch('/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ title, dueDate: due }),
    });
    setTitle(''); setDue('');
    fetchTasks();
  };

  return (
    <div style={{maxWidth:600,margin:'2rem auto'}}>
      <h1>Tasks</h1>

      <form onSubmit={addTask}>
        <input value={title} onChange={e=>setTitle(e.target.value)}
               placeholder="Task title" required />
        <input type="date" value={due} onChange={e=>setDue(e.target.value)} />
        <button type="submit">Add</button>
      </form>

      <ul>
        {tasks.map(t => (
          <li key={t.id}>{t.title} • {t.due_date ?? '-'}</li>
        ))}
      </ul>
    </div>
  );
}
