import { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const AddPostPage = () => {
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!location.trim() || !description.trim()) {
      alert("Location and Description are required.");
      return;
    }
  
    if (image && image.size > 5 * 1024 * 1024) { // 5MB limit
      alert("Image size should be less than 5MB.");
      return;
    }
  
    setIsUploading(true);
  
    const formData = new FormData();
    formData.append("location", location);
    formData.append("description", description);
    if (image) {
      formData.append("image", image);
    }
  
    try {
      // Assuming the JWT token is stored in local storage
      const token = localStorage.getItem("token");
  
      await axios.post("http://localhost:8080/api/users/post", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          "Authorization": `Bearer ${token}`, // Add JWT token to headers
        },
      });
  
      alert("Post added successfully");
      navigate("/PostPage"); // Redirect to the posts page
    } catch (error) {
      if (error.response) {
        console.error("Error adding post:", error.response.data);
        alert(`Failed to add post: ${error.response.data.message || 'Unknown error'}`);
      } else if (error.request) {
        console.error("No response received:", error.request);
        alert("Failed to add post: No response from the server.");
      } else {
        console.error("Error:", error.message);
        alert(`Failed to add post: ${error.message}`);
      }
    } finally {
      setIsUploading(false);
    }
  };
  

  const handleCancel = () => {
    navigate("/PostPage"); // Redirect to the posts page
  };

  return (
    <div className="add-post-page" style={styles.container}>
      <h1 style={styles.heading}>Add New Post</h1>
      <form onSubmit={handleSubmit} style={styles.form}>
        <label style={styles.label}>
          Location:
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
            style={styles.input}
            disabled={isUploading}
          />
        </label>
        <label style={styles.label}>
          Description:
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            rows="4"
            style={styles.textarea}
            disabled={isUploading}
          />
        </label>
        <label style={styles.label}>
          Upload Image:
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
            style={styles.fileInput}
            disabled={isUploading}
          />
        </label>
        <div style={styles.buttonContainer}>
          <button type="submit" style={styles.button} disabled={isUploading}>
            {isUploading ? "Uploading..." : "Add Post"}
          </button>
          <button type="button" onClick={handleCancel} style={styles.cancelButton}>
            Back to Posts
          </button>
        </div>
      </form>
    </div>
  );
};

const styles = {
  container: {
    padding: "2rem",
    maxWidth: "600px",
    margin: "auto",
    backgroundColor: "#f9f9f9",
    borderRadius: "8px",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
  },
  heading: {
    textAlign: "center",
    marginBottom: "1.5rem",
    color: "#333",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  },
  label: {
    fontSize: "1rem",
    color: "#555",
  },
  input: {
    padding: "0.5rem",
    fontSize: "1rem",
    borderRadius: "4px",
    border: "1px solid #ddd",
    outline: "none",
  },
  textarea: {
    padding: "0.5rem",
    fontSize: "1rem",
    borderRadius: "4px",
    border: "1px solid #ddd",
    outline: "none",
    resize: "vertical",
  },
  fileInput: {
    padding: "0.5rem",
    fontSize: "1rem",
    borderRadius: "4px",
    border: "1px solid #ddd",
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "1rem",
  },
  button: {
    padding: "1rem",
    fontSize: "1rem",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  },
  cancelButton: {
    padding: "1rem",
    fontSize: "1rem",
    backgroundColor: "#6c757d",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  },
};

export default AddPostPage;
