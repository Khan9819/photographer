require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const Photographer = require('./models/Photographer');

const admin = require('firebase-admin');
admin.initializeApp({
  credential: admin.credential.cert(require('./firebaseServiceAccount.json'))
});

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

// Cloudflare R2
const s3 = new S3Client({
  region: "auto",
  endpoint: process.env.R2_ENDPOINT,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY
  }
});

// Multer
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Firebase Auth Middleware
const authMiddleware = async (req,res,next)=>{
  const token = req.headers.authorization?.split('Bearer ')[1];
  if(!token) return res.status(401).json({message:'Unauthorized'});
  try{
    const decoded = await admin.auth().verifyIdToken(token);
    req.user = decoded;
    next();
  }catch(e){
    res.status(401).json({message:'Invalid token'});
  }
};

// SAVE / UPDATE PROFILE
app.post('/api/profile', authMiddleware, upload.single('logo'), async (req, res)=>{
  try {
    const {
      companyName, slogan, companyEmail, phone, address,
      description, instagram, facebook, tiktok, linkedin
    } = req.body;

    let logoURL = '';
    if(req.file){
      const key = `photographers/${req.user.uid}/logo.png`;
      await s3.send(new PutObjectCommand({
        Bucket: process.env.R2_BUCKET,
        Key: key,
        Body: req.file.buffer,
        ContentType: req.file.mimetype
      }));
      logoURL = `${process.env.R2_ENDPOINT}/${key}`;
    }

    const profile = await Photographer.findOneAndUpdate(
      { uid: req.user.uid },
      {
        uid: req.user.uid,
        companyName, slogan, companyEmail, phone, address,
        description, instagram, facebook, tiktok, linkedin,
        ...(logoURL && { logoURL }),
        updatedAt: new Date()
      },
      { upsert:true, new:true }
    );

    res.json(profile);
  } catch(err){
    console.error(err);
    res.status(500).json({message:'Server error'});
  }
});

// GET PROFILE
app.get('/api/profile', authMiddleware, async (req,res)=>{
  const profile = await Photographer.findOne({ uid: req.user.uid });
  if(!profile) return res.status(404).json({message:'Profile not found'});
  res.json(profile);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=>console.log(`Server running on port ${PORT}`));
