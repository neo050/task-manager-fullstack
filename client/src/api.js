// api.js
export const getTasks = async (token) => {
    const res = await fetch('/tasks', {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) throw new Error('Failed to load tasks');
    return res.json();
  };
  
  export const createTask = async (token, body) => {
    const res = await fetch('/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });
    if (!res.ok) throw new Error('Failed to add task');
    return res.json();
  };
  