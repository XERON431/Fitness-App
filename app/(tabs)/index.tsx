import React, { useEffect, useState, useRef } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  TextInput as RNTextInput,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, Button } from 'react-native-paper';
import { defaultExercises } from '@/constants/data';
import { logWorkout } from '@/storage/storage';
import { useWorkoutStore } from '@/store/workoutStore';
import { DailyWorkout } from '@/types/types';
import { getCurrentDay } from "@/utils/dateUtils";
import { RefreshControl } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function HomeScreen() {
  const {
    plannedExercises,
    completedExercises,
    setPlannedExercises,
    setTodayWorkoutFromPlan,
    toggleCompleteExercise,
    updateCompletedExercise,
    weeklyPlan,
  } = useWorkoutStore();
  const initialized = useRef(false);
  const [refreshing, setRefreshing] = useState(false);

const onRefresh = () => {
  setRefreshing(true);
  const today = getCurrentDay();
  const todayPlan = weeklyPlan[today] || [];
  setPlannedExercises(todayPlan);
  setRefreshing(false);
};

  const [isFinished, setIsFinished] = useState(false);
  useEffect(() => {
    console.log("bruuuhh");
    AsyncStorage.clear();
    alert('AsyncStorage cleared!');
    if (!initialized.current) {
      const today = getCurrentDay(); // e.g., "Monday"
      const todayPlan = weeklyPlan[today] || [];
      setPlannedExercises(todayPlan);
      initialized.current = true;
    }
  }, []);

  if (plannedExercises.length === 0 && completedExercises.length === 0) {
    setTodayWorkoutFromPlan();
  }

  const handleFinish = async () => {
    const todayWorkout: DailyWorkout = {
      date: new Date().toISOString().split('T')[0],
      exercises: completedExercises.map((ex) => ({
        name: ex.name,
        sets: ex.completedSets,
        reps: ex.completedReps,
      })),
      completed: completedExercises.map(() => true),
    };
    await logWorkout(todayWorkout);
    alert('Workout logged!');
    setIsFinished(true);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#000' }}>
      <ScrollView contentContainerStyle={styles.container} >
        <View style={styles.headerRow}>
          <Text style={styles.headerText}>Today's Workout</Text>
          <Button
            mode="contained-tonal"
            onPress={handleFinish}
            disabled={isFinished}
          >
            {isFinished ? 'Finished' : 'Finish'}
          </Button>
        </View>

        {plannedExercises.length > 0 && (
          <>
            <Text style={styles.sectionTitle}>To Do</Text>
            {plannedExercises.map((ex, i) => (
              <View
                key={i}
                style={[styles.exerciseCard, { backgroundColor: '#1c1c1e' }]}
              >
                <TouchableOpacity
                  onPress={() => {
                    if (!isFinished) toggleCompleteExercise(ex);
                  }}
                >
                  <Text style={styles.exerciseTitle}>
                    {ex.name} (Planned: {ex.sets}x{ex.reps})
                  </Text>
                </TouchableOpacity>
              </View>
            ))}
          </>
        )}

        {completedExercises.length > 0 && (
          <>
            <Text style={styles.sectionTitle}>Completed</Text>
            {completedExercises.map((ex, i) => (
              <View
                key={i}
                style={[styles.exerciseCard, { backgroundColor: '#222' }]}
              >
                <TouchableOpacity
                  onPress={() => {
                    if (!isFinished) toggleCompleteExercise(ex);
                  }}
                >
                  <Text style={styles.exerciseTitle}>
                    ✅ {ex.name} (Planned: {ex.sets}x{ex.reps})
                  </Text>
                </TouchableOpacity>
                <View style={styles.inputRow}>
                <RNTextInput
  placeholder="Sets"
  keyboardType="numeric"
  editable={!isFinished}
  value={ex.completedSets === 0 ? '' : ex.completedSets.toString()}
  onChangeText={(text) =>
    updateCompletedExercise(
      ex.name,
      parseInt(text) || 0,
      ex.completedReps
    )
  }
  style={[styles.input, isFinished && styles.disabledInput]}
  placeholderTextColor="#aaa"
/>
<RNTextInput
  placeholder="Reps"
  keyboardType="numeric"
  editable={!isFinished}
  value={ex.completedReps === 0 ? '' : ex.completedReps.toString()}
  onChangeText={(text) =>
    updateCompletedExercise(
      ex.name,
      ex.completedSets,
      parseInt(text) || 0
    )
  }
  style={[styles.input, isFinished && styles.disabledInput]}
  placeholderTextColor="#aaa"
/>

                </View>
              </View>
            ))}
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#000',
    flexGrow: 1,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  headerText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
    color: '#fff',
  },
  exerciseCard: {
    padding: 12,
    borderRadius: 12,
    marginBottom: 12,
  },
  exerciseTitle: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 6,
  },
  inputRow: {
    flexDirection: 'row',
    gap: 8,
  },
  input: {
    flex: 1,
    backgroundColor: '#2a2a2a',
    borderRadius: 8,
    color: '#fff',
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  disabledInput: {
    opacity: 0.5,
  },
});
