const mongoose = require('mongoose');

const apiConfigSchema = new mongoose.Schema({
    projectName: {
        type: String,
        required: true,
        trim: true,
    },
    project: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project',
        required: true,
    },
    endpoints: [
        {
            path: {
                type: String,
                required: true,
            },
            method: {
                type: String,
                required: true,
                enum: ['GET', 'POST', 'PUT', 'DELETE'],
            },
            parameters: [
                {
                    name: String,
                    type: {
                        type: String,
                        enum: ['String', 'Number', 'Boolean', 'Array', 'Object']
                    },
                    required: Boolean,
                },
            ],
            response: {
                type: Object,
            },
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

module.exports = mongoose.model('ApiConfig', apiConfigSchema);