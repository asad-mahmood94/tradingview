import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../navcomponent/navbar';

const Post = () => {
    const [description, setDescription] = useState('');
    const [image, setImage] = useState(null);
    const [message, setMessage] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        try {
            const adminStatus = localStorage.getItem('isAdmin');
            setIsAdmin(adminStatus === 'true');
        } catch (err) {
            console.error('Error checking admin status:', err);
            setIsAdmin(false);
        } finally {
            setLoading(false);
        }
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('description', description);
        formData.append('image', image);

        try {
            await axios.post('http://localhost:5000/api/posts', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            setMessage('✅ Post uploaded successfully!');
            setDescription('');
            setImage(null);
        } catch (err) {
            console.error(err);
            setMessage('❌ Failed to upload post.');
        }
    };

    if (loading) {
        return (
            <div className="whole">
                <div className="nav"><Navbar /></div>
                <p>Loading...</p>
            </div>
        );
    }

    if (!isAdmin) {
        return (
            <div className="whole">
                <div className="nav"><Navbar /></div>
                <h2 style={{ color: 'red', margin: '20px' }}>⛔ Access Denied: Admins only</h2>
            </div>
        );
    }

    return (
        <div className="whole">
            <div className="nav"><Navbar /></div>
            <h2>Create a New Post</h2>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
                <div>
                    <label>Description:</label><br />
                    <input
                        type="text"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Image:</label><br />
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setImage(e.target.files[0])}
                        required
                    />
                </div>
                <button type="submit">Submit</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default Post;