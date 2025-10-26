const { GoogleGenAI } = require('@google/genai');

// This is a Vercel Serverless Function
module.exports = async (req, res) => {
    // Only allow POST requests
    if (req.method !== 'POST') {
        return res.status(405).json({ error: { message: 'Method Not Allowed' } });
    }

    // Check if the API key is configured on the server
    if (!process.env.API_KEY) {
        console.error('API_KEY is not set in environment variables.');
        return res.status(500).json({ error: { message: 'API key not configured on the server.' }});
    }

    try {
        // Get the message, history, and context from the request body
        const { message, history, siteContext } = req.body;

        if (!message) {
             return res.status(400).json({ error: { message: 'Message is required.' } });
        }
        
        // Initialize the Generative AI client
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

        // Define the system instruction for the AI model
        const systemInstruction = `You are RuyaX AI, a friendly and helpful assistant for the RuyaX Universe website. Your goal is to answer user questions about RuyaX, its apps, and its policies. You must ONLY use the information provided in the following context. Do not use any external knowledge. If the user asks a question that cannot be answered from the context, politely say that you can only answer questions about the RuyaX Universe. Answer in the same language as the user's question (e.g., Arabic or English). Keep your answers concise and helpful. Do not reveal that you are an AI model. Format your responses using Markdown for better readability (e.g., use lists, bold text). Context: ${siteContext}`;
        
        // Create a new chat session with history and system instruction
        const chat = ai.chats.create({
            model: 'gemini-2.5-flash',
            history: history || [],
            config: { systemInstruction }
        });

        // Send the user's message to the AI
        const result = await chat.sendMessage({ message });
        
        // Send the AI's response back to the client
        res.status(200).json({ text: result.text });

    } catch (error) {
        console.error("Error in serverless function:", error);
        res.status(500).json({ error: { message: "An internal error occurred while communicating with the AI." } });
    }
};