const mongoose = require('mongoose');

const PresentationSchema = new mongoose.Schema({
    projectId: {
        type: String,
        required: true,
        index: true
    },
    data: {
        type: Object,
        required: true
    },
    history: [{
        data: Object,
        createdAt: { type: Date, default: Date.now }
    }],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Presentation', PresentationSchema);
