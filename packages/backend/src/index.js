require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Presentation = require('./models/Presentation');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err));

// Routes

// Save a presentation
try {
    const { projectId, data } = req.body;

    if (!projectId || !data) {
        return res.status(400).json({ error: 'Missing projectId or data' });
    }

    // Find existing presentation
    let presentation = await Presentation.findOne({ projectId });

    if (presentation) {
        // Add current data to history
        presentation.history.push({
            data: presentation.data,
            createdAt: presentation.createdAt
        });

        // Cap history at 3 versions
        if (presentation.history.length > 3) {
            presentation.history.shift(); // Remove oldest
        }

        // Update with new data
        presentation.data = data;
        presentation.createdAt = Date.now();
        await presentation.save();
    } else {
        // Create new
        presentation = await Presentation.create({
            projectId,
            data,
            history: []
        });
    }

    res.json({
        success: true,
        id: presentation._id,
        projectId: presentation.projectId
    });
} catch (error) {
    console.error('Error saving presentation:', error);
    res.status(500).json({ error: 'Internal server error' });
}
});

// Get a presentation by Project ID
app.get('/api/presentations/:projectId', async (req, res) => {
    try {
        const presentation = await Presentation.findOne({ projectId: req.params.projectId });

        if (!presentation) {
            return res.status(404).json({ error: 'Presentation not found' });
        }

        res.json(presentation.data);
    } catch (error) {
        console.error('Error fetching presentation:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
