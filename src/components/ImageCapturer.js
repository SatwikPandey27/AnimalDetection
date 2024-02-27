// /* global roboflow */
// import React, { useState, useEffect } from "react";
// // import roboflow from "roboflow";
// // import workspaceInfo from roboflow.getWorkflow(workspaceUrl, apiKey);
// // const workspaceInfo = roboflow.getWorkspace(workspaceUrl, apiKey);

// export default function ImageCapture(props) {
//   const [data, setData] = useState(null);
//   const [url, setUrl] = useState("");
//   const [show, setShow] = useState(false);

//   useEffect(() => {
//     async function getModel() {
//       console.log("abasjfhjsb");
//       var model = await roboflow
//         .auth({
//           publishable_key:
//             "rf_OIlstLKOu2ZL5h5XUhaWfKrzMhl1" ||
//             `${process.env.REACT_APP_API_KEY}`,
//         })
//         .load({
//           model: "farm-animal-detection-ezvtk",
//           version: 2,
//         });

//       return model;
//     }

//     console.log(process.env.REACT_APP_API_KEY);
//     var initialized_model = getModel();
//     console.log(initialized_model);
//     initialized_model.then(function (model) {
//       // use model.detect() to make a prediction (see "Getting Predictions" below)
//       // model.detect(imgURL).then(function (predictions) {
//       //   console.log("Predictions:", predictions);
//       // });

//       model.detect(document.getElementById("abc")).then(function (predictions) {
//         console.log("Predictions:", predictions);
//       });
//     });
//   }, []);

//   useEffect(() => {
//     const HandleCapClick = async () => {
//       // Get the real-time video data from the camera using API.
//       fetch(url)
//         .then((response) => {
//           if (!response.ok) {
//             throw new Error(`HTTP error! Status: ${response.status}`);
//           }
//           return response.json();
//         })
//         .then((json) => setData(json))
//         .catch((error) => console.error("Error fetching data:", error));
//     };
//     HandleCapClick();
//   }, [url]);

//   return (
//     <div className="container my-3 mt-4">
//       <img
//         id="abc"
//         src="./Nilgai_(Boselaphus_tragocamelus)_male.jpg"
//         alt="Input Image"
//         style={{ display: "none" }}
//       />
//       <h2>Capturing Video Data</h2>
//       <div className="container my-3">
//         <div
//           style={{
//             width: "800px",
//             height: "350px",
//             border: "2px solid",
//             boxShadow: "5px 5px 8px rgba(0, 0, 0, 2)",
//             borderRadius: "8px",
//           }}
//         >
//           {show && data ? (
//             <pre>{JSON.stringify(data, null, 2)}</pre>
//           ) : (
//             "Click on Start Capture to begin !"
//           )}
//         </div>
//         <button
//           type="button"
//           onClick={() => {
//             setUrl("https://detect.roboflow.com/farm-animal-detection-ezvtk/2");
//             setShow(true);
//           }}
//           className={`btn btn-${
//             props.mode === "light" ? "dark" : "light"
//           } my-3`}
//         >
//           Start Capture
//         </button>
//         <button
//           type="button"
//           onClick={() => {
//             setUrl("");
//             setShow(false);
//           }}
//           className={`btn btn-${
//             props.mode === "light" ? "dark" : "light"
//           } my-3 mx-2`}
//         >
//           Stop Capture
//         </button>
//       </div>
//     </div>
//   );
// }

/* global roboflow */
/* global roboflow */
/* global roboflow */
import React, { useState, useEffect, useRef } from "react";

export default function ImageCapture(props) {
  const [data, setData] = useState([]);
  const [url, setUrl] = useState("");
  const [show, setShow] = useState(false);
  const [isCapturing, setIsCapturing] = useState(false);
  const [play, setPlay] = useState(false);
  const videoRef = useRef(null);
  const intervalRef = useRef(null);
  const audioRef = useRef(new Audio("/deathnote-sound.mpeg"));

  useEffect(() => {
    async function getModel() {
      console.log("Fetching model...");
      var model = await roboflow
        .auth({
          publishable_key:
            "rf_OIlstLKOu2ZL5h5XUhaWfKrzMhl1" ||
            `${process.env.REACT_APP_API_KEY}`,
        })
        .load({
          model: "farm-animal-detection-ezvtk",
          version: 2,
        });
      model.configure({
        threshold: 0.5,
        overlap: 0.5,
        max_objects: 1,
      });
      return model;
    }

    console.log("Initializing model...");
    var initialized_model = getModel();

    initialized_model.then(function (model) {
      console.log("Model initialized.");
      intervalRef.current = setInterval(() => {
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
      }, 1000);
    });

    return () => {
      clearInterval(intervalRef.current);
    };
  }, []);

  const handleCaptureClick = async () => {
    if (!videoRef.current) return;

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
      });
      videoRef.current.srcObject = stream;
      videoRef.current.play();
      setIsCapturing(true);
    } catch (error) {
      console.error("Error accessing camera:", error);
    }
  };

  useEffect(() => {
    handleCaptureClick();

    // Cleanup function to stop the video stream when component unmounts
    return () => {
      if (videoRef.current) {
        const stream = videoRef.current.srcObject;
        if (stream) {
          const tracks = stream.getTracks();
          tracks.forEach((track) => track.stop());
        }
      }
    };
  }, []);

  const audio = new Audio("/deathnote-sound.mpeg");
  useEffect(() => {
    if (play) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }, [play]);

  const stopCapture = () => {
    if (videoRef.current && isCapturing) {
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

  return (
    <div className="container my-3 mt-4">
      <video
        ref={videoRef}
        id="abc"
        style={{ width: "100%", height: "auto" }}
      />
      <h2>Capturing Video Data</h2>
      <div className="container my-3">
        <div
          style={{
            width: "800px",
            height: "350px",
            border: "2px solid",
            boxShadow: "5px 5px 8px rgba(0, 0, 0, 2)",
            borderRadius: "8px",
          }}
        >
          {show && data.length > 0 ? (
            <pre>{JSON.stringify(data, null, 2)}</pre>
          ) : (
            "Click on Start Capture to begin !"
          )}
        </div>
        <button
          type="button"
          onClick={() => {
            setUrl("https://detect.roboflow.com/farm-animal-detection-ezvtk/2");
            setShow(true);
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
            setUrl("");
            setShow(false);
            stopCapture(); // Call stopCapture function to stop the video capture
          }}
          className={`btn btn-${
            props.mode === "light" ? "dark" : "light"
          } my-3 mx-2`}
          disabled={!isCapturing}
        >
          Stop Capture
        </button>
      </div>
    </div>
  );
}
