import React, { useState } from "react";
import axios from "../axios";
import { toast } from "react-toastify";
import { Clipboard, Check, Moon, Sun } from "lucide-react";

function AIChat() {
  const [prompt, setPrompt] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState(null);
  const [darkMode, setDarkMode] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    setMessages((prev) => [...prev, { sender: "You", text: prompt }]);
    setPrompt("");
    setLoading(true);

    try {
      const result = await axios.post("/users/generate-response", { prompt });
      setMessages((prev) => [
        ...prev,
        { sender: "AI", text: result.data.message },
      ]);
    } catch (error) {
      console.error("API Error:", error);
      toast.error(
        error.response?.data?.message || "An unexpected error occurred."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = (text, index) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    toast.success("Copied to clipboard!");

    setTimeout(() => setCopiedIndex(null), 1500);
  };

  return (
    <div
      className={`flex flex-col items-center justify-center min-h-screen ${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"
      } p-4`}
    >
      <div
        className={`p-6 border rounded-lg shadow-md w-full max-w-xl md:max-w-3/4 lg:max-w-3/4 xl:max-w-3/4 ${
          darkMode ? "bg-gray-800" : "bg-white"
        }`}
      >
        <div className="flex justify-between">
          <h1 className="text-2xl font-semibold mb-4 text-blue-500 ">FMC AI Chat</h1>

          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`flex items-center gap-2 px-3 py-1 rounded-md transition 
${darkMode ? "bg-gray-700 hover:bg-gray-600" : "bg-white hover:bg-gray-200"}`}
          >
            {darkMode ? (
              <Sun className="w-5 h-5 text-yellow-200" />
            ) : (
              <Moon className="w-5 h-5 text-gray-800" />
            )}
            {darkMode ? "Light Mode" : "Dark Mode"}
          </button>
        </div>

        <div
          className={`h-80 overflow-y-auto border p-3 rounded-md mt-4 ${
            darkMode
              ? "bg-gray-700 border-gray-600 "
              : "bg-gray-50 border-gray-300 "
          }`}
        >
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`relative p-2 my-2 rounded-md max-w-xs ${
                msg.sender === "You"
                  ? "bg-blue-500 text-white self-end ml-auto"
                  : "bg-gray-200 text-gray-800"
              }`}
            >
              {msg.sender === "AI" && (
                <button
                  onClick={() => handleCopy(msg.text, index)}
                  className="absolute top-1 right-1 p-1 text-gray-600 dark:text-gray-600 hover:text-blue-500 transition"
                >
                  {copiedIndex === index ? (
                    <Check size={16} />
                  ) : (
                    <Clipboard size={16} />
                  )}
                </button>
              )}

              <div className="whitespace-pre-line">
                <strong>{msg.sender}:</strong>
                {msg.text.split("\n").map((line, i) => (
                  <p key={i}>{line}</p>
                ))}
              </div>
            </div>
          ))}
          {loading && (
            <div className="animate-pulse p-2 my-2 rounded-md bg-gray-200 text-gray-800 max-w-xs">
              Generating response...
            </div>
          )}
        </div>

        <form onSubmit={handleSubmit} className="flex mt-4 space-x-2">
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Type a message..."
            className={`flex-1 p-3 border rounded-md focus:outline-none focus:ring-2 ${
              darkMode
                ? "border-gray-600 bg-gray-700 text-white focus:ring-blue-400"
                : "border-gray-300 focus:ring-blue-500"
            }`}
          />
          <button
            type="submit"
            className={`p-3 rounded-md transition ${
              darkMode
                ? "bg-blue-600 hover:bg-blue-700 text-white"
                : "bg-blue-500 hover:bg-blue-600 text-white"
            }`}
            disabled={loading}
          >
            {loading ? "..." : "Send"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AIChat;
