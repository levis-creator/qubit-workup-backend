// wokout from modules
const workout = require("../models/Workout");
const mongoose = require("mongoose");

// getting all workouts from the database
const getWorkouts = async (req, res) => {
  const workouts = await workout.find({}).sort({ createdAt: -1 });
  res.status(200).json(workouts);
};
// getting a single workout from the database
const getWorkout = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Workout not found" });
  }

  const workoutDb = await workout.findById(id);

  if (!workoutDb) {
    return res.status(404).json({
      error: "Workout not found",
    });
  } else {
    return res.status(200).json(workoutDb);
  }
};
// creating a new workout in the database
const createWorkout = async (req, res) => {
  const { title, reps, weight } = req.body;
  try {
    const newWorkout = await workout.create({ title, reps, weight });
    res.status(201).json(newWorkout);
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
};
// updating a single workout in the database
const updateWorkout = async (req, res) => {
  const { id } = req.params;
  const { title, reps, weight } = req.body;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Workout not found" });
  }
  const workoutDb = await workout.findById(id);
  if (!workoutDb) {
    return res.status(404).json({
      error: "Workout not found",
    });
  } else {
    const updatedWorkout = await workout.findByIdAndUpdate(
      id,
      { title, reps, weight },
      { new: true }
    );
    res.status(200).json(updatedWorkout);
  }
};
// deleting a single workout in the database
const deletingWorkout = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Workout not found" });
  }
  const workoutDb = await workout.findById(id);
  if (!workoutDb) {
    return res.status(404).json({
      error: "Workout not found",
    });
  } else {
    const deleteWorkout = await workout.findByIdAndDelete(id);
    return res.status(204);
  }
};
module.exports = {
  createWorkout,
  getWorkouts,
  getWorkout,
  updateWorkout,
  deletingWorkout,
};
