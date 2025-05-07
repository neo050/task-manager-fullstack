import { useEffect, useState, useCallback } from 'react';
import { getTasks, createTask } from '../api';

export default function Dashboard() {
  // ── local state ──
  const [title, setTitle]   = useState('');
  const [due,   setDue]     = useState('');
  const [tasks, setTasks]   = useState([]);
  const [loading, setLoad]  = useState(true);
  const [saving,  setSave]  = useState(false);
  const [error,   setError] = useState(null);

  const token = localStorage.getItem('token');

  // ── load tasks once ──
  const fetchTasks = useCallback(async () => {
    if (!token) return;
    try {
      setLoad(true);
      const data = await getTasks(token);
      setTasks(data);
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoad(false);
    }
  }, [token]);

  useEffect(() => { fetchTasks(); }, [fetchTasks]);

  // ── add new task ──
  const addTask = async (e) => {
    e.preventDefault();
    if (!token || !title.trim()) return;

    // optimistic UI
    const tmpId = `tmp-${Date.now()}`;
    const optimistic = { id: tmpId, title, due_date: due || null };
    setTasks((t) => [optimistic, ...t]);
    setTitle('');
    setDue('');

    try {
      setSave(true);
      const body = { title };
      if (due) body.dueDate = due;
      const real = await createTask(token, body);

      // replace tmp item with real db item
      setTasks((t) => t.map((x) => (x.id === tmpId ? real : x)));
    } catch (err) {
      console.error(err);
      setError(err.message);
      // rollback optimistic item
      setTasks((t) => t.filter((x) => x.id !== tmpId));
    } finally {
      setSave(false);
    }
  };

  // ── render ──
  return (
    <div style={{ maxWidth: 600, margin: '2rem auto' }}>
      <h1>Tasks</h1>

      <form onSubmit={addTask}>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Task title"
          required
        />
        <input
          type="date"
          value={due}
          onChange={(e) => setDue(e.target.value)}
        />
        <button type="submit" disabled={saving}>
          {saving ? 'Saving…' : 'Add'}
        </button>
      </form>

      {error && <p style={{ color: 'red' }}>{error}</p>}
      {loading ? (
        <p>Loading…</p>
      ) : (
        <ul>
          {tasks.map((t) => (
            <li key={t.id}>
              {t.title} • {t.due_date ?? '-'}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
