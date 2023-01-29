import axios from "axios";
import React, { useState, useEffect } from "react";
import { json, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import styled from "styled-components";
import Colors from "../assets/Colors";
import loader from "../assets/loader.gif";
import { setAvatarRoute } from "../utils/ApiRoutes";
import { Buffer } from "buffer";

function SetAvatar() {
  const avatarApi = "https://api.multiavatar.com/45678945";
  const navigate = useNavigate();
  const [avtatrs, setAvatars] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedAvatar, setSelectedAvatar] = useState(undefined);

  const toastConfig = {
    position: "bottom-right",
    autoClose: 5000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  useEffect(() => {
    if (!localStorage.getItem("chat-app-user")) {
      navigate("/login");
    }
  }, []);

  async function setProfilePicture() {
    if (selectedAvatar === undefined) {
      toast.error("Please select an avatar.", toastConfig);
    } else {
      const user = await JSON.parse(localStorage.getItem("chat-app-user"));
      const { data } = await axios.post(`${setAvatarRoute}/${user._id}`, {
        image: avtatrs[selectedAvatar],
      });

      if (data.isSet) {
        user.isAvatarSet = true;
        user.avatar = data.image;
        localStorage.setItem("chat-app-user", JSON.stringify(user));
        navigate("/");
      } else {
        toast.error("Error setting avatar, Please try again.");
      }
    }
  }

  useEffect(() => {
    (async function fetchData() {
      const data = [];
      for (let i = 0; i < 4; i++) {
        const image = await axios.get(
          `${avatarApi}/${Math.round(
            Math.random() * 1000
          )}?apikey=I7SWgTqDRNEv91`
        );
        const buffer = new Buffer.from(image.data);
        data.push(buffer.toString("base64"));
      }
      setAvatars(data);
      setIsLoading(false);
    })();
  }, []);

  return (
    <div>
      {isLoading ? (
        <Container>
          <img className="loader" src={loader} alt="loader" />
        </Container>
      ) : (
        <Container>
          <div className="title-container">
            <h1>Pick a avatar that match you</h1>
          </div>
          <div className="avatars">
            {avtatrs.map((avtatr, index) => {
              return (
                <div
                  key={index}
                  className={`avatar ${
                    selectedAvatar === index ? "selected" : ""
                  }`}
                >
                  <img
                    src={`data:image/svg+xml;base64,${avtatr}`}
                    alt="avatar"
                    onClick={() => setSelectedAvatar(index)}
                  />
                </div>
              );
            })}
          </div>
          <button className="submit-btn" onClick={setProfilePicture}>
            Set as profile picture
          </button>
        </Container>
      )}
      <ToastContainer />
    </div>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 3rem;
  background-color: ${Colors.backgroundColor};
  height: 100vh;
  width: 100vw;
  .loader {
    max-inline-size: 100%;
  }

  .title-container {
    h1 {
      color: white;
    }
  }

  .avatars {
    display: flex;
    gap: 2rem;
    .avatar {
      border: 0.4rem solid transparent;
      padding: 0.4rem;
      border-radius: 5rem;
      display: flex;
      justify-content: center;
      align-items: center;
      transition: 0.5s ease-in-out;

      img {
        height: 6rem;
      }
    }
    .selected {
      border: 0.4rem solid ${Colors.blue};
    }
  }

  .submit-btn {
    background-color: ${Colors.buttonBgColor};
    color: white;
    padding: 1rem 2rem;
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.4rem;
    font-size: 1rem;
    text-transform: uppercas;
    transition: 0.5s ease-in-out;
    &:hover {
      background-color: ${Colors.onButtonHover};
    }
  }
`;

export default SetAvatar;
