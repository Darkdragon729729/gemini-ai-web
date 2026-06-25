const chatBox = document.getElementById('chat-box');
const userInput = document.getElementById('user-input');
const sendBtn = document.getElementById('send-btn');

sendBtn.addEventListener('click', appendMessage);
userInput.addEventListener('keypress', (e) => { if (e.key === 'Enter') appendMessage(); });

async function appendMessage() {
    const prompt = userInput.value.trim();
    if (!prompt) return;

    // Display user message
    displayMessage(prompt, 'user');
    userInput.value = '';

    // Display loading state
    const loadingId = displayMessage('Thinking...', 'ai');

    try {
        // Call the Netlify Serverless Function
        const response = await fetch('/.netlify/functions/api', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ prompt: prompt })
        });
        
        const data = await response.json();
        
        // Remove loading and show AI reply
        document.getElementById(loadingId).remove();
        displayMessage(data.reply || data.error, 'ai');
    } catch (error) {
        document.getElementById(loadingId).remove();
        displayMessage("Error connecting to server.", 'ai');
    }
}

function displayMessage(text, sender) {
    const msgDiv = document.createElement('div');
    const id = 'msg-' + Date.now();
    msgDiv.id = id;
    msgDiv.classList.add('message', sender);
    msgDiv.innerText = text;
    chatBox.appendChild(msgDiv);
    chatBox.scrollTop = chatBox.scrollHeight;
    return id;
}
