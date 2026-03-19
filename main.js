document.addEventListener('DOMContentLoaded', () => {
    const chatForm = document.getElementById('chat-form');
    const userInput = document.getElementById('user-input');
    const chatWindow = document.getElementById('chat-window');

    chatForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const message = userInput.value.trim();
        
        if (message) {
            addMessage(message, 'user');
            userInput.value = '';
            
            // Simulate AI response delay
            setTimeout(() => {
                simulateAIResponse(message);
            }, 800);
        }
    });

    function addMessage(text, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message', sender);
        
        const bubble = document.createElement('div');
        bubble.classList.add('bubble');
        bubble.textContent = text;
        
        messageDiv.appendChild(bubble);
        chatWindow.appendChild(messageDiv);
        
        // Scroll to bottom
        chatWindow.scrollTo({
            top: chatWindow.scrollHeight,
            behavior: 'smooth'
        });
    }

    function simulateAIResponse(userMessage) {
        let response = "";
        
        // Simple logic for prototype demonstration
        if (userMessage.includes("부모님") || userMessage.includes("엄마") || userMessage.includes("아빠")) {
            response = "부모님의 기대가 당신의 선택에 큰 무게를 더하고 있군요. 만약 그분들의 목소리가 들리지 않는 고요한 숲속이라면, 당신의 마음은 어디로 향하고 있나요?";
        } else {
            response = "그 매듭을 풀기 위해 첫 번째 질문을 드릴게요. '이것은 진정 당신의 욕구인가요, 아니면 누군가의 기대인가요?'";
        }
        
        addMessage(response, 'ai');
    }
});
