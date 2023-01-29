import React, { useState } from "react";
import styled from "styled-components";
import EmojiPicker from "emoji-picker-react";
import { IoMdSend } from "react-icons/io";
import { BsEmojiSmileFill } from "react-icons/bs";
import Colors from "../assets/Colors.js";

export default function ChatInput({ hendleSendMessage }) {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [message, setMessage] = useState("");

  const handleEmojiPicker = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };

  const handleEmojiClick = (event, emoji) => {
    let msg = message;
    msg += emoji.emoji;
    setMessage(msg);
    setShowEmojiPicker(!showEmojiPicker);
  };

  const sendChat = (event) => {
    event.preventDefault();
    if (message.length > 0) {
      hendleSendMessage(message);
      setMessage("");
    }
  };

  return (
    <Container>
      <div className="button-container">
        <div className="emoji">
          <BsEmojiSmileFill onClick={handleEmojiPicker} />
          {showEmojiPicker && (
            <EmojiPicker
              onEmojiClick={(emoji, event) => handleEmojiClick(event, emoji)}
              theme="dark"
              emojiStyle="google"
              lazyLoadEmojis="true"
            />
          )}
        </div>
      </div>
      <form className="input-container" onSubmit={(event) => sendChat(event)}>
        <input
          type="text"
          placeholder="Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button className="submit">
          <IoMdSend />
        </button>
      </form>
    </Container>
  );
}

const Container = styled.div`
  display: grid;
  grid-template-columns: 5% 95%;
  align-items: center;
  background-color: ${Colors.contactBg};
  padding: 0 2rem;
  padding-bottom: 0.3rem;
  @media screen and (min-width: 720) and (max-width: 1080) {
    padding: 0 1rem;
    gap: 1rem;
  }
  .button-container {
    padding-top: 0.3rem;
    display: flex;
    align-items: center;
    color: white;
    gap: 1rem;
    .emoji {
      position: relative;
      svg {
        font-size: 1.5rem;
        color: ${Colors.emojiSVGColor};
        cursor: pointer;
      }
      .EmojiPickerReact {
        .epr-body {
          &::-webkit-scrollbar {
            background-color: ${Colors.emojiPickerScroll};
            width: 5px;
            &-thumb {
              background-color: ${Colors.emojiPickerBorder};
              border-radius: 2rem;
            }
          }
        }
        position: absolute;
        top: -475px;
        background-color: ${Colors.emojiPickerBg};
        box-shadow: 0 5px 10px ${Colors.emojiPickerShadow};
        border-color: ${Colors.emojiPickerBorder};
        .epr-search {
          background-color: transparent;
          border-color: ${Colors.emojiPickerBorder};
        }
        .epr-emoji-category-label {
          background-color: ${Colors.emojiPickerGroupBg};
        }
      }
    }
  }
  .input-container {
    width: 100%;
    border-radius: 2rem;
    display: flex;
    align-items: center;
    gap: 2rem;
    background-color: ${Colors.messageInputBg};
    input {
      width: 90%;
      /* height: 60%; */
      background-color: transparent;
      color: white;
      font-weight: 100;
      border: none;
      padding-left: 1rem;
      font-size: 1rem;
      &::selection {
        background-color: ${Colors.selectedContactBg};
      }
      &:focus {
        outline: none;
      }
    }
    button {
      padding: 0.3rem 2rem;
      border-radius: 2rem;
      display: flex;
      justify-content: center;
      align-items: center;
      border: none;
      background-color: ${Colors.sendButtonColor};
      @media screen and (min-width: 720) and (max-width: 1080) {
        padding: 0.3rem 1rem;
        svg {
          font-size: 1rem;
        }
      }
      svg {
        font-size: 2rem;
        color: white;
      }
    }
  }
`;
