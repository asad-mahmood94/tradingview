// client/src/App.jsx
import { useEffect, useState } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:5001/api/demo';

function UserCrud() {
    const [users, setUsers] = useState([]);
    const [form, setForm] = useState({ name: '', email: '', rollNo: ''});
    const [editId, setEditId] = useState(null);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        const res = await axios.get(API_URL);
        setUsers(res.data);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (editId) {
            await axios.put(`${API_URL}/${editId}`, form);
            setEditId(null);
        } else {
            await axios.post(API_URL, form);
        }
        setForm({ name: '', email: '', rollNo: '' });
        fetchUsers();
    };

    const handleEdit = (user) => {
        setForm({ name: user.name, email: user.email, rollNo: user.rollNo });
        setEditId(user._id);
    };

    const handleDelete = async (id) => {
        await axios.delete(`${API_URL}/${id}`);
        fetchUsers();
    };

    return (
        <div style={{ padding: 20 }}>
            <h1>User Manager</h1>
            <form onSubmit={handleSubmit}>
                <input
                    placeholder="Name"
                    value={form.name}
                    type="string"
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
                <input
                    placeholder="Email"
                    value={form.email}
                    type="string"
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
                <input
                    placeholder="rollNo"
                    value={form.rollNo}
                    type="number"
                    onChange={(e) => setForm({ ...form, rollNo: e.target.value })}
                />
                <button type="submit">{editId ? 'Update' : 'Add'} User</button>
            </form>

            <ul style={{ background: "white", flexDirection: "column" }}>
                {users.map((u) => (
                    <li key={u._id}>
                        {u.name} ({u.email}) {u.rollNo}  &nbsp;
                        <button onClick={() => handleEdit(u)}>Edit</button>
                        <button onClick={() => handleDelete(u._id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default UserCrud;