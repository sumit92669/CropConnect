<<<<<<< HEAD
import React, { useState, useRef, useEffect } from "react";

export default function AIChatbot() {

  /* =========================
     LANGUAGE DETECTION
  ========================== */

  const detectLanguage = (text) => {
    const t = text.toLowerCase();
    if (t.match(/sat sri akal|punjabi|kanak|bhav|kiven/)) return "punjabi";
    if (t.match(/namaste|kya|kaise|hindi|daam/)) return "hindi";
    return "english";
  };

  /* =========================
     KNOWLEDGE BASE
  ========================== */

  const KB = {
    greeting: {
      english: "🌾 Hello! How can I help you?",
      hindi: "🙏 Namaste! Main aapki madad ke liye yahan hoon.",
      punjabi: "🙏 Sat Sri Akal ji! Kiven madad karaan?"
    },
    msp: {
      english: "📊 MSP 2024-25:\nWheat ₹2,275\nRice ₹2,300\nCotton ₹7,121",
      hindi: "📊 MSP 2024-25:\nGehu ₹2,275\nChawal ₹2,300\nKapas ₹7,121",
      punjabi: "📊 MSP 2024-25:\nKanak ₹2,275\nChawal ₹2,300\nKapas ₹7,121"
    },
    wheat: {
      english: "🌿 Wheat MSP ₹2,275 per quintal. Best listing time: November–December.",
      hindi: "🌿 Gehu MSP ₹2,275 prati quintal. Behtar listing: November–December.",
      punjabi: "🌿 Kanak MSP ₹2,275 prati quintal. Best samay: November–December."
    },
    register: {
      english: "To register → Go to Register page → Select role → Fill details → Submit.",
      hindi: "Register karne ke liye → Register page par jaaye → Role select kare → Details bhare → Submit.",
      punjabi: "Register layi → Register page te jao → Role select karo → Details bharo → Submit karo."
    },
    listing: {
      english: "🌾 To list crop → Add crop name, quantity, price & location → Publish.",
      hindi: "🌾 Crop list karne ke liye → Naam, matra, daam aur location add kare → Publish kare.",
      punjabi: "🌾 Crop list layi → Naam, matra, price te location add karo → Publish karo."
    },
    fallback: {
      english: "🤖 I understand English, Hindi and Punjabi. Please ask about MSP, wheat or registration.",
      hindi: "🤖 Main English, Hindi aur Punjabi samajhta hoon. Kripya MSP ya registration ke bare me puchiye.",
      punjabi: "🤖 Main English, Hindi te Punjabi samajhda haan. MSP ya registration bare pucho."
    }
  };

  /* =========================
     STATE
  ========================== */

  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: "bot", text: "🌾 Hello! I support English, Hindi & Punjabi." }
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [lastTopic, setLastTopic] = useState(null);
  const chatRef = useRef(null);

  useEffect(() => {
    chatRef.current?.scrollTo(0, chatRef.current.scrollHeight);
  }, [messages]);

  /* =========================
     BOT LOGIC
  ========================== */

  const generateReply = (msg) => {
    const text = msg.toLowerCase();
    const lang = detectLanguage(text);

    if (text.match(/hello|hi|namaste|sat sri akal/)) {
      return KB.greeting[lang];
    }

    if (text.match(/msp|price|rate|bhav|daam/)) {
      setLastTopic("msp");
      return KB.msp[lang];
    }

    if (text.match(/wheat|gehu|kanak/)) {
      setLastTopic("wheat");
      return KB.wheat[lang];
    }

    if (text.match(/register|signup/)) {
      setLastTopic("register");
      return KB.register[lang];
    }

    if (text.match(/list|sell/)) {
      setLastTopic("listing");
      return KB.listing[lang];
    }

    if (text.includes("more") && lastTopic) {
      return KB[lastTopic][lang];
    }

    return KB.fallback[lang];
  };

  const sendMessage = () => {
    if (!input.trim()) return;

    const userMsg = { sender: "user", text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setTyping(true);

    setTimeout(() => {
      const botMsg = { sender: "bot", text: generateReply(input) };
      setMessages(prev => [...prev, botMsg]);
      setTyping(false);
    }, 700); // typing delay
  };

  /* =========================
     UI
  ========================== */

  return (
    <>
      <div style={styles.chatButton} onClick={() => setIsOpen(!isOpen)}>
        💬
      </div>

      {isOpen && (
        <div style={styles.chatContainer}>

          <div style={styles.header}>
            🌾 CropConnect Assistant
            <span style={styles.close} onClick={() => setIsOpen(false)}>✖</span>
          </div>

          <div style={styles.chatBox} ref={chatRef}>
            {messages.map((msg, i) => (
              <div
                key={i}
                style={{
                  ...styles.message,
                  alignSelf: msg.sender === "user" ? "flex-end" : "flex-start",
                  backgroundColor: msg.sender === "user" ? "#4CAF50" : "#eee",
                  color: msg.sender === "user" ? "#fff" : "#000"
                }}
              >
                {msg.text}
              </div>
            ))}
            {typing && <div style={styles.typing}>Typing...</div>}
          </div>

          <div style={styles.inputArea}>
            <input
              value={input}
              placeholder="Type message..."
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              style={styles.input}
            />
            <button onClick={sendMessage} style={styles.sendBtn}>Send</button>
          </div>

        </div>
      )}
    </>
  );
}

/* =========================
   STYLES
========================= */

const styles = {
  chatButton: {
    position: "fixed",
    bottom: "25px",
    right: "25px",
    width: "60px",
    height: "60px",
    borderRadius: "50%",
    backgroundColor: "#4CAF50",
    color: "#fff",
    fontSize: "28px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
    boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
    zIndex: 9999
  },
  chatContainer: {
    position: "fixed",
    bottom: "100px",
    right: "25px",
    width: "370px",
    height: "540px",
    backgroundColor: "#fff",
    borderRadius: "12px",
    boxShadow: "0 6px 20px rgba(0,0,0,0.2)",
    display: "flex",
    flexDirection: "column",
    zIndex: 9999
  },
  header: {
    backgroundColor: "#4CAF50",
    color: "#fff",
    padding: "12px",
    fontWeight: "bold",
    display: "flex",
    justifyContent: "space-between"
  },
  close: { cursor: "pointer" },
  chatBox: {
    flex: 1,
    padding: "10px",
    overflowY: "auto",
    display: "flex",
    flexDirection: "column",
    gap: "8px"
  },
  message: {
    padding: "8px 12px",
    borderRadius: "15px",
    maxWidth: "75%",
    fontSize: "14px"
  },
  typing: {
    fontStyle: "italic",
    color: "#888"
  },
  inputArea: {
    display: "flex",
    borderTop: "1px solid #ddd"
  },
  input: {
    flex: 1,
    padding: "10px",
    border: "none",
    outline: "none"
  },
  sendBtn: {
    backgroundColor: "#4CAF50",
    color: "#fff",
    border: "none",
    padding: "10px 15px",
    cursor: "pointer"
  }
};
=======
import React, { useState } from "react";

function AIChatbot() {

  const [isOpen, setIsOpen] = useState(false);

  const [messages, setMessages] = useState([
    {
      text: "Hello / नमस्ते / ਸਤ ਸ੍ਰੀ ਅਕਾਲ 🙏\nI am CropConnect AI.\nAsk me about crops, price, weather.",
      sender: "bot"
    }
  ]);

  const [input, setInput] = useState("");


  function getReply(msg) {

    msg = msg.toLowerCase();


    // PRICE

    if (msg.includes("price"))
      return "Crop price is ₹1800–₹4000 per quintal 🌾";

    if (msg.includes("कीमत"))
      return "फसल की कीमत ₹1800–₹4000 प्रति क्विंटल है 🌾";

    if (msg.includes("ਕੀਮਤ"))
      return "ਫਸਲ ਦੀ ਕੀਮਤ ₹1800–₹4000 ਪ੍ਰਤੀ ਕੁਇੰਟਲ ਹੈ 🌾";


    // WEATHER

    if (msg.includes("weather"))
      return "Weather is good for farming today ☀️";

    if (msg.includes("मौसम"))
      return "आज खेती के लिए मौसम अच्छा है ☀️";

    if (msg.includes("ਮੌਸਮ"))
      return "ਅੱਜ ਖੇਤੀ ਲਈ ਮੌਸਮ ਵਧੀਆ ਹੈ ☀️";


    // SELL

    if (msg.includes("sell"))
      return "Go to Farmer section to sell crops";

    if (msg.includes("बेचना"))
      return "फसल बेचने के लिए Farmer section में जाएं";

    if (msg.includes("ਵੇਚਣਾ"))
      return "ਫਸਲ ਵੇਚਣ ਲਈ Farmer section ਵਿੱਚ ਜਾਓ";


    return "I can help with crop price, weather, selling 🌾";

  }


  function sendMessage() {

    if (!input) return;

    const userMsg = {
      text: input,
      sender: "user"
    };

    const botMsg = {
      text: getReply(input),
      sender: "bot"
    };

    setMessages([...messages, userMsg, botMsg]);

    setInput("");

  }



  return (

    <>

      {/* Floating Button */}

      <button

        onClick={() => setIsOpen(!isOpen)}

        style={{

          position: "fixed",

          bottom: "20px",

          right: "20px",

          background: "green",

          color: "white",

          border: "none",

          borderRadius: "50%",

          width: "60px",

          height: "60px",

          fontSize: "26px",

          cursor: "pointer",

          zIndex: 9999

        }}

      >

        💬

      </button>




      {/* Chat Box */}

      {isOpen && (

        <div

          style={{

            position: "fixed",

            bottom: "90px",

            right: "20px",

            width: "320px",

            background: "white",

            border: "1px solid gray",

            borderRadius: "10px",

            padding: "10px",

            zIndex: 9999

          }}

        >


          <div

            style={{

              height: "250px",

              overflowY: "auto",

              marginBottom: "10px"

            }}

          >

            {messages.map((msg, index) => (

              <div key={index}>

                <b>{msg.sender}:</b> {msg.text}

              </div>

            ))}

          </div>



          <input

            value={input}

            onChange={(e) => setInput(e.target.value)}

            placeholder="Ask in English / Hindi / Punjabi"

            style={{

              width: "70%",

              padding: "5px"

            }}

          />



          <button

            onClick={sendMessage}

            style={{

              padding: "6px",

              marginLeft: "5px",

              background: "green",

              color: "white",

              border: "none"

            }}

          >

            Send

          </button>


        </div>

      )}


    </>

  );

}

export default AIChatbot;
>>>>>>> main
