import React, { useState } from 'react';
import './VideoUploader.css';

function App() {
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [responseMessage, setResponseMessage] = useState('');
  const [featureVideo, setFeatureVideo] = useState(null);
  const [pageLoader, setPageLoader] = useState(null);

  // Function to handle the file input change event
  const handleVideoChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type === 'video/mp4') {
      setSelectedVideo(file);
      setPageLoader(false)
    } else {
      alert('Please select a valid MP4 video file.');
    }
  };

  // Function to submit the video to an API (replace with your API endpoint)
  const handleSubmit = async (event) => {
    event.preventDefault();
    setPageLoader(true)
    setSelectedVideo(null);
    if (!selectedVideo) {
      alert('Please select a video to upload.');
      return;
    }

    const formData = new FormData();
    formData.append('video', selectedVideo);

    try {
      const response = await fetch('http://127.0.0.1:5000/detection', {
        method: 'POST',
        body: formData,
      });
      if (response.ok) {
        const data = await response.json();
        setPageLoader(false)
        setResponseMessage(data.is_deepfake);
        setFeatureVideo(data.video_path)
      } else {
        setPageLoader(false)
        const errorData = await response.json();
        setResponseMessage(`Error: ${errorData.message}`);
      }
    } catch (error) {
      setPageLoader(false)
      console.error('Error:', error);
      setResponseMessage('An error occurred while uploading the video.');
    }
  };

  return (
    <div className="video-uploader-container">
          {/* <h1>Upload a Video</h1> */}
          <form onSubmit={handleSubmit}>
            <input description="Select a video" type="file" placeholder='Select a video' accept="video/mp4" onChange={handleVideoChange} />
            <button variant="filled" color="blue" type="submit">Upload</button>
          </form>
          {responseMessage && <p className="response-message">{responseMessage}</p>}
          {selectedVideo && (
            <video controls width="400">
              <source src={URL.createObjectURL(selectedVideo)} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          )}
          {pageLoader && (
            <img alt="" src="/loader.gif" width="200" height="200"/>
          )
          }
          {featureVideo && (
            <video controls autoPlay width="500" height="360">
            <source src={featureVideo} type="video/mp4"/>
            </video>
          )
          }
    </div>
  );
}

export default App;