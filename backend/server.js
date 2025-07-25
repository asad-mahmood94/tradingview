const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 5000;

// ========== MIDDLEWARE ==========
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ========== CONNECT TO MONGODB ==========
mongoose.connect('mongodb://localhost:27017/postapp', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ MongoDB connected'))
.catch((err) => console.error('❌ MongoDB connection error:', err));

// ========== MONGOOSE MODEL ==========
const PostSchema = new mongoose.Schema({
  description: { type: String, required: true },
  image: { type: String, required: true },
}, { timestamps: true });

const Post = mongoose.model('Post', PostSchema);

// ========== MULTER SETUP ==========
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname),
});

const upload = multer({ storage });

// ========== ROUTE TO HANDLE POST ==========
app.post('/api/posts', upload.single('image'), async (req, res) => {
  try {
    const { description } = req.body;
    const imagePath = req.file.path;

    const newPost = new Post({ description, image: imagePath });
    await newPost.save();

    res.status(201).json({ message: '✅ Post saved successfully' });
  } catch (err) {
    console.error('❌ Error saving post:', err);
    res.status(500).json({ message: 'Failed to save post', error: err.message });
  }
});

// ========== START SERVER ==========
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});