import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Colors from "../assets/Colors.js";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { allUserRoute } from "../utils/ApiRoutes.js";
import Contacts from "../components/Contacts.jsx";
import Welcome from "../components/Welcome.jsx";

function Chat() {
  const navigate = useNavigate();

  const [contacts, setContacts] = useState([]);
  const [currentUser, setCurrentUser] = useState(undefined);
  const [currentChat, setCurrentChat] = useState(undefined);

  useEffect(() => {
    async function checkLocalStorage() {
      if (!localStorage.getItem("chat-app-user")) {
        navigate("/login");
      } else {
        setCurrentUser(await JSON.parse(localStorage.getItem("chat-app-user")));
      }
    }

    checkLocalStorage();
  }, []);

  const handleCurrentChat = (chat) => {
    setCurrentChat(chat);
  };

  useEffect(() => {
    async function fetchContacts() {
      if (currentUser) {
        if (currentUser.isAvatarSet) {
          const data = await axios.get(`${allUserRoute}/${currentUser._id}`);
          setContacts(data.data.users);
        }
      } else {
        navigate("/setAvatar");
      }
    }

    setTimeout(() => {
      if (currentUser) {
        fetchContacts();
      }
    }, 3000);
    // fetchContacts();
  }, [currentUser]);

  return (
    <div>
      <Container>
        <div className="container">
          <Contacts
            contacts={contacts}
            currentUser={currentUser}
            onChatChange={handleCurrentChat}
          />
          <Welcome />
        </div>
      </Container>
    </div>
  );
}

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
  background-color: ${Colors.backgroundColor};
  .container {
    height: 85vh;
    width: 85vw;
    background-color: ${Colors.lightBgColor};
    display: grid;
    grid-template-columns: 25% 75%;
    @media screen and (min-width: 720) and (max-width: 1080) {
      grid-template-columns: 35% 65%;
    }

    @media screen and (min-width: 310) and (max-width: 450) {
      grid-template-columns: 20% 80%;
    }
  }
`;

export default Chat;
