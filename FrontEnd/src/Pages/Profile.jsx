import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../Components/navBar";
import {
  TextField,
  Button,
  Avatar,
  Typography,
  CircularProgress,
  Box,
  Card,
  CardContent,
  CardHeader,
  Dialog,
  DialogTitle,
  DialogContent,
} from "@mui/material";

export default function Profile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    bio: "",
    picture: "",
    phone_number: "",
    age: "",
  });
  const [savedLeetcodes, setSavedLeetcodes] = useState([]);
  const [participatingChallenges, setParticipatingChallenges] = useState([]);
  const [selectedChallenge, setSelectedChallenge] = useState(null);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          alert("No token found. Please log in again.");
          return;
        }

        // Obtener perfil del usuario
        const response = await axios.get("http://localhost:5001/api/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setProfile(response.data);
        setFormData({
          name: response.data.profile?.name || "",
          bio: response.data.profile?.bio || "",
          picture: response.data.profile?.picture || "",
          phone_number: response.data.phone_number || "",
          age: response.data.age || "",
        });

        // Obtener leetcodes guardados del usuario
        const leetcodesResponse = await axios.get(
          "http://localhost:5001/api/users/leetcodes/saved",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setSavedLeetcodes(leetcodesResponse.data);

        // Obtener desafíos en los que participa el usuario
        const challengesResponse = await axios.get(
          "http://localhost:5001/api/users/challenges",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setParticipatingChallenges(challengesResponse.data);

        setLoading(false);
      } catch (error) {
        console.error("Error fetching profile data:", error);
        alert("Failed to load profile data. Please try again later.");
        setLoading(false);
      }
    };
    fetchProfileData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("No token found. Please log in again.");
        return;
      }

      const response = await axios.put(
        "http://localhost:5001/api/profile",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setProfile(response.data);
      setEditMode(false);
      alert("Profile updated successfully.");
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile. Please try again.");
    }
  };

  const validateImageUrl = (url) => {
    return url && url.startsWith("http");
  };

  const handleCardClick = (challenge) => {
    setSelectedChallenge(challenge);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <CircularProgress />
      </div>
    );
  }

  return (
    <div className="flex bg-[#28272f]">
      <Navbar />
      <div className="flex-grow p-6 text-white">
        <div className="flex items-start">
          <Avatar
            src={
              validateImageUrl(profile?.profile?.picture)
                ? profile.profile.picture
                : "/default-avatar.png"
            }
            alt="Profile Picture"
            sx={{ width: 120, height: 120 }}
          />
          <div className="ml-6 flex-grow">
            <Typography variant="h5" align="left">
              {profile?.username}
            </Typography>
            <Typography variant="body1" align="left" className="mt-2">
              {profile?.email}
            </Typography>

            {editMode ? (
              <Box
                className="flex flex-col mt-4 p-6 rounded-lg"
                style={{ backgroundColor: "#d9d9d9", color: "black" }}
              >
                <TextField
                  fullWidth
                  margin="normal"
                  label="Name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                />
                <TextField
                  fullWidth
                  margin="normal"
                  label="Bio"
                  name="bio"
                  value={formData.bio}
                  onChange={handleInputChange}
                />
                <TextField
                  fullWidth
                  margin="normal"
                  label="Profile Picture URL"
                  name="picture"
                  value={formData.picture}
                  onChange={handleInputChange}
                />
                <TextField
                  fullWidth
                  margin="normal"
                  label="Phone Number"
                  name="phone_number"
                  value={formData.phone_number}
                  onChange={handleInputChange}
                />
                <TextField
                  fullWidth
                  margin="normal"
                  label="Age"
                  name="age"
                  value={formData.age}
                  onChange={handleInputChange}
                />
                <Button
                  variant="contained"
                  style={{ backgroundColor: "#5d7cba", color: "white" }}
                  className="mt-4"
                  fullWidth
                  onClick={handleSave}
                >
                  Save
                </Button>
              </Box>
            ) : (
              <div className="flex flex-col mt-4">
                <Typography variant="h6" align="left">
                  Name: {profile?.profile?.name}
                </Typography>
                <Typography variant="body1" align="left" className="mt-2">
                  Bio: {profile?.profile?.bio}
                </Typography>
                <Typography variant="body1" align="left" className="mt-2">
                  Phone Number: {profile?.phone_number}
                </Typography>
                <Typography variant="body1" align="left" className="mt-2">
                  Age: {profile?.age}
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  className="mt-4"
                  style={{ minWidth: "150px", maxWidth: "25%" }}
                  onClick={() => setEditMode(true)}
                >
                  Edit Profile
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Section for Saved Leetcodes */}
        <div className="mt-8">
          <Typography variant="h5" className="text-white">
            Saved Leetcodes
          </Typography>
          <div className="grid bg-[#28272f] grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
            {savedLeetcodes.map((leetcode) => (
              <Card
                key={leetcode._id}
                className="hover:shadow-lg transition-shadow cursor-pointer w-full relative"
                onClick={() => window.open(leetcode.url, "_blank")}
              >
                <CardHeader
                  title={leetcode.title}
                  className="bg-[#d9d9d9] text-black"
                />
                <CardContent className="bg-[#d9d9d9] text-black">
                  <p>{leetcode.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Section for Participating Challenges */}
        <div className="mt-8">
          <Typography variant="h5" className="text-white">
            Participating Challenges
          </Typography>
          <div className="grid bg-[#28272f] grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
            {participatingChallenges.map((challenge) => (
              <Card
                key={challenge._id}
                className="hover:shadow-lg transition-shadow cursor-pointer w-full relative"
                onClick={() => handleCardClick(challenge)}
              >
                <CardHeader
                  title={challenge.title}
                  subheader={`Difficulty: ${challenge.difficulty}`}
                  className="bg-[#d9d9d9] text-black"
                />
                <CardContent className="bg-[#d9d9d9] text-black">
                  <p>{challenge.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Challenge Details Modal */}
        {selectedChallenge && (
          <Dialog
            open={!!selectedChallenge}
            onClose={() => setSelectedChallenge(null)}
            maxWidth="md"
            fullWidth
          >
            <DialogTitle>{selectedChallenge.title}</DialogTitle>
            <DialogContent>
              <p>{selectedChallenge.description}</p>
              {selectedChallenge.picture && (
                <img
                  src={selectedChallenge.picture}
                  alt={selectedChallenge.title}
                  className="mt-4 w-full h-auto object-cover rounded"
                />
              )}
            </DialogContent>
          </Dialog>
        )}
      </div>
    </div>
  );
}
