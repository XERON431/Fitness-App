import AsyncStorage from '@react-native-async-storage/async-storage';
import { DailyWorkout, WeeklyPlan } from '@/types/types';

export const saveWeeklyPlan = async (plan: WeeklyPlan) => {
  await AsyncStorage.setItem('weeklyPlan', JSON.stringify(plan));
};

export const getWeeklyPlan = async (): Promise<WeeklyPlan | null> => {
  const plan = await AsyncStorage.getItem('weeklyPlan');
  return plan ? JSON.parse(plan) : null;
};

export const logWorkout = async (workout: DailyWorkout) => {
  const logs = await AsyncStorage.getItem('workoutHistory');
  const history: DailyWorkout[] = logs ? JSON.parse(logs) : [];
  history.push(workout);
  await AsyncStorage.setItem('workoutHistory', JSON.stringify(history));
};

export const getWorkoutHistory = async (): Promise<DailyWorkout[]> => {
  const logs = await AsyncStorage.getItem('workoutHistory');
  return logs ? JSON.parse(logs) : [];
};