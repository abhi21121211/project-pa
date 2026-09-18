require('dotenv').config();
const crypto = require('crypto');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Presentation = require('./models/Presentation');

function hashToken(token) {
    return crypto.createHash('sha256').update(token).digest('hex');
}

function generateToken() {
    return crypto.randomBytes(24).toString('hex');
}

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err));

// Health check
app.get('/', (req, res) => {
    res.json({ status: 'Project PA Backend is running' });
});

// Save/Update a presentation
app.post('/api/presentations', async (req, res) => {
    try {
        const { projectId, data, token } = req.body;

        if (!projectId || !data) {
            return res.status(400).json({ error: 'Missing projectId or data' });
        }

        // Find existing presentation by projectId
        let presentation = await Presentation.findOne({ projectId });
        let issuedToken = null;

        if (presentation) {
            if (presentation.deployTokenHash) {
                // Existing, protected presentation: caller must prove ownership
                if (!token || hashToken(token) !== presentation.deployTokenHash) {
                    return res.status(401).json({ error: 'Invalid or missing deploy token for this project' });
                }
            } else {
                // Legacy row created before token auth existed: claim it now
                issuedToken = token || generateToken();
                presentation.deployTokenHash = hashToken(issuedToken);
                console.warn(`Claimed legacy presentation without a deploy token: ${projectId}`);
            }

            // Add current data to history before updating
            presentation.history.push({
                data: presentation.data,
                createdAt: presentation.createdAt
            });

            // Keep only last 3 versions in history
            if (presentation.history.length > 3) {
                presentation.history.shift(); // Remove oldest
            }

            // Update with new data
            presentation.data = data;
            presentation.createdAt = Date.now();
            await presentation.save();

            console.log(`Updated presentation: ${projectId} (${presentation.history.length} versions in history)`);
        } else {
            // Create new presentation, issuing a fresh deploy token
            issuedToken = generateToken();
            presentation = await Presentation.create({
                projectId,
                deployTokenHash: hashToken(issuedToken),
                data,
                history: []
            });

            console.log(`Created new presentation: ${projectId}`);
        }

        const response = {
            success: true,
            id: presentation._id,
            projectId: presentation.projectId,
            historyCount: presentation.history.length
        };

        // Only ever sent once: the moment a token is created/reissued
        if (issuedToken) {
            response.token = issuedToken;
        }

        res.json(response);
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

// Get presentation with history
app.get('/api/presentations/:projectId/history', async (req, res) => {
    try {
        const presentation = await Presentation.findOne({ projectId: req.params.projectId });

        if (!presentation) {
            return res.status(404).json({ error: 'Presentation not found' });
        }

        res.json({
            current: presentation.data,
            history: presentation.history,
            historyCount: presentation.history.length
        });
    } catch (error) {
        console.error('Error fetching presentation history:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
