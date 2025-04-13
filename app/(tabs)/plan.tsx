import { useEffect, useState } from "react";
import { ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text, Button, TextInput } from "react-native-paper";
import { daysOfWeek } from "@/constants/data";
import { Exercise, WeeklyPlan } from "@/types/types";
import { useWorkoutStore } from "@/store/workoutStore";

export default function PlanScreen() {
  const weeklyPlan = useWorkoutStore((state) => state.weeklyPlan);
  const setWeeklyPlan = useWorkoutStore((state) => state.setWeeklyPlan);

  const [plan, setPlan] = useState<WeeklyPlan>({});
  const [exerciseName, setExerciseName] = useState("");
  const [sets, setSets] = useState("3");
  const [reps, setReps] = useState("10");
  const [selectedDay, setSelectedDay] = useState("Monday");

  useEffect(() => {
    setPlan(weeklyPlan);
  }, [weeklyPlan]);

  const addExercise = () => {
    const newEx: Exercise = {
      name: exerciseName,
      sets: parseInt(sets) || 3,
      reps: parseInt(reps) || 10,
    };

    setPlan((prev) => {
      const dayPlan = prev[selectedDay] || [];
      return { ...prev, [selectedDay]: [...dayPlan, newEx] };
    });

    setExerciseName("");
    setSets("3");
    setReps("10");
  };

  const savePlan = () => {
    setWeeklyPlan(plan);
    alert("Plan saved!");
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#000" }}>
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
          <Text variant="titleLarge" style={{ color: "#fff" }}>
            Weekly Planner
          </Text>
          <Button mode="contained" onPress={savePlan}>
            Save Plan
          </Button>
        </View>

        <TextInput
          label="Exercise Name"
          value={exerciseName}
          onChangeText={setExerciseName}
          mode="flat"
          style={{
            marginVertical: 12,
            backgroundColor: "#1c1c1e",
            borderRadius: 12,
            paddingHorizontal: 8,
          }}
          underlineColor="transparent"
          textColor="#fff"
          placeholderTextColor="#aaa"
          theme={{
            colors: {
              onSurfaceVariant: "#ccc",
            },
          }}
        />

        <View style={{ flexDirection: "row", gap: 8, marginBottom: 12 }}>
          <TextInput
            label="Sets"
            value={sets}
            onChangeText={setSets}
            keyboardType="numeric"
            mode="flat"
            style={{
              flex: 1,
              backgroundColor: "#1c1c1e",
              borderRadius: 12,
              paddingHorizontal: 8,
            }}
            underlineColor="transparent"
            textColor="#fff"
            placeholderTextColor="#aaa"
            theme={{
              colors: {
                onSurfaceVariant: "#ccc",
              },
            }}
          />
          <TextInput
            label="Reps"
            value={reps}
            onChangeText={setReps}
            keyboardType="numeric"
            mode="flat"
            style={{
              flex: 1,
              backgroundColor: "#1c1c1e",
              borderRadius: 12,
              paddingHorizontal: 8,
            }}
            underlineColor="transparent"
            textColor="#fff"
            placeholderTextColor="#aaa"
            theme={{
              colors: {
                onSurfaceVariant: "#ccc",
              },
            }}
          />
        </View>

        <Text style={{ color: "#fff" }}>Select Day:</Text>

        <ScrollView horizontal>
          {daysOfWeek.map((day) => (
            <Button
              key={day}
              onPress={() => setSelectedDay(day)}
              style={{ margin: 4 }}
              mode={selectedDay === day ? "contained" : "outlined"}
            >
              {day}
            </Button>
          ))}
        </ScrollView>

        <Button mode="contained" onPress={addExercise} style={{ marginTop: 12 }}>
          Add Exercise
        </Button>

        {plan[selectedDay]?.length > 0 && (
          <View style={{ marginTop: 16 }}>
            <Text variant="titleMedium" style={{ color: "#fff", marginBottom: 8 }}>
              Exercises for {selectedDay}:
            </Text>
            {plan[selectedDay].map((ex, idx) => (
              <Text key={idx} style={{ color: "#fff" }}>
                • {ex.name} ({ex.sets}x{ex.reps})
              </Text>
            ))}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}