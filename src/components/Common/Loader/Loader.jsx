import "./Loader.css";

function Loader({
  size = "40px",
  text = "Loading...",
  fullScreen = false,
}) {
  return (
    <div
      className={`loader-wrapper ${
        fullScreen ? "fullscreen" : ""
      }`}
    >
      <div
        className="loader-spinner"
        style={{
          width: size,
          height: size,
        }}
      ></div>

      {text && (
        <p className="loader-text">
          {text}
        </p>
      )}
    </div>
  );
}

export default Loader;