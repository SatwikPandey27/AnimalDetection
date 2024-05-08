/* global roboflow */
import React, { useState, useEffect, useRef } from "react";

export default function ImageCapture(props) {
  const [data, setData] = useState([]);
  const [isCapturing, setIsCapturing] = useState(false);
  const [play, setPlay] = useState(false);
  const videoRef = useRef();
  const intervalRef = useRef(null);
  const audioRef = useRef(new Audio("/deathnote-sound.mpeg"));
  const [threshold, setThreshold] = useState("0.5");

  useEffect(() => {
    async function getModel() {
      console.log("Fetching model...");
      var model = await roboflow
        .auth({
          publishable_key:
            "rf_OIlstLKOu2ZL5h5XUhaWfKrzMhl1"})
        .load({
          model: "farm-animal-detection-ezvtk",
          version: 2,
        });
      model.configure({
        threshold,
        overlap: 0.5,
        max_objects: 1,
      });
      return model;
    }

    console.log("Initializing model...");
    getModel().then((model) => {
      console.log("Model initialized.");
      intervalRef.current = setInterval(() => {
        if (isCapturing) {
          model.detect(videoRef.current).then(function (predictions) {
            console.log("Predictions:", predictions);
            if (predictions.length > 0) {
              console.log("playing sound");
              setPlay(true);
            } else {
              console.log("stopping sound");
              setPlay(false);
            }
            setData(predictions);
          });
        }
      }, 2000);
    });

    return () => {
      clearInterval(intervalRef.current);
    };
  }, [isCapturing, threshold]);

  const handleCaptureClick = async () => {
    if (!videoRef.current) return;

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
      });
      videoRef.current.srcObject = stream;
      videoRef.current.onloadeddata = ()=>{
        videoRef.current.play();
        setIsCapturing(true);
      }
    } catch (error) {
      console.error("Error accessing camera:", error);
    }
  };

  const stopCapture = () => {
    if (videoRef.current) {
      const stream = videoRef.current.srcObject;
      if (stream) {
        const tracks = stream.getTracks();
        tracks.forEach((track) => track.stop());
        videoRef.current.srcObject = null;
        setIsCapturing(false);
        clearInterval(intervalRef.current); // Stop the prediction interval
      }
    }
  };

  useEffect(() => {
    if (play) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }, [play]);

  return (
    <div className="container my-3 mt-4">
      <h1>Capturing Video Data</h1>
      <div className="container my-3">
        <div style={{display: "flex"}}>
        <div
          style={{
            width: "800px",
            height: "350px",
            border: "3px solid",
            boxShadow: "5px 5px 8px rgba(0, 0, 0, 2)",
            borderRadius: "8px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor:"whitesmoke"
          }}
        >
          <video
            ref={videoRef}
            id="abc"
            style={{
              width: "100%",
              height: "347px",
              objectFit: "cover",
              borderRadius: "6px",
              display: isCapturing ? "flex" : "none",
            }}
          />
          {isCapturing ? (
            console.log("working!")
          ) : (
            <p
            style={{
              fontSize: "22px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              color: "black"
            }}>Click on Start Capture to begin !</p>
          )}
        </div>
        <div>
          <h2 className="mx-5">Prediction Data</h2>
          <div className="flex"
          style={{
            height: "300px",
            width: "320px",
            border:"2px solid",
            borderRadius: "8px",
            marginLeft: "50px",
            backgroundColor: "whitesmoke",
            color: "black"
          }}>
            {isCapturing ? (
              <pre className="mx-3 my-3">{JSON.stringify(data, null, 2)}</pre>
            ) : (
              <p
              style={{
                fontSize: "18px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginTop: "10px",
                color: 'black'
              }}>No prediction data available :(</p>
          )}
          </div>
        </div>
        </div>
        <button
          type="button"
          onClick={() => {
            handleCaptureClick();
          }}
          className={`btn btn-${
            props.mode === "light" ? "dark" : "light"
          } my-3`}
          disabled={isCapturing}
        >
          Start Capture
        </button>
        <button
          type="button"
          onClick={() => {
            stopCapture(); // Call stopCapture function to stop the video capture
          }}
          className={`btn btn-${
            props.mode === "light" ? "dark" : "light"
          } my-3 mx-2`}
          disabled={!isCapturing}
        >
          Stop Capture
        </button>
        <br />
        <div className="w-25">
          <label htmlFor="customRange3" className="form-label">Set Threshold</label>
          <input onChange={(e)=>{setThreshold(e.target.value)}} type="range" className="form-range" min="0" max="1" step="0.05" value={threshold} id="customRange3"/>
          {console.log(threshold)}
        </div>
      </div>
    </div>
  );
}
