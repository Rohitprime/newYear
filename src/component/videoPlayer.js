import ReactPlayer from "react-player";
const VideoPlayer = ({ url }) => {
  return (
    <div className="w-screen h-screen absolute bg-[#000019]">
      <ReactPlayer
        url={url}
        playing={true}
        loop={true}
        height="100%"
        width="100%"
      />
    </div>
  );
};

export default VideoPlayer;
