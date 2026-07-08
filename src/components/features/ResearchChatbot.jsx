import { useState, useEffect, useRef } from 'react';
import { FaPaperPlane, FaMicrochip, FaTerminal } from 'react-icons/fa';
import './ResearchChatbot.css';

const ResearchChatbot = () => {
  const [messages, setMessages] = useState([
    { id: 1, role: 'assistant', text: 'RESEARCH_AI // ONLINE. HOW CAN I ASSIST YOUR ANALYSIS?' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const scrollRef = useRef(null);

  // Auto-scroll to bottom of terminal
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputValue.trim() || isProcessing) return;

    // 1. Add user message
    const userMessage = { id: Date.now(), role: 'user', text: inputValue.toUpperCase() };
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    
    // 2. Trigger "Processing" state
    setIsProcessing(true);

    // 3. Simulate backend delay (Step 2 Mock Logic)
    setTimeout(() => {
      const aiResponse = { 
        id: Date.now() + 1, 
        role: 'assistant', 
        text: `ACKNOWLEDGED: "${userMessage.text}". \n\nTHIS MODULE IS CURRENTLY IN OFFLINE SIMULATION MODE. AWAITING FASTAPI UPLINK.` 
      };
      
      setMessages(prev => [...prev, aiResponse]);
      setIsProcessing(false);
    }, 1500);
  };

  return (
    <div className="research-chatbot journal-panel">
      <header className="chatbot-header">
        <div className="chatbot-identity">
          <FaMicrochip className="icon-accent" />
          <div>
            <span className="section-label">AI_CORE_INTERFACE</span>
            <h3>RESEARCH_ASSISTANT // V.1.0.4</h3>
          </div>
        </div>
        <div className="status-indicator">
          <span className={`status-lamp ${isProcessing ? 'lamp-thinking' : 'lamp-ready'}`}></span>
          <span className="status-text">{isProcessing ? 'THINKING' : 'READY'}</span>
        </div>
      </header>

      <div className="terminal-window" ref={scrollRef}>
        <div className="terminal-grid-overlay"></div>
        {messages.map((msg) => (
          <div key={msg.id} className={`message-row ${msg.role}`}>
            <span className="role-tag">[{msg.role === 'assistant' ? 'AI' : 'USR'}]</span>
            <p className="message-text">{msg.text}</p>
          </div>
        ))}
        {isProcessing && (
          <div className="message-row assistant">
            <span className="role-tag">[AI]</span>
            <p className="message-text typing-indicator">ANALYZING...</p>
          </div>
        )}
      </div>

      <form className="chatbot-input-area" onSubmit={handleSubmit}>
        <div className="input-bezel">
          <FaTerminal className="input-icon" />
          <input
            type="text"
            className="mechanical-input"
            placeholder="ENTER_QUERY..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            disabled={isProcessing}
          />
        </div>
        <button type="submit" className="journal-button send-actuator" disabled={isProcessing || !inputValue.trim()}>
          <FaPaperPlane />
          <span>EXECUTE</span>
        </button>
      </form>
    </div>
  );
};

export default ResearchChatbot;
