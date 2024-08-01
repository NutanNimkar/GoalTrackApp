const express = require("express");
const multer = require("multer");
const { GridFsStorage } = require('multer-gridfs-storage');
const { createUser, getAllUsers, getUser, updateUser, deleteUser, getUsersGroups, getUsersTasks, uploadEvidence, displayImage, getEvidenceImages,  ensureGridFSBucket} = require("../controllers/userController");
const router = express.Router();
require("dotenv").config();

const storage = new GridFsStorage({
  url: process.env.MONG_URI,
  file: (req, file) => {
      if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        return {
          bucketName: 'evidenceImages',
          filename: `${Date.now()}_${file.originalname}`,
        };
      } else {
        return `${Date.now()}_${file.originalname}`;
      }
    },
  });
  const upload = multer({ storage });
  

//gets all the users
router.get("/", getAllUsers);

//gets a single user by id

router.get("/:id", getUser);

//creates a new user

router.post("/", createUser);

//updates a user

router.put("/:id", updateUser);

//deletes a user
router.delete("/:id", deleteUser);

// groups associated with a user
router.get("/:id/groups", getUsersGroups);

//tasks associated with a user
router.get("/:id/tasks", getUsersTasks);

//upload image evidence
router.post('/:id/uploadEvidence', upload.single('image'), uploadEvidence);

// Get all evidence images for a user
router.get("/:id/evidence", ensureGridFSBucket, getEvidenceImages);

// Download a specific evidence image by filename
router.get("/evidence/:filename", ensureGridFSBucket, displayImage);

module.exports = router;
