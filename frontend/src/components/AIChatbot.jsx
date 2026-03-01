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