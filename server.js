const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
// Make sure you have @google/generative-ai installed
const { GoogleGenAI } = require('@google/generative-ai'); 

dotenv.config();
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// Serve your frontend HTML/CSS/JS files from the public folder
app.use(express.static('public'));

// This handles the AI requests locally
app.post('/api/chat', async (req, res) => {
    try {
        const { message } = req.body;
        if (!process.env.GEMINI_API_KEY) {
            return res.status(500).json({ error: "API Key missing in .env file" });
        }

        // Initialize Gemini API
        const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
        const model = ai.getGenerativeModel({ model: "gemini-1.5-flash" });

        const result = await model.generateContent(message);
        const responseText = result.response.text();

        res.json({ reply: responseText });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`🚀 Server is running locally at http://localhost:${PORT}`);
});