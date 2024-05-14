const mongoose = require('mongoose');


const taskSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    dueDate: { type: Date, default: () => {
        const now = new Date();
        now.setHours(23, 59, 59, 999);
        return now;
      }},
    assignedTo: { type:mongoose.Schema.Types.ObjectId, ref: 'User' },
    status: { type: Boolean, default: false },
    
})
 
module.exports = mongoose.model('Task', taskSchema);
