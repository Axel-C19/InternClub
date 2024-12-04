import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../Components/navBar";
import {
  Card,
  CardContent,
  CardHeader,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  Select,
  MenuItem,
} from "@mui/material";

export default function Challenge() {
  const [challenges, setChallenges] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedChallenge, setSelectedChallenge] = useState(null);
  const [newChallenge, setNewChallenge] = useState({
    title: "",
    description: "",
    difficulty: "easy",
    picture: "",
  });

  const navigate = useNavigate();

  // Fetch challenges from backend
  useEffect(() => {
    const fetchChallenges = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5001/api/challenges"
        );
        setChallenges(response.data);
      } catch (error) {
        console.error("Error fetching challenges:", error);
      }
    };
    fetchChallenges();
  }, []);

  // Handle input changes for new challenge
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewChallenge((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Submit new challenge
  const handleSubmitChallenge = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5001/api/challenges",
        newChallenge
      );
      setChallenges([...challenges, response.data]);
      setOpenModal(false);
      // Reset form
      setNewChallenge({
        title: "",
        description: "",
        difficulty: "easy",
        picture: "",
      });
    } catch (error) {
      console.error("Error adding challenge:", error);
    }
  };

  // Handle card click to view challenge details
  const handleCardClick = (challenge) => {
    setSelectedChallenge(challenge);
  };

  // Add challenge to user's projects
  const handleAddToProjects = async (challenge) => {
    try {
      // Obtener el token del usuario desde el localStorage
      const token = localStorage.getItem("token");

      // Verifica si el token está presente antes de enviarlo
      if (!token) {
        alert("No token found. Please log in again.");
        return;
      }

      // Enviar una solicitud para actualizar los desafíos del usuario
      const response = await axios.post(
        "http://localhost:5001/api/users/challenges",
        { challengeId: challenge._id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        alert("Challenge added to projects successfully");
      } else {
        alert("Failed to add challenge to projects");
      }
    } catch (error) {
      console.error("Error adding challenge to projects:", error);
      alert(
        error.response?.data?.error || "Error adding challenge to projects"
      );
    }
  };

  return (
    <div className="flex bg-[#28272f]">
      <Navbar />
      <div className="flex-grow p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-white">
            Programming Challenges
          </h1>
          <Button
            variant="contained"
            color="primary"
            onClick={() => setOpenModal(true)}
          >
            Add New Challenge
          </Button>
        </div>

        <div className="grid bg-[#28272f] grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {challenges.map((challenge) => (
            <Card
              key={challenge._id}
              className="hover:shadow-lg transition-shadow cursor-pointer w-full"
              onClick={() => handleCardClick(challenge)}
            >
              <CardHeader
                title={challenge.title}
                subheader={`Difficulty: ${challenge.difficulty}`}
                className="bg-[#d9d9d9] text-black"
              />
              <CardContent className="bg-[#d9d9d9] text-black">
                <p>{challenge.description}</p>
                {challenge.picture && (
                  <img
                    src={challenge.picture}
                    alt={challenge.title}
                    className="mt-4 w-full h-48 object-cover rounded"
                  />
                )}
                <div className="flex justify-end mt-4 space-x-2">
                  <Button
                    variant="contained"
                    style={{ backgroundColor: "#5d7cba", color: "white" }}
                    color="primary"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleAddToProjects(challenge);
                    }}
                    className="mt-4"
                  >
                    Add to Projects
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Add Challenge Modal */}
        <Dialog open={openModal} onClose={() => setOpenModal(false)}>
          <DialogTitle>Add New Challenge</DialogTitle>
          <DialogContent>
            <TextField
              fullWidth
              margin="normal"
              label="Title"
              name="title"
              value={newChallenge.title}
              onChange={handleInputChange}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Description"
              name="description"
              multiline
              rows={4}
              value={newChallenge.description}
              onChange={handleInputChange}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Picture URL"
              name="picture"
              value={newChallenge.picture}
              onChange={handleInputChange}
            />
            <Select
              fullWidth
              margin="normal"
              name="difficulty"
              value={newChallenge.difficulty}
              onChange={handleInputChange}
              label="Difficulty"
            >
              <MenuItem value="easy">Easy</MenuItem>
              <MenuItem value="medium">Medium</MenuItem>
              <MenuItem value="hard">Hard</MenuItem>
            </Select>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSubmitChallenge}
              className="mt-4"
            >
              Submit Challenge
            </Button>
          </DialogContent>
        </Dialog>

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
              <Button
                variant="contained"
                color="primary"
                onClick={(e) => {
                  handleAddToProjects(selectedChallenge);
                }}
                className="mt-4"
              >
                Add to Projects
              </Button>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </div>
  );
}
