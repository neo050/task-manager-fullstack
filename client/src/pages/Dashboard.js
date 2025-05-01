import { useEffect, useState, useCallback } from 'react';

export default function Dashboard() {
  const [title, setTitle] = useState('');
  const [due,   setDue]   = useState('');
  const [tasks, setTasks] = useState([]);
  const token = localStorage.getItem('token');

  const fetchTasks = useCallback(async () => {
    if (!token) return;
    try {
      const res   = await fetch('/tasks', {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error('Failed to load tasks');
      const data  = await res.json();
      setTasks(data);
    } catch (err) {
      console.error(err);
    }
  }, [token]);

  useEffect(() => { fetchTasks(); }, [fetchTasks]);

  const addTask = async (e) => {
    e.preventDefault();
    if (!token) return;
    try {
      const res = await fetch('/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title, dueDate: due }),
      });
      if (!res.ok) throw new Error('Failed to add task');
      setTitle('');
      setDue('');
      fetchTasks();          // רענון הרשימה
    } catch (err) {
      console.error(err);
    }
  };

  /* JSX כרגיל */


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
