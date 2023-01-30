import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Robot from "../assets/robot.gif";
import Colors from "../assets/Colors.js";

export default function Welcome({ currentUser }) {
  const [currentUserName, setCurrentUserName] = useState(undefined);

  useEffect(() => {
    if (currentUser) {
      setCurrentUserName(currentUser.username);
    }
  }, [currentUser]);

  return (
    <Container>
      <img src={Robot} alt="welcome robot" />
      <h1>
        Welcome, <span>{currentUserName}</span>
      </h1>
      <h3>Please select a contact to start.</h3>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  color: white;
  img {
    height: 20rem;
  }
  span {
    color: ${Colors.blue};
  }
`;
