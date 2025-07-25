// import cors from 'cors';
// import express from 'express';

// const app = express();

// app.use(cors({
//    credentials: true,
//    origin: "http://localhost:5173"
// }));
// app.use(express.json());

// // Sample users data
// const users = [
//   { name: 'Alice', rollNumber: 'CS101' },
//   { name: 'Bob', rollNumber: 'CS102' },
//   { name: 'Charlie', rollNumber: 'CS103' }
// ];

// // Route that returns user list
// app.get('/api', (req, res) => {
//     res.json(users);  // Send array of users
// });

// app.listen(5000, () => {
//     console.log('Express server running at http://localhost:5000');
// });




// this code is for to store data by the user and can also update or delete
// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');

// const app = express();
// const PORT = 5000;
// const MONGO_URI = 'mongodb://localhost:27017/usercrud'; // Change DB name as needed

// // Middleware
// app.use(cors());
// app.use(express.json());

// // MongoDB Connection
// mongoose.connect(MONGO_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// })
// .then(() => console.log('✅ Connected to MongoDB'))
// .catch(err => console.error('❌ MongoDB connection error:', err));

// // Schema & Model
// const userSchema = new mongoose.Schema({
//   name: String,
//   email: String,
//   rollNo: Number
// }, { timestamps: true });

// const User = mongoose.model('User', userSchema);

// // Routes

// // Create
// app.post('/api/users', async (req, res) => {
//   try {
//     const user = await User.create(req.body);
//     res.status(201).json(user);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

// // Read all
// app.get('/api/users', async (req, res) => {
//   const users = await User.find();
//   res.json(users);
// });

// // Update
// app.put('/api/users/:id', async (req, res) => {
//   try {
//     const updatedUser = await User.findByIdAndUpdate(
//       req.params.id,
//       req.body,
//       { new: true }
//     );
//     res.json(updatedUser);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

// // Delete
// app.delete('/api/users/:id', async (req, res) => {
//   try {
//     await User.findByIdAndDelete(req.params.id);
//     res.json({ message: 'User deleted' });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

// // Start server
// app.listen(PORT, () => {
//   console.log(`🚀 Server running on http://localhost:${PORT}`);
// });    
//                code ended here





// // this code is for to store the data of the login form page in trading view project
// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const multer = require('multer');
// const path = require('path');

// // Setup
// const app = express();
// const PORT = 5000;
// const MONGO_URI = 'mongodb://localhost:27017/loginApp'; // Change DB name if needed

// // Middleware
// app.use(cors());
// app.use(express.json());
// app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); // Serve static image files

// // MongoDB Connection
// mongoose.connect(MONGO_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// })
// .then(() => console.log('✅ Connected to MongoDB'))
// .catch(err => console.error('❌ MongoDB error:', err));

// // Schema & Model
// const userSchema = new mongoose.Schema({
//   name: String,
//   email: String,
//   password: String,
//   imageUrl: String
// }, { timestamps: true });

// const User = mongoose.model('User', userSchema);

// // Multer Setup
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'uploads/'); // Save images in /uploads
//   },
//   filename: (req, file, cb) => {
//     const uniqueName = Date.now() + path.extname(file.originalname);
//     cb(null, uniqueName);
//   }
// });

// const upload = multer({ storage });

// // POST /api/register — Handle form submission
// app.post('/api/register', upload.single('image'), async (req, res) => {
//   try {
//     const { name, email, password } = req.body;
//     const imageUrl = req.file ? req.file.filename : null;

//     const newUser = new User({ name, email, password, imageUrl });
//     await newUser.save();

//     res.status(201).json({
//       message: 'User registered successfully',
//       user: newUser
//     });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// // Start server
// app.listen(PORT, () => {
//   console.log(`🚀 Server is running at http://localhost:${PORT}`);
// });
//  code ends here  



// index.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/communityDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Mongoose Schema
const imageSchema = new mongoose.Schema({
  image: String,        // image path (e.g., "/gpic1.webp")
  description: String,
});

const ImageModel = mongoose.model('Image', imageSchema);

// Route to save image + description
app.post('/api/images', async (req, res) => {
  try {
    const { image, description } = req.body;

    const newEntry = new ImageModel({ image, description });
    await newEntry.save();

    res.status(201).json({ message: 'Description saved successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to save description' });
  }
});

// Route to get all saved data
app.get('/api/images', async (req, res) => {
  try {
    const images = await ImageModel.find();
    res.status(200).json(images);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch data' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});          