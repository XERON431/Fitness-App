export type Exercise = {
    name: string;
    sets: number;
    reps: number;
  };
  
  export type DailyWorkout = {
    date: string; // e.g., '2025-04-06'
    exercises: Exercise[];
    completed: boolean[]; // same index as exercises
  };
  
  export type WeeklyPlan = {
    [day: string]: Exercise[]; // e.g., Monday: [{ name: 'Push Ups', sets: 3, reps: 10 }]
  };
  