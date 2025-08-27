// import React, { useState } from 'react';
// import './Login.css';
// import Navbar from './navbar';

// function Login() {
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     password: '',
//     image: null
//   });

//   const [errors, setErrors] = useState({});
//   const [imagePreview, setImagePreview] = useState(null);

//   // Validate form fields
//   const validate = () => {
//     const newErrors = {};

//     if (!formData.name.trim()) {
//       newErrors.name = 'Name is required';
//     }

//     if (!formData.email) {
//       newErrors.email = 'Email is required';
//     } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
//       newErrors.email = 'Email is invalid';
//     }

//     if (!formData.password) {
//       newErrors.password = 'Password is required';
//     } else if (formData.password.length < 6) {
//       newErrors.password = 'Password must be at least 6 characters';
//     } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(formData.password)) {
//       newErrors.password = 'Password must include at least one special character';
//     }

//     if (!formData.image) {
//       newErrors.image = 'Image is required';
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   // Handle input change
//   const handleChange = (e) => {
//     const { name, value, files } = e.target;

//     if (name === 'image') {
//       const imageFile = files[0];
//       setFormData({ ...formData, image: imageFile });

//       const reader = new FileReader();
//       reader.onloadend = () => setImagePreview(reader.result);
//       if (imageFile) {
//         reader.readAsDataURL(imageFile);
//       }
//     } else {
//       setFormData({ ...formData, [name]: value });
//       setErrors({ ...errors, [name]: '' });
//     }
//   };

//   // Handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (validate()) {
//       const data = new FormData();
//       data.append('name', formData.name);
//       data.append('email', formData.email);
//       data.append('password', formData.password);
//       data.append('image', formData.image);

//       try {
//         const response = await fetch('http://localhost:5000/api/register', {
//           method: 'POST',
//           body: data
//         });

//         const result = await response.json();
//         if (response.ok) {
//           alert('✅ Registered successfully!');
//           console.log('User saved:', result);
//           // Reset form
//           setFormData({ name: '', email: '', password: '', image: null });
//           setImagePreview(null);
//         } else {
//           alert('❌ Error: ' + result.error);
//         }
//       } catch (err) {
//         alert('❌ Failed to submit form');
//         console.error(err);
//       }
//     }
//   };

//   return (
//     <div className='div'>
//       <div className='nav'>
//         <Navbar isLoginPage={true} />
//       </div>

//       <div className='frm'>
//         <form onSubmit={handleSubmit}>
//           {/* Name */}
//           <div>
//             <label>Name:</label><br />
//             <input name="name" value={formData.name} onChange={handleChange} />
//             <div style={{ color: 'red' }}>{errors.name}</div>
//           </div>
//           <br />

//           {/* Email */}
//           <div>
//             <label>Email:</label><br />
//             <input name="email" value={formData.email} onChange={handleChange} />
//             <div style={{ color: 'red' }}>{errors.email}</div>
//           </div>
//           <br />

//           {/* Password */}
//           <div>
//             <label>Password:</label><br />
//             <input name="password" type="password" value={formData.password} onChange={handleChange} />
//             <div style={{ color: 'red' }}>{errors.password}</div>
//           </div>
//           <br />

//           {/* Image Upload */}
//           <div>
//             <label>Upload Image:</label><br />
//             <input name="image" type="file" accept="image/*" onChange={handleChange} />
//             <div style={{ color: 'red' }}>{errors.image}</div>
//           </div>
//           <br />

//           {/* Image Preview */}
//           {imagePreview && (
//             <div>
//               <p>Image Preview:</p>
//               <img
//                 src={imagePreview}
//                 alt="Preview"
//                 style={{ width: '150px', height: '150px', objectFit: 'cover' }}
//               />
//             </div>
//           )}
//           <br />

//           {/* Submit */}
//           <button type="submit">Register</button>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default Login; 

import React, { useState } from 'react';
import './Registered.css';
import Navbar from './navbar';
import { Link, useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

function Registered() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: '', email: '', password: '', image: null });
  const [errors, setErrors] = useState({});
  const [imagePreview, setImagePreview] = useState(null);

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    if (!formData.password) newErrors.password = 'Password is required';
    else if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    else if (!/[!@#$%^&*(),.?":{}|<>]/.test(formData.password)) newErrors.password = 'Password must include a special character';
    if (!formData.image) newErrors.image = 'Image is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      const imageFile = files[0];
      setFormData({ ...formData, image: imageFile });
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      if (imageFile) reader.readAsDataURL(imageFile);
    } else {
      setFormData({ ...formData, [name]: value });
      setErrors({ ...errors, [name]: '' });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      const data = new FormData();
      data.append('name', formData.name);
      data.append('email', formData.email);
      data.append('password', formData.password);
      data.append('image', formData.image);

      try {
        const response = await fetch('http://localhost:5001/api/register', {
          method: 'POST',
          body: data,
        });

        const result = await response.json();
        if (response.ok) {
          localStorage.setItem('token', result.token);
          localStorage.setItem('isLoggedIn', 'true');

          const decoded = jwtDecode(result.token);
          localStorage.setItem('isAdmin', decoded.isAdmin);

          alert('✅ Registered and logged in!');
          navigate('/');
        } else {
          alert('❌ Error: ' + result.error);
        }
      } catch (err) {
        alert('❌ Failed to connect to server');
        console.error(err);
      }
    }
  };

  return (
    <div className='div'>
      <div className='nav'><Navbar isLoginPage={true} /></div>
      <div className='frm'>
        <form onSubmit={handleSubmit}>
          <div><label>Name:</label><br />
            <input name="name" value={formData.name} onChange={handleChange} />
            {errors.name && <div style={{ color: 'red' }}>{errors.name}</div>}
          </div><br />
          <div><label>Email:</label><br />
            <input name="email" value={formData.email} onChange={handleChange} />
            {errors.email && <div style={{ color: 'red' }}>{errors.email}</div>}
          </div><br />
          <div><label>Password:</label><br />
            <input name="password" type="password" value={formData.password} onChange={handleChange} />
            {errors.password && <div style={{ color: 'red' }}>{errors.password}</div>}
          </div><br />
          <div><label>Upload Image:</label><br />
            <input name="image" type="file" accept="image/*" onChange={handleChange} />
            {errors.image && <div style={{ color: 'red' }}>{errors.image}</div>}
          </div><br />
          {imagePreview && (
            <div>
              <p>Image Preview:</p>
              <img src={imagePreview} alt="Preview" style={{ width: '150px', height: '150px', objectFit: 'cover', borderRadius: '8px' }} />
            </div>
          )}<br />
          <button type="submit">Register</button>
          <p>Already have an account? <Link to="/login" className="login">Login</Link></p>
        </form>
      </div>
    </div>
  );
}

export default Registered;