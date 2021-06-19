const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
let recognition;

try {
    recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.continuous = true;
} catch (e) {
    recognition = null;
}

export default recognition;