const express = require("express");
const router = express.Router();
const {
  createWorkout,
  getWorkouts,
  getWorkout,
  updateWorkout,
  deletingWorkout,
} = require("../controller/workout.controller");
// Getting all workouts from the database
router.get("/", getWorkouts);
// Getting a single workout
router.get("/:id", getWorkout);

// Creating a new workout in the database
router.post("/", createWorkout);
// updating a single workout in the database
router.put("/:id", updateWorkout);
// deleting a single workout in the database
router.delete("/:id", deletingWorkout);

module.exports = router;
