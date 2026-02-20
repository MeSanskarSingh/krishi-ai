import { useState } from "react";
import SendIcon from '@mui/icons-material/Send';
import Image from "next/image";
import Navbar from "./components/navbar";

export default function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (!input) return;

    const newMessages = [...messages, { role: "user", content: input }];
    setMessages(newMessages);

    const res = await fetch(`${process.env.NEXT_PUBLIC_CHATBOT_API}/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: input }),
    });

    const data = await res.json();

    setMessages([...newMessages, { role: "bot", content: data.response }]);
    setInput("");
  };

  return (
    <div className="min-h-screen bg-[#FEF7EB] pt-24 flex flex-col items-center px-4">

      {/* Heading */}
      <h2 className="text-4xl mb-8 text-center font-mitr">
        <span className="font-thin">Presenting our AI Chatbot, </span>
        <span className="font-bold">Kisan Mitra</span>
        <span className="font-thin"> !</span>
      </h2>

      {/* Chat Container */}
      <div className="w-full max-w-2xl bg-white/60 backdrop-blur-sm rounded-3xl shadow-lg flex flex-col overflow-hidden border border-[#3F914830]">

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4 h-[450px]">

          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[75%] px-4 py-3 rounded-2xl shadow-sm text-sm leading-relaxed
                  ${msg.role === "user"
                    ? "bg-[#3F9148] text-white rounded-br-none"
                    : "bg-gray-100 text-gray-800 rounded-bl-none"}`}
              >
                {msg.content}
              </div>
            </div>
          ))}

        </div>

        {/* Input Area */}
        <div className="border-t border-gray-200 p-4 bg-white flex items-center gap-3">

          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            placeholder="Ask your farming question..."
            className="flex-1 outline-none text-base px-4 py-2 rounded-full bg-gray-100 focus:ring-2 focus:ring-[#3F9148] transition"
          />

          <button
            onClick={sendMessage}
            className="p-3 bg-[#5A3C34] text-white rounded-full hover:bg-[#33221E] transition flex items-center justify-center shadow-md"
          >
            <SendIcon fontSize="small" />
          </button>

        </div>
      </div>

      {/* Farmer Image (Decorative) */}
      <div className="hidden lg:block fixed right-10 bottom-0">
        <Image 
          src="/images/farmer-talk.png"
          height={420}
          width={280}
          alt="farmer-talking"
        />
      </div>

    </div>
  );
}
