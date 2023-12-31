import { useState, useEffect } from "react";
import HappyNewYear from "./component/HappyNewYear";
import funForUsers from "./file/funForUsers";

export default function App() {
  const [validPass, setValidPass] = useState(false);
  const [name, setName] = useState("");
  const [usersArray, setUsersArray] = useState([]);

  let pass = "";

  const clickHandler = () => {
    usersArray.map((user) => {
      if (user.password == pass) {
        setValidPass(true);
        setName(user.name);
      }
    });
  };

  const changeHandler = (e) => {
    pass = e.target.value;
  };

  useEffect(() => {
    const fun = async () => {
      const array = await funForUsers();
      setUsersArray(array);
    };
    fun();
  }, []);

  return (
    <div className="relative h-screen w-screen">
      <div
        className=" h-full w-full flex flex-col justify-center items-center
         absolute bg-voilet-100 z-10"
      >
        <div
          className=" w-2/4 h-2/4 flex flex-col
      items-center justify-center gap-2"
        >
          <div
            className="w-16 h-16 rounded-full animate-bounce
          "
          >
            <img
              src={
                "https://res.cloudinary.com/diszakm5s/image/upload/v1704003585/experiments/dtpmoezvkmujqgmpckjo.png"
              }
              alt="smile"
              className=""
            />
          </div>
          <label htmlFor="pass" className=" text-white font-bold text-2xl">
            पासवर्ड दर्ज करे
          </label>
          <input
            id="pass"
            onChange={changeHandler}
            type="password"
            className="bg-violet-900 rounded-xl h-8 md:h-10 w-full md:w-5/12 text-white text-center opacity-75"
          />
          <button
            onClick={clickHandler}
            className=" bg-white font-bold rounded-xl h-8 w-5/12 md:w-3/12 hover:scale-110 text-voilet-900"
          >
            Submit
          </button>
          {validPass && <HappyNewYear name={name} />}
        </div>
      </div>
      <div className="w-full h-full absolute bg-[#000019] flex justify-center">
        <img
          src={
            "https://res.cloudinary.com/diszakm5s/image/upload/v1703944189/experiments/bofus0ewaqjkmqvpayel.png"
          }
          alt=""
          className="brightness-200 md:w-4/12 h-10/12"
        />
      </div>
    </div>
  );
}
