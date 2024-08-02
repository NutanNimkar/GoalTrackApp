const mongoose = require("mongoose");
const { GridFSBucket } = require("mongodb");

let gridfsBucket;

const initializeGridFSBucket = () => {
  const db = mongoose.connection.db;
  gridfsBucket = new GridFSBucket(db, {
    bucketName: "evidenceImages",
  });
};

const getGridFSBucket = () => {
  if (!gridfsBucket) {
    throw new Error("GridFS bucket is not initialized");
  }
  return gridfsBucket;
};

module.exports = {
  initializeGridFSBucket,
  getGridFSBucket,
};
