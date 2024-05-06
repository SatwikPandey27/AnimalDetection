# Farm Animal Detection in Rural Settings

Farm Animal Detection in Rural Settings is a project that aims to detect animals in rural settings using computer vision techniques. The project consists of two main parts:

## Part 1: Model Training and Hosting

A model is trained on a dataset containing images of animals and humans. The model, based on YOLOv8, is trained to identify animals, and a bounding box is drawn around the detected animals. The trained model is hosted on Roboflow at the following link:

[Farm Animal Detection Model on Roboflow](https://universe.roboflow.com/ronits-workspace/farm-animal-detection-ezvtk)

## Part 2: React App for Frontend

A React application is developed to create a user-friendly frontend for the project. The React app interacts with the hosted model API to perform real-time animal detection. Here are the main features of the React app:

- **Live Video Feed**: Users can stream live video feed to the application.
- **API Integration**: The React app calls the hosted model API to perform animal detection on the live video feed.
- **Prediction Display**: The app displays predictions indicating whether the detected object is an animal or a human.
- **Siren Functionality**: Users have the option to trigger a siren sound to fend off animals that may cause harm to the fields.

## Technologies Used

- React.js
- Python
- OpenCV (for camera module)
- YOLOv8 (for animal detection)
- Roboflow
- Web APIs

## Usage

1. Open the React application in your web browser.
2. Provide access to your camera to stream the live video feed.
3. The application will call the hosted model API to perform animal detection on the video feed.
4. Predictions will be displayed indicating whether the detected object is an animal or a human.
5. Optionally, trigger the siren functionality to deter animals causing harm to the fields.

## Installation and Deployment

- The React app can be deployed to any web hosting platform.
- Ensure the backend server (hosting the model API) is running and accessible to the React app.

## Contributing

Contributions are welcome! Feel free to open issues or submit pull requests to improve the project.
