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
    
    <div className="w-full mx-auto p-5 flex flex-col items-center bg-[#FEF7EB] min-h-screen relative border-t-2 border-[#33221E] pt-[100px] pb-0">
  <h2 className="text-4xl mb-7 text-center font-mitr">
    <span className="font-thin">Presenting our AI Chatbot, </span>
    <span className="font-bold">Kisan Mitra</span>
    <span className="font-thin"> !</span>
  </h2>

  {/* Chatbox stays centered */}
  <div className="w-[600px] bg-[#3F914824] px-3 py-3 rounded-3xl flex flex-col items-center justify-center mx-auto">
    <div
      style={{ padding: 20, height: 400, overflowY: "auto", marginBottom: 10 }}
      className="w-[600px] rounded-lg"
    >
      {messages.map((msg, i) => (
        <div
          key={i}
          className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"} mb-2`}
        >
          <div
            className={`
              max-w-[75%] px-4 py-2 rounded-2xl shadow-sm
              ${msg.role === "user"
                ? "bg-green-200 text-right rounded-br-none"
                : "bg-slate-100 text-left rounded-bl-none"}
            `}
          >
            <b>{msg.role === "user" ? "👨‍🌾 You" : "🤖 Kisan Mitra"}:</b> {msg.content}
          </div>
        </div>
      ))}
    </div>

    {/* Input Area */}
    <div className="flex items-center w-full max-w border border-gray-300 rounded-full px-3 py-2 bg-white">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Ask your query..."
        className="flex-1 outline-none px-2 text-lg"
      />
      <button
        onClick={sendMessage}
        className="ml-2 p-2 bg-[#5A3C34] text-white rounded-full hover:bg-[#33221E] transition flex items-center justify-center"
      >
        <SendIcon fontSize="small" />
      </button>
    </div>
  </div>

  {/* Farmer image absolutely placed to the right */}
  <div className="fixed right-10 bottom-[-6px]">
    <Image 
      src="/images/farmer-talk.png"
      height={500}
      width={350}
      alt="farmer-talking"
    />
  </div>

  {/* Footer Bar */}
  <div className="bg-[#3F9148] fixed bottom-0 left-0 w-full h-4"></div>
</div>


  );
}
