import React, { useEffect, useState, useRef } from "react";
import { getDocs, collection, deleteDoc, doc } from "firebase/firestore";
import { auth, db } from "../../../firebase-config";
import { Modal, Button, RouteModal } from "react-bootstrap";
import Iframe from "react-iframe";
import "./Games.css";
import GameModal from "./GameModal";

const Games = () => {
  const [gameList, setGameList] = useState([]);
  const postsCollectionRef = collection(db, "games");
  const myRef = useRef();

  useEffect(() => {
    const getVideo = async () => {
      const data = await getDocs(postsCollectionRef);
      setGameList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getVideo();
  }, []);

  return (
    <div className="game-container">
      <div className="game-height">
        {gameList.map((gam) => {
          return (
            <div className="games">
              <div className="game">
                <img src={gam.gameImage} id="game-thumb" />
                <div className="game-gridso">
                  <h2 id="game-title">{gam.gameTitle}</h2>
                  <div className="flexo">
                    <img src={gam.photoURL} id="music-img" />
                    <p id="music-name">{gam.name}</p>
                    <GameModal
                      gameTitle={gam.gameTitle}
                      gameEmbed={gam.gameEmbed}
                    />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Games;
