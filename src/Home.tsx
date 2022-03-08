import { faLink, faPause, faPlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AnimatePresence, motion } from "framer-motion";
import React, { useContext, useRef } from "react";
import { useState } from "react";
import { useEffect } from "react";
import SpotifyPlayer from "./SpotifyPlayer";
import "./Home.css";
import Header from "./Header";
import { ThemeContext } from "./ThemeContext";
import useIsMobile from "./useIsMobile";
import Modal from "./Modal";
//@ts-ignore
import notification from "./assets/notification.mp3";

export const useIsMount = () => {
  const isMountRef = useRef(true);
  useEffect(() => {
    isMountRef.current = false;
  }, []);
  return isMountRef.current;
};
export default function Home() {
  const isMobile = useIsMobile();

  const themeContext = useContext(ThemeContext);
  const {
    primaryColor,
    secondaryColor,
    textColor,
    timerColor,
  } = themeContext.theme;
  useEffect(() => {
    //@ts-ignore
    document.body.style = `overflow-x:hidden; background:${secondaryColor};`;
  });
  const [play, setPlay] = useState(false);
  const [intervalTimer, setIntervalTimer] = useState<number | null>(0);
  const [timer, setTimer] = useState(0);
  const [timerDuration, setTimerDuration] = useState(20 * 60);
  const [finished, setFinished] = useState(false);
  const [timerbreak, setTimerBreak] = useState(false);
  const [breakDuration, setBreakDuration] = useState(20 * 15);
  const [prevTimerDuration, setPrevTimerDuration] = useState(0);
  const isMounted = useIsMount();
  const [openModal, setOpenModal] = useState(false);
  const audioPlayer = useRef<HTMLAudioElement>(null);
  const linkRef = useRef<HTMLInputElement>(null);
  const [linkError, setLinkError] = useState(false);

  const [playlist, setPlaylist] = useState(
    "https://open.spotify.com/playlist/37i9dQZF1DWWQRwui0ExPn?si=6392ad03984340b1"
  );

  const setPlayPause = () => {
    setPlay((prev) => !prev);
  };
  useEffect(() => {
    if (isMounted) {
      setPrevTimerDuration(timerDuration);
    }
  }, []);
  useEffect(() => {
    if (play) {
      const interval: number = (setInterval(() => {
        console.log("updating");
        setTimer((prev) => prev + 1);
      }, 1000) as unknown as number);
      setIntervalTimer(interval);
    } else {
      if (intervalTimer)
        clearInterval(intervalTimer);
      setIntervalTimer(null);
    }
  }, [play]);
  useEffect(() => {
    if (timer >= timerDuration) {
      if (audioPlayer.current) {
        audioPlayer.current.play();
        audioPlayer.current.volume = 0.5;
      }
      if (intervalTimer)
        clearInterval(intervalTimer);

      setPlay((prev) => !prev);
      setFinished(true);
      setTimer(0);
      setTimeout(() => {
        setFinished(false);
      }, 4000);
      setTimerBreak((prev) => !prev);

      setTimerDuration(breakDuration);

      setTimeout(() => {
        setPlay((prev) => true);
      }, 1000);
    }
    if (timer >= timerDuration && timerbreak) {
    }
  }, [timer]);
  useEffect(() => {
    if (!isMounted) {
      if (!timerbreak) {
        setTimerDuration(prevTimerDuration);
      }
    }
  }, [timerbreak]);
  return (
    <div>
      <Modal
        title={"Paste the spotify link"}
        handleClose={() => {
          setOpenModal((prev) => !prev);
          if (linkRef.current) {
            if (
              !linkRef.current.value.includes("spotify") ||
              !linkRef.current.value.includes("https")
            ) {
              setLinkError(true);
            } else {
              setLinkError(false);
              setPlaylist(linkRef.current.value);
            }
          }
        }}
        open={openModal}
        theme={themeContext.theme}
      >
        <input
          style={{
            color: "black",
          }}
          ref={linkRef}
          defaultValue="Link"
          placeholder="Link"
          className={`input ${linkError ? "is-danger" : ""}`}
        />
        {linkError && <div> Invalid link! </div>}
      </Modal>
      <div style={{ height: "100vh", overflow: "-moz-hidden-unscrollable" }}>
        <Header></Header>
        <div
          style={{
            width: "100%",
            textAlign: "center",
            color: textColor,
          }}
          className="is-size-6-mobile is-size-4-desktop pb-6"
        >
          {" "}
          A Pomodoro timer to study/work to{" "}
        </div>
        <div
          style={{ position: "relative" }}
          className="is-flex is-flex-direction-column is-align-content-center container is-fluid p-0"
        >
          <audio src={notification} datatype="audio/mpeg" ref={audioPlayer}></audio>{" "}
          <div
            className="timer center"
            style={{
              display: "inline-block",
              position: "relative",
              width: "19vmax",
              height: "19vmax",
              background: primaryColor,
            }}
          >
            <svg
              style={{
                width: "19vmax",
                height: "19vmax",
                position: "absolute",
                top: "-10",
                left: "-10",
              }}
              className="center"
              viewBox="0 0 36 36"
            >

              <linearGradient gradientTransform="rotate(45)" id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="10%" stop-color="#2AFADF" />
                <stop offset="100%" stop-color="#4C83FF" />
              </linearGradient>
              <motion.path
                initial={{ pathLength: 0 }}
                animate={{
                  pathLength: isFinite(timer / timerDuration)
                    ? timer / timerDuration
                    : 0,
                }}
                transition={{
                  duration: 2,
                }}

                d="M18 2.0845
      a 15.9155 15.9155 0 0 1 0 31.831
      a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="url(#gradient)"
                strokeWidth="2"
              />
            </svg>
            <div
              className="center is-size-4"
              style={{
                height: "100%",
                textAlign: "center",
                marginTop: "40%",
                color: "white",
              }}
            >
              {`${Math.floor(timer / 60) < 9
                ? "0" + Math.floor(timer / 60)
                : Math.floor(timer / 60)
                }:${timer - Math.floor(timer / 60) * 60 < 9
                  ? "0" + (timer - Math.floor(timer / 60) * 60)
                  : timer - Math.floor(timer / 60) * 60
                }`}
              <br></br>
              {timerbreak ? "Break" : ""}
            </div>
          </div>
          <div style={{ paddingTop: "5vh" }}></div>
          <div
            style={{
              width: "min-content",
              gap: "15px",
              color: textColor,
            }}
            className="center is-flex is-flex-direction-row  is-justify-content-space-between"
          >
            <button
              onClick={setPlayPause}
              style={{
                background: primaryColor,
                color: textColor,
              }}
              className="button is-rounded"
            >
              <AnimatePresence>
                <motion.div

                  key={play.valueOf.toString()}
                  initial={{ rotateX: "-90" }}
                  animate={{ rotateX: "0" }}
                  exit={{ rotateX: "90" }}
                >
                  {play ? (
                    <FontAwesomeIcon icon={faPause}></FontAwesomeIcon>
                  ) : (
                    <FontAwesomeIcon icon={faPlay}></FontAwesomeIcon>
                  )}
                </motion.div>
              </AnimatePresence>
            </button>

            <span className="pt-1" style={{ float: "left" }}>
              <label style={{}}>
                <input
                  defaultValue={20}
                  readOnly={play}
                  onChange={(e) => {
                    setTimerDuration(Number(e.target.value) * 60);
                    setPrevTimerDuration(Number(e.target.value) * 60);
                  }}
                  id="break"
                  type="number"
                  style={{
                    background: primaryColor,
                    color: textColor,
                    width: "10vmin",
                  }}
                  className="input is-small"
                ></input>
                Timer duration (mins)
              </label>
            </span>
            <span className="pt-1" style={{ float: "left" }}>
              <label>
                <input
                  readOnly={play}
                  defaultValue={15}
                  id="break"
                  type="number"
                  style={{
                    background: primaryColor,
                    color: textColor,
                    width: "10vmin",
                  }}
                  className="input is-small"
                  placeholder="Small input"
                  value={5}
                  onChange={(e) => {
                    setBreakDuration(Number(e.target.value) * 60);
                  }}
                ></input>
                Break interval (mins)
              </label>
            </span>
          </div>
          <div
            style={{
              width: "100vw",
            }}
          >
            <button
              onClick={() => {
                setOpenModal(true);
              }}
              style={{
                display: "block",
                background: primaryColor,
                color: textColor,
                margin: "0 auto",
              }}
              className="button is-size-6-mobile is-rounded center"
            >
              {" "}
              Add your own playlist/song/album{" "}
            </button>
          </div>
        </div>
      </div>
      {finished && (
        <motion.div
          initial={{
            x: -300,
          }}
          exit={{
            x: -300,
          }}
          animate={{ x: 0 }}
          style={{
            position: "fixed",
            left: 30,
            color: textColor,
            bottom: "40vmin",
            width: "20vmax",
            background: primaryColor,
          }}
          className="notification"
        >
          <button
            onClick={() => {
              setFinished(false);
            }}
            className="delete"
          ></button>
          {timerbreak
            ? "Hooray! Looks like you finished.. Take a break!"
            : "Break's over! time to get back to work"}
        </motion.div>
      )}

      <div
        id="spotify-player"
        style={{
          display: timerbreak ? "none" : "block",
          position: "fixed",
          left: isMobile ? "50%" : "20%",
          bottom: "5%",

          transform: "translateX(-50%)",
        }}
      >
        <SpotifyPlayer playlist={playlist} />
      </div>
    </div>
  );
}
