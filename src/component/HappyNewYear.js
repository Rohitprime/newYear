import { createPortal } from "react-dom";
import { useState } from "react";
import { WhatsappShareButton, WhatsappIcon } from "react-share";
import VideoPlayer from "./videoPlayer.js";
import funForUsers from "../file/funForUsers.js";

const HappyNewYear = ({ name }) => {
  const [videoChange, setVideoChange] = useState(false);
  const [send, setSend] = useState(false);
  const [currentName, setCurrentName] = useState("");
  const [password, setPassword] = useState("");
  const [wt, setWt] = useState(false);
  const [advance, setAdvance] = useState(false);

  setTimeout(() => {
    let year = new Date().getFullYear();
    if (year < 2024) {
      setAdvance(true);
      console.log(advance);
    }
    setVideoChange(true);
  }, 8000);

  const passwordHandler = (e) => {
    setPassword(e.target.value);
  };

  const nameHandler = (e) => {
    setCurrentName(e.target.value);
  };

  const sendHandler = () => {
    setSend(true);
  };

  const closeHandler = () => {
    setSend(false);
  };

  const clickHandler = async () => {
    if (currentName == "") {
      alert("कृपया अपना नाम लिखें");
      return;
    } else if (password == "") {
      alert("कृपया अपना पासवर्ड लिखें");
      return;
    }

    funForUsers().then(async (users) => {
      let i = 0;
      for (i = 0; i < users.length; ++i) {
        if (users[i].password == password) {
          alert(
            "ये पासवर्ड पहले ही इस्तेमाल हो चुका है. कोई दूसरा पासवर्ड बनाये"
          );
          return;
        } else if (i == users.length - 1) {
          setWt(true);
          const res = await fetch(
            "https://new-year-eb216-default-rtdb.firebaseio.com/userArray.json",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                name: currentName,
                password,
              }),
            }
          );
        }
      }
    });
  };

  return createPortal(
    <div className="z-50 bg-blue-200 w-screen h-screen">
      {/* countdown video */}
      {!videoChange ? (
        <VideoPlayer
          url={
            "https://res.cloudinary.com/diszakm5s/video/upload/v1703922653/experiments/nxck8ytataqxkesqt5y5.mp4"
          }
        />
      ) : (
        //  happy new years video
        <VideoPlayer
          url={
            "https://res.cloudinary.com/diszakm5s/video/upload/v1703995873/experiments/o58i0dteu4f601xqyrsr.mp4"
          }
        />
      )}
      {send && (
        <div
          className=" flex flex-col items-center justify-center gap-3 w-2/4 h-2/4 bg-[#000019] absolute
        bottom-0 w-full z-20"
        >
          <div className="text-white text-center border-b-4 p-2">
            <p>अपना नाम और लिखे</p>
            <p>और पासवर्ड लिखे</p>
            {wt && <p>अब What's up के निसान को दबा कर के शेयर करें</p>}
          </div>
          <label htmlFor="name" className="text-white font-bold">
            यहाँ अपना नाम लिखे
          </label>
          <input
            id="name"
            type="text"
            className="w-9/12 h-8 rounded-xl text-center"
            onChange={nameHandler}
          />
          <label htmlFor="pass" className="text-white font-bold text-center">
            यहाँ पासवर्ड लिखे
          </label>
          <input
            id="pass"
            type="password"
            className="w-7/12 h-8 rounded-xl text-center"
            onChange={passwordHandler}
          />
          <button
            onClick={clickHandler}
            className="bg-green-500 rounded-xl h-8 w-3/12 hover text-white"
          >
            Submit
          </button>
          {wt && (
            <WhatsappShareButton
              url={"https://9flk5z.csb.app/"}
              title={`${currentName} ne aapke liye kuch bejha hai,password =(${password}) 👉👉 `}
              hashtag={"#portfolio..."}
            >
              <WhatsappIcon size={40} round={true} />
            </WhatsappShareButton>
          )}
          <button
            onClick={closeHandler}
            className="absolute bg-rose-900 w-20 h-20 end-0 top-0 flex items-center justify-center text-white font-bold
           text-2xl rounded-full"
          >
            X
          </button>
        </div>
      )}
      <button
        onClick={sendHandler}
        className="absolute z-10 w-screen h-20 md:bottom-16 opacity-50 bottom-28  flex justify-center text-white font-bold"
      ></button>

      <div className="absolute w-screen h-18 top-3 bg-ros flex justify-center">
        {advance && (
          <h1
            className="absolute  w-full h-24 top-44 md:top-40 text-white text-center flex items-end justify-center font-bold text-6xl f
        font-serif animate-pulse"
          >
            In Advance
          </h1>
        )}
        {videoChange && (
          <img
            src={
              "https://res.cloudinary.com/diszakm5s/image/upload/v1704003445/experiments/mt7bi938vhh0hxp9bm3r.png"
            }
            className="absolute md:top-2 top-16"
          />
        )}
        <h1 className="text-gray-900 font-bold text-4xl md:text-5xl absolute top-20 md:top-4 ">
          {videoChange && currentName == "" && name}
          {currentName}
        </h1>
      </div>
    </div>,
    document.getElementById("prime")
  );
};

export default HappyNewYear;
