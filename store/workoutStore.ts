import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Exercise, WeeklyPlan } from '@/types/types';

type CompletedExercise = Exercise & {
  completedSets: number;
  completedReps: number;
};

type WorkoutState = {
  plannedExercises: Exercise[];
  completedExercises: CompletedExercise[];
  weeklyPlan: WeeklyPlan;
  setPlannedExercises: (exercises: Exercise[]) => void;
  toggleCompleteExercise: (exercise: Exercise) => void;
  updateCompletedExercise: (name: string, sets: number, reps: number) => void;
  resetWorkout: () => void;
  setWeeklyPlan: (plan: WeeklyPlan) => void;
  setTodayWorkoutFromPlan: () => void;
};

export const useWorkoutStore = create<WorkoutState>()(
  persist(
    (set, get) => ({
      plannedExercises: [],
      completedExercises: [],
      weeklyPlan: {},

      setPlannedExercises: (exercises) =>
        set({ plannedExercises: exercises, completedExercises: [] }),

      toggleCompleteExercise: (exercise) => {
        const state = get();
        const alreadyCompleted = state.completedExercises.find((ex) => ex.name === exercise.name);

        if (alreadyCompleted) {
          set({
            completedExercises: state.completedExercises.filter((ex) => ex.name !== exercise.name),
            plannedExercises: [...state.plannedExercises, exercise],
          });
        } else {
          set({
            completedExercises: [
              ...state.completedExercises,
              {
                ...exercise,
                completedSets: exercise.sets,
                completedReps: exercise.reps,
              },
            ],
            plannedExercises: state.plannedExercises.filter((ex) => ex.name !== exercise.name),
          });
        }
      },

      updateCompletedExercise: (name, sets, reps) => {
        const updated = get().completedExercises.map((ex) =>
          ex.name === name ? { ...ex, completedSets: sets, completedReps: reps } : ex
        );
        set({ completedExercises: updated });
      },

      resetWorkout: () => {
        set({
          plannedExercises: [],
          completedExercises: [],
        });
      },

      setWeeklyPlan: (plan) => {
        set({ weeklyPlan: plan });
      },

      setTodayWorkoutFromPlan: () => {
        const today = new Date().toLocaleDateString('en-US', { weekday: 'long' });
        const todayPlan = get().weeklyPlan[today] || [];
        set({ plannedExercises: todayPlan, completedExercises: [] });
      },
    }),
    {
      name: 'workout-store',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
