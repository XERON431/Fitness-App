import { Exercise } from "@/types/types";

export const defaultExercises: Exercise[] = [
  { name: 'Push Ups', sets: 3, reps: 10 },
  { name: 'Squats', sets: 3, reps: 15 },
  { name: 'Plank', sets: 3, reps: 60 }, // reps as seconds
];

export const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];