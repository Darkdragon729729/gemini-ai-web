const { GoogleGenAI } = require("@google/genai"); // Or your specific Gemini package

exports.handler = async (event, context) => {
  // Only allow POST requests (when user clicks send)
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  try {
    const { message } = JSON.parse(event.body);
    
    // Netlify pulls your API key safely from Environment Variables
    const apiKey = process.env.GEMINI_API_KEY; 
    const ai = new GoogleGenAI({ apiKey: apiKey });

    // Call the Gemini Model
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: message,
    });

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ reply: response.text }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};

