import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Colors from "../assets/Colors";
import { getMessageRoute, sendMessageRoute } from "../utils/ApiRoutes";
import ChatInput from "./ChatInput";
import { v4 as uuidv4 } from "uuid";
import Logout from "./Logout";

export default function ChatContainer({ currentChat, currentUser, socket }) {
  const [currentUserName, setCurrentUserName] = useState(undefined);
  const [currentUserImage, setCurrentUserImage] = useState(undefined);
  const [messages, setMessages] = useState([]);
  const [arrivalMessage, setArivalMessage] = useState(null);

  const scrollRef = useRef();

  useEffect(() => {
    async function fetchChat() {
      const res = await axios.post(getMessageRoute, {
        from: currentUser._id,
        to: currentChat._id,
      });

      setMessages(res.data.messages);
    }

    if (currentChat) {
      setCurrentUserName(currentChat.username);
      setCurrentUserImage(currentChat.avatar);
      fetchChat();
    }
  }, [currentChat]);

  const hendleSendMessage = async (message) => {
    await axios.post(sendMessageRoute, {
      from: currentUser._id,
      to: currentChat._id,
      message: message,
    });

    socket.current.emit("send-msg", {
      to: currentChat._id,
      from: currentUser._id,
      message: message,
    });

    const msgs = [...messages];
    msgs.push({ fromSelf: true, message: message });
    setMessages(msgs);
  };

  useEffect(() => {
    if (socket.current) {
      socket.current.on("msg-recieve", (message) => {
        setArivalMessage({ fromSelf: false, message: message });
      });
    }
  }, []);

  useEffect(() => {
    arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behaviour: "smooth" });
  }, [messages]);

  return (
    <Container>
      <div className="chat-header">
        <div className="user-details">
          <div
            className={`avatar ${currentUserImage === "" ? "no_avatar" : ""}`}
          >
            <img
              src={`data:image/svg+xml;base64,${currentUserImage}`}
              alt="avatar"
            />
          </div>
          <div className="username">
            <h3>{currentUserName}</h3>
          </div>
        </div>
        <Logout />
      </div>
      <div className="chat-messages">
        {messages.map((message) => {
          return (
            <div ref={scrollRef} key={uuidv4()}>
              <div
                className={`message ${
                  message.fromSelf ? "sended" : "recieved"
                }`}
              >
                <div className="content">
                  <p>{message.message}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <ChatInput hendleSendMessage={hendleSendMessage} />
    </Container>
  );
}

const Container = styled.div`
  padding-top: 1rem;
  display: grid;
  grid-template-rows: 10% 78% 12%;
  gap: 0.1rem;
  overflow: hidden;
  @media screen and (min-width: 720) and (max-width: 1080) {
    grid-template-rows: 15% 70% 15%;
  }
  .chat-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 2rem;
    .user-details {
      display: flex;
      align-items: center;
      gap: 1rem;
      .avatar {
        img {
          height: 3rem;
        }
      }
      .no_avatar {
        display: none;
      }
      .username {
        h3 {
          color: white;
        }
      }
    }
  }
  .chat-messages {
    padding: 1rem 2rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    overflow: auto;
    &::-webkit-scrollbar {
      width: 0.2rem;
      &-thumb {
        background-color: ${Colors.scrollColor};
        width: 0.1rem;
        border-radius: 1rem;
      }
    }
    .message {
      display: flex;
      align-items: center;
      .content {
        max-width: 40%;
        overflow-wrap: break-word;
        padding: 1rem;
        font-size: 1.1rem;
        border-radius: 1rem;
        color: ${Colors.messageContentColor};
      }
    }
    .sended {
      justify-content: flex-end;
      .content {
        background-color: ${Colors.messageContentSendBGColor};
      }
    }
    .recieved {
      justify-content: flex-start;
      .content {
        background-color: ${Colors.messageContentRecievedBGColor};
      }
    }
  }
`;
