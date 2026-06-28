import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import "../styles/Profile.css";

function Profile() {
  const [profileImage, setProfileImage] = useState(
    "https://i.pravatar.cc/200"
  );

  const [formData, setFormData] = useState({
    fullName: "Ankit Kumar",
    email: "ankitkumar@gmail.com",
    phone: "+91 98765 43210",
    location: "Bangalore, India",
    bio: "Aspiring Full Stack Developer | Problem Solver | Lifelong Learner",
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setProfileImage(URL.createObjectURL(file));
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = () => {
    localStorage.setItem(
      "profileData",
      JSON.stringify(formData)
    );

    alert("Profile Updated Successfully!");
  };

  return (
    <div className="profile-page container">
      <Sidebar />

      <div className="main-content">
        <h1>PROFILE PAGE</h1>

        <div className="profile-wrapper">

          {/* Profile Card */}
          <div className="profile-card">

            <h2>Profile Settings</h2>
            <p>Manage your profile information.</p>

            <div className="profile-content">

              {/* Image Section */}
              <div className="profile-image-box">

                <img
                  src={profileImage}
                  alt="Profile"
                />

                <input
                  type="file"
                  id="photoUpload"
                  accept="image/*"
                  hidden
                  onChange={handleImageChange}
                />

                <button
                  onClick={() =>
                    document
                      .getElementById("photoUpload")
                      .click()
                  }
                >
                  Change Photo
                </button>

                <small>
                  JPG, PNG up to 3MB
                </small>

              </div>

              {/* Form Section */}
              <div className="form-section">

                <label>Full Name</label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                />

                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />

                <label>Phone</label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                />

                <label>Location</label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                />

                <label>Bio</label>
                <textarea
                  rows="4"
                  name="bio"
                  value={formData.bio}
                  onChange={handleChange}
                />

              </div>

            </div>
          </div>

          {/* Stats Section */}
          <div className="stats-card">

            <h3>Your Stats</h3>

            <div className="stat">
              <span>📄</span>
              <div>
                <p>Resumes Analyzed</p>
                <h4>8</h4>
              </div>
            </div>

            <div className="stat">
              <span>🎯</span>
              <div>
                <p>Interviews Taken</p>
                <h4>12</h4>
              </div>
            </div>

            <div className="stat">
              <span>⭐</span>
              <div>
                <p>Average Score</p>
                <h4>76%</h4>
              </div>
            </div>

            <div className="stat">
              <span>📅</span>
              <div>
                <p>Member Since</p>
                <h4>May 2024</h4>
              </div>
            </div>

            <button
              className="save-btn"
              onClick={handleSave}
            >
              Save Changes
            </button>

          </div>

        </div>
      </div>
    </div>
  );
}

export default Profile;