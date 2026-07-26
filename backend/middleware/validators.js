const mongoose = require('mongoose');

const checkIdIsValid = (id, res) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(404).json({ err: 'Invalid ID' });
    return false;
  }
  return true;
};

const checkAuthorization = (req, userId) => {
  return req.user.id === userId.toString();
};

module.exports = { checkIdIsValid, checkAuthorization };
