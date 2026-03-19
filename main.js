import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getFirestore, collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

// 1. Firebase 설정 (여기에 실제 프로젝트 설정을 입력하세요)
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};

// Firebase 초기화
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

document.addEventListener('DOMContentLoaded', () => {
    const chatForm = document.getElementById('chat-form');
    const userInput = document.getElementById('user-input');
    const sendBtn = document.getElementById('send-btn');
    const chatWindow = document.getElementById('chat-window');

    chatForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const message = userInput.value.trim();
        
        if (message) {
            // 1. 유저 메시지 화면 추가
            addMessage(message, 'user');
            userInput.value = '';
            
            // 2. 로딩 상태 및 입력창 비활성화
            setLoading(true);
            const loadingBubble = showLoadingBubble();
            
            try {
                // 3. Firestore 데이터 저장 (forest_walks 컬렉션)
                // 실제 연동 시 firebaseConfig를 유효한 값으로 채워야 작동합니다.
                await addDoc(collection(db, "forest_walks"), {
                    content: message,
                    timestamp: serverTimestamp()
                });

                // 저장 성공 시 약간의 지연 후 AI의 첫 번째 질문 출력
                await new Promise(resolve => setTimeout(resolve, 1000));
                loadingBubble.remove();
                
                // 가이드의 특정 질문 출력
                addMessage("Q1. 이 결정은 나의 가치관에서 나온 것인가요?", 'ai');

            } catch (error) {
                console.error("데이터 저장 중 오류 발생: ", error);
                loadingBubble.remove();
                addMessage("숲의 안개가 짙어 잠시 길을 잃었네요. 다시 한번 말씀해 주시겠어요?", 'ai');
            } finally {
                setLoading(false);
            }
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
        scrollToBottom();
        return messageDiv;
    }

    function showLoadingBubble() {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message', 'ai');
        
        const bubble = document.createElement('div');
        bubble.classList.add('bubble');
        
        const dots = document.createElement('div');
        dots.classList.add('loading-dots');
        dots.innerHTML = '<span class="dot"></span><span class="dot"></span><span class="dot"></span>';
        
        bubble.appendChild(dots);
        messageDiv.appendChild(bubble);
        chatWindow.appendChild(messageDiv);
        scrollToBottom();
        return messageDiv;
    }

    function setLoading(isLoading) {
        userInput.disabled = isLoading;
        sendBtn.disabled = isLoading;
        if (!isLoading) {
            userInput.focus();
        }
    }

    function scrollToBottom() {
        chatWindow.scrollTo({
            top: chatWindow.scrollHeight,
            behavior: 'smooth'
        });
    }
});
