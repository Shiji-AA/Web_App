
import { useState } from "react";
import {AxiosInstance} from "../../../api/AxiosInstance.jsx"
function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [chats, setChats] = useState([
    {
      role: "bot",
      text: "Hello! How can I help you today?",
    },
  ]);
  const [loading, setLoading] = useState(false);

  const sendMessage = async (e) => {
    e.preventDefault();

    const question = message.trim();
    if (!question || loading) return;

    setChats((prev) => [
      ...prev,
      { role: "user", text: question },
    ]);
    setMessage("");
    setLoading(true);

    try {
      const response = await AxiosInstance.post("/chat",{ message: question });

      setChats((prev) => [
        ...prev,
        { role: "bot", text: response.data.reply },
      ]);
    } catch (error) {
      console.error(error);

      setChats((prev) => [
        ...prev,
        {
          role: "bot",
          text: "Sorry, something went wrong.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-5 right-5 z-50">
      {isOpen && (
        <div className="w-80 h-96 bg-white shadow-2xl
                        rounded-xl flex flex-col
                        overflow-hidden mb-3 border">
          <div className="bg-blue-700 text-white
                          p-4 flex justify-between">
            <h2 className="font-bold">AI Assistant</h2>

            <button onClick={() => setIsOpen(false)}>
              ✕
            </button>
          </div>

          <div className="flex-1 p-3 overflow-y-auto
                          bg-gray-100">
            {chats.map((chat, index) => (
              <div
                key={index}
                className={`mb-3 flex ${
                  chat.role === "user"
                    ? "justify-end"
                    : "justify-start"
                }`}
              >
                <p
                  className={`p-3 rounded-lg text-sm
                              max-w-[85%] whitespace-pre-wrap ${
                    chat.role === "user"
                      ? "bg-blue-600 text-white"
                      : "bg-white text-black"
                  }`}
                >
                  {chat.text}
                </p>
              </div>
            ))}

            {loading && (
              <p className="text-gray-500 text-sm">
                AI is typing...
              </p>
            )}
          </div>

          <form
            onSubmit={sendMessage}
            className="flex p-3 border-t gap-2"
          >
            <input
              type="text"
              value={message}
              onChange={(e) =>
                setMessage(e.target.value)
              }
              placeholder="Ask anything..."
              className="flex-1 min-w-0 border
                         rounded-lg p-2 text-sm"
            />

            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 text-white
                         px-3 rounded-lg
                         disabled:opacity-50"
            >
              Send
            </button>
          </form>
        </div>
      )}

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-blue-700 text-white
                   p-4 rounded-full shadow-lg
                   hover:bg-blue-800"
      >
        {isOpen ? "✕" : "💬"}
      </button>
    </div>
  );
}

export default Chatbot;
