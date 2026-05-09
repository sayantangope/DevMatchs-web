import React, { useEffect, useRef, useState } from "react";
import { createSocketConnection } from "../utils/socket";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../constants/constants";

const Chat = () => {
  const { targetId } = useParams();

  const user = useSelector((store) => store.user);
  const userId = user?._id;
  const firstName = user?.firstName;
  const profileUrl = user?.profileUrl;

  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");



  useEffect(() => {
    if (!userId || !targetId) return;

    const fetchChatMessages = async () => {
      try {
        const res = await axios.get(BASE_URL + "/chat/" + targetId, {
          withCredentials: true,
        });

        const chatMessages = res?.data?.messages?.map((msg) => ({
          id: msg._id,
          from: msg.senderId?._id?.toString() === userId ? "me" : "other",
          name: msg.senderId?.firstName,
          text: msg.text,
          avatar: msg.senderId?.profileUrl,
          time: new Date(msg.createdAt).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        }));

        setMessages(chatMessages || []);
      } catch (error) {
        console.error("Failed to load chat history:", error.message);
      }
    };

    fetchChatMessages();
  }, );

  useEffect(() => {
    if (!userId || !targetId) return;

    const socket = createSocketConnection();

    socket.emit("joinChat", {
      firstName,
      userId,
      targetId,
    });

    socket.on("messageReceived", ({ firstName, message, profileUrl }) => {
      const now = new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });

      setMessages((prev) => [
        ...prev,
        {
          id: Date.now(),
          from: firstName === user?.firstName ? "me" : "other",
          name: firstName,
          text: message,
          time: now,
          avatar: profileUrl,
        },
      ]);
    });

    const sendMessage = (messageText) => {
      socket.emit("sendMessage", {
        firstName,
        userId,
        targetId,
        message: messageText,
        profileUrl,
      });
    };

    window.sendSocketMessage = sendMessage;

    return () => {
      socket.disconnect();
      delete window.sendSocketMessage;
    };
  }, [firstName, userId, targetId, user?.firstName, profileUrl]);



  const send = () => {
    if (!input.trim()) return;

    const messageText = input.trim();

    window.sendSocketMessage?.(messageText);

    setInput("");
  };

  return (
    <div className="flex flex-col h-[calc(100vh-64px)] max-w-2xl mx-auto">
      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`chat ${msg.from === "me" ? "chat-end" : "chat-start"}`}
          >
            <div className="chat-image avatar">
              <div className="w-10 rounded-full">
                <img alt={msg.name} src={msg.avatar} />
              </div>
            </div>

            <div className="chat-header">
              {msg.name}
              <time className="text-xs opacity-50 ml-1">{msg.time}</time>
            </div>

            <div className="chat-bubble">{msg.text}</div>

            <div className="chat-footer opacity-50 text-xs">
              {msg.from === "me" ? "Seen" : "Delivered"}
            </div>
          </div>
        ))}

      </div>

      <div className="p-4 border-t border-base-300 bg-base-200 flex gap-3">
        <input
          type="text"
          className="input input-bordered flex-1"
          placeholder="Type a message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && send()}
        />

        <button className="btn btn-primary" onClick={send}>
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;