const mongoose = require('mongoose');


const taskSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    dueDate: { type: Date, required: true },
    assignedTo: { type:mongoose.Schema.Types.ObjectId, ref: 'User' },
    status: { type: Boolean, default: false },
    
})

// taskSchema.methods.resetDuDate = function() {
//     // this.dueDate = new Date(this.dueDate + 24 * 60 * 60 * 1000);
//     this.dueDate = new Date(Date.now() + 24 * 60 * 60 * 1000);
//     this.status = false;
//     this.save();
//     return this;
// }
module.exports = mongoose.model('Task', taskSchema);
