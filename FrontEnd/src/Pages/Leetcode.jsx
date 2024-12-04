import React, { useState, useEffect } from "react";
import { CiSaveUp1 } from "react-icons/ci";
import { FaCheckCircle } from "react-icons/fa";
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
  Chip,
  FormControl,
  InputLabel,
  OutlinedInput,
} from "@mui/material";

export default function Leetcode() {
  const [leetcodes, setLeetcodes] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [newLeetcode, setNewLeetcode] = useState({
    title: "",
    description: "",
    url: "",
    difficulty: "easy",
    topics: [],
  });

  const navigate = useNavigate();

  // Fetch leetcodes from backend
  useEffect(() => {
    const fetchLeetcodes = async () => {
      try {
        const response = await axios.get("http://localhost:5001/api/leetcodes");
        setLeetcodes(response.data);
      } catch (error) {
        console.error("Error fetching leetcodes:", error);
      }
    };
    fetchLeetcodes();
  }, []);

  // Handle input changes for new leetcode
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewLeetcode((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle topic change for new leetcode
  const handleTopicChange = (event) => {
    const {
      target: { value },
    } = event;
    setNewLeetcode((prev) => ({
      ...prev,
      topics: typeof value === "string" ? value.split(",") : value,
    }));
  };

  // Submit new leetcode
  const handleSubmitLeetcode = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        alert("No token found. Please log in again.");
        return;
      }

      const response = await axios.post(
        "http://localhost:5001/api/leetcodes",
        newLeetcode,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setLeetcodes([...leetcodes, response.data]);
      setOpenModal(false);
      // Reset form
      setNewLeetcode({
        title: "",
        description: "",
        url: "",
        difficulty: "easy",
        topics: [],
      });
    } catch (error) {
      console.error("Error adding leetcode:", error);
    }
  };

  // Handle card click to navigate to leetcode URL
  const handleCardClick = (leetcode) => {
    window.open(leetcode.url, "_blank");
  };

  // Add leetcode to user's saved leetcodes
  const handleAddToSavedLeetcodes = async (leetcode) => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        alert("No token found. Please log in again.");
        return;
      }

      const response = await axios.post(
        "http://localhost:5001/api/users/leetcodes/saved",
        { leetcodeId: leetcode._id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        alert("Leetcode added to saved successfully");
      } else {
        alert("Failed to add leetcode to saved");
      }
    } catch (error) {
      console.error("Error adding leetcode to saved:", error);
      alert(error.response?.data?.error || "Error adding leetcode to saved");
    }
  };

  // Mark leetcode as completed
  const handleMarkAsCompleted = async (leetcode) => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        alert("No token found. Please log in again.");
        return;
      }

      // Enviar la solicitud para agregar el leetcode a los completados del usuario
      const userResponse = await axios.post(
        `http://localhost:5001/api/users/leetcodes/completed`,
        { leetcodeId: leetcode._id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Si la respuesta es exitosa, actualizar el modelo de leetcode para añadir al usuario que lo completó
      if (userResponse.status === 200) {
        const leetcodeResponse = await axios.post(
          `http://localhost:5001/api/leetcodes/${leetcode._id}/completedBy`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (leetcodeResponse.status === 200) {
          alert("Leetcode marked as completed successfully");
        } else {
          alert("Failed to mark leetcode as completed in leetcode model");
        }
      } else {
        alert("Failed to mark leetcode as completed");
      }
    } catch (error) {
      console.error("Error marking leetcode as completed:", error);
      alert(
        error.response?.data?.error || "Error marking leetcode as completed"
      );
    }
  };

  return (
    <div className="flex bg-[#28272f]">
      <Navbar />
      <div className="flex-grow p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-white">Leetcode Challenges</h1>
          <Button
            variant="contained"
            color="primary"
            onClick={() => setOpenModal(true)}
          >
            Add New Leetcode
          </Button>
        </div>

        <div className="grid bg-[#28272f] grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {leetcodes.map((leetcode) => (
            <Card
              key={leetcode._id}
              className="hover:shadow-lg transition-shadow cursor-pointer w-full relative"
              style={{ width: "100%" }}
              onClick={() => handleCardClick(leetcode)}
            >
              <CardHeader
                title={leetcode.title}
                className="bg-[#d9d9d9] text-black"
              />
              <CardContent className="bg-[#d9d9d9] text-black">
                <p>Difficulty: {leetcode.difficulty}</p>
                <div>
                  {leetcode.topics &&
                    leetcode.topics.map((topic) => (
                      <Chip key={topic} label={topic} className="m-1" />
                    ))}
                </div>
                <div className="flex justify-end mt-4 space-x-2">
                  <Button
                    variant="contained"
                    style={{ backgroundColor: "#5d7cba", color: "white" }}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleAddToSavedLeetcodes(leetcode);
                    }}
                    className="p-2 m-2"
                  >
                    <CiSaveUp1 />
                  </Button>
                  <Button
                    variant="contained"
                    style={{ backgroundColor: "#57a75c", color: "white" }}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleMarkAsCompleted(leetcode);
                    }}
                    className="p-2 m-2"
                  >
                    <FaCheckCircle />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Add Leetcode Modal */}
        <Dialog open={openModal} onClose={() => setOpenModal(false)}>
          <DialogTitle>Add New Leetcode</DialogTitle>
          <DialogContent>
            <TextField
              fullWidth
              margin="normal"
              label="Title"
              name="title"
              value={newLeetcode.title}
              onChange={handleInputChange}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Description"
              name="description"
              multiline
              rows={4}
              value={newLeetcode.description}
              onChange={handleInputChange}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Leetcode URL"
              name="url"
              value={newLeetcode.url}
              onChange={handleInputChange}
            />
            <FormControl fullWidth margin="normal">
              <InputLabel id="difficulty-label">Difficulty</InputLabel>
              <Select
                labelId="difficulty-label"
                label="Difficulty"
                name="difficulty"
                value={newLeetcode.difficulty}
                onChange={handleInputChange}
              >
                <MenuItem value="easy">Easy</MenuItem>
                <MenuItem value="medium">Medium</MenuItem>
                <MenuItem value="hard">Hard</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth margin="normal">
              <InputLabel id="topics-label">Topics</InputLabel>
              <Select
                labelId="topics-label"
                multiple
                value={newLeetcode.topics}
                onChange={handleTopicChange}
                input={<OutlinedInput label="Topics" />}
                renderValue={(selected) => (
                  <div className="flex flex-wrap gap-2">
                    {selected.map((value) => (
                      <Chip key={value} label={value} />
                    ))}
                  </div>
                )}
              >
                <MenuItem value="arrays">Arrays</MenuItem>
                <MenuItem value="strings">Strings</MenuItem>
                <MenuItem value="graphs">Graphs</MenuItem>
                <MenuItem value="dfs">DFS</MenuItem>
                <MenuItem value="bfs">BFS</MenuItem>
                <MenuItem value="graphql">GraphQL</MenuItem>
                <MenuItem value="recursive">Recursive</MenuItem>
                <MenuItem value="dynamic programming">
                  Dynamic Programming
                </MenuItem>
              </Select>
            </FormControl>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSubmitLeetcode}
              className="mt-4"
            >
              Submit Leetcode
            </Button>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
