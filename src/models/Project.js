const mongoose = require('mongoose');

const projectSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        trim: true,
    },
    userId: {
        type:mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    apiConfigs: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'ApiConfig',
        },
    ],
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Project', projectSchema);