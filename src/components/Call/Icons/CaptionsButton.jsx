import { useState, useEffect } from "react";
import { connect } from "react-redux";
import { TABS } from "../../../database/entities";
import recognition from "../../../utils/speech";

const CaptionsButton = ({ isOn, isMicOn, setIsOn, isSidebarOpen }) => {
  const [caption, setCaption] = useState("");

  useEffect(() => {
    if (recognition) {
      if (isOn && isMicOn) {
        try {
          recognition.start();
        } catch (_) {}
        recognition.onresult = (e) => {
          let predictedString = [];
          for (var i = e.resultIndex; i < e.results.length; ++i) {
            if (e.results[i][0].confidence > 0.3) {
              predictedString.push(e.results[i][0].transcript);
            }
          }
          setCaption(predictedString.join(" "));
        };
        recognition.nomatch = (_) => {};
        recognition.onerror = (e) => {
          if (
            e.error === "no-speech" ||
            e.error === "audio-capture" ||
            e.error === "network" ||
            e.error === "bad-grammar"
          ) {
            recognition.abort();
            try {
              recognition.start();
            } catch (_) {}
          }
        };
        recognition.onend = (_) => {
          setIsOn(false);
        };
      } else {
        recognition.stop();
      }
    } else {
      setCaption("Your Computer doesn't support Live Captions!");
    }

    return () => {
      recognition.abort();
    };
  }, [isOn, isMicOn]); // eslint-disable-line react-hooks/exhaustive-deps

  const toggleCaptions = (_) => {
    setIsOn(!isOn);
  };

  if (caption)
    setTimeout(() => {
      setCaption("");
    }, 5000);

  return (
    <>
      {isOn && caption && (
        <div
          className={
            "absolute select-none left-0 flex justify-center md:bottom-20 bottom-36" +
            (isSidebarOpen ? " md:w-4/6 w-full" : " w-full")
          }
        >
          <div className="bg-black px-3 py-2 rounded-md font-medium z-30 bg-opacity-60">
            {caption}
          </div>
        </div>
      )}
      <div
        title={"Captions " + (isOn ? "Off" : "On")}
        onClick={toggleCaptions}
        className={
          "h-8 w-8 rounded-full cursor-pointer flex items-center justify-center mx-1 " +
          (isOn
            ? " bg-yellow-600 hover:bg-yellow-500"
            : " bg-gray-700 hover:bg-gray-800")
        }
      >
        <i className="google-material-icons" style={{ fontSize: "16px" }}>
          closed_caption
        </i>
      </div>
    </>
  );
};

const mapStateToProps = ({ call }) => ({
  isOn: call.isCaptionEnabled,
  isMicOn: call.isMicOn,
  isSidebarOpen: call.isSidebarOpen !== TABS.NO_SIDEBAR,
});

const mapDispatchToProps = (dispatch) => ({});
export default connect(mapStateToProps, mapDispatchToProps)(CaptionsButton);
