import React, { useState, useEffect } from 'react';
import roboflow from 'roboflow';
// import workspaceInfo from roboflow.getWorkflow(workspaceUrl, apiKey);
// const workspaceInfo = roboflow.getWorkspace(workspaceUrl, apiKey);

export default function ImageCapture(props) {

  const [data, setData] = useState(null);
  const [url, setUrl] = useState('');
  const [show, setShow] = useState(false);

  async function getModel() {
    var model = await roboflow
    .auth({
        publishable_key: `${process.env.REACT_APP_API_KEY}`,
    })
    .load({
        model: farm-animal-detection-ezvtk,
        version: 2,
    });
  
    return model;
  }
  console.log(process.env.REACT_APP_API_KEY);
  var initialized_model = getModel();
  
  initialized_model.then(function (model) {
    /// use model.detect() to make a prediction (see "Getting Predictions" below)
    model.detect(video).then(function(predictions) {
      console.log("Predictions:", predictions);
    });
  });

  useEffect(() => {
    const HandleCapClick = async() => {
      // Get the real-time video data from the camera using API.
      fetch(url)
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json();
        })
        .then((json) => setData(json))
        .catch((error) => console.error('Error fetching data:', error));
    };
    HandleCapClick()
  }, [fetch, url]);

  return (
    <div className="container my-3 mt-4">
      <h2>Capturing Video Data</h2>
      <div className="container my-3">
          <div
          style={{
            width: '800px',
            height: '350px',
            border: '2px solid',
            boxShadow: '5px 5px 8px rgba(0, 0, 0, 2)',
            borderRadius: '8px',
          }}
        >
          { 
            show && data ? <pre>{JSON.stringify(data, null, 2)}</pre> : 'Click on Start Capture to begin !'
          }
        </div>
        <button type="button" onClick={()=>{setUrl('https://detect.roboflow.com/farm-animal-detection-ezvtk/2'); setShow(true)}} className={`btn btn-${props.mode === 'light' ? 'dark' : 'light'} my-3`}>
          Start Capture
        </button>
        <button type="button" onClick={()=>{setUrl(''); setShow(false)}} className={`btn btn-${props.mode === 'light' ? 'dark' : 'light'} my-3 mx-2`}>
          Stop Capture
        </button>
      </div>
    </div>
  );
}
