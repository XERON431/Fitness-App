import { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Avatar, Button } from 'react-native-paper';
import { getWorkoutHistory } from '@/storage/storage';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Profile() {
  const [totalWorkouts, setTotalWorkouts] = useState(0);
  const [totalCompleted, setTotalCompleted] = useState(0);
  const [lastWorkoutDate, setLastWorkoutDate] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const history = await getWorkoutHistory();
      setTotalWorkouts(history.length);

      let completedCount = 0;
      history.forEach((log) => {
        completedCount += log.completed.filter((c) => c).length;
      });
      setTotalCompleted(completedCount);

      if (history.length > 0) {
        setLastWorkoutDate(history[0].date); // assuming recent first
      }
    })();
  }, []);

  return (
    <View style={styles.container}>
      <Avatar.Image size={100} source={{ uri: 'https://i.pravatar.cc/100' }} />
      <Text variant="titleMedium" style={styles.name}>John Doe</Text>
      <Text style={styles.email}>john@example.com</Text>

      <View style={styles.statsBox}>
        <Text style={styles.stat}>🏋️ Total Workouts: {totalWorkouts}</Text>
        <Text style={styles.stat}>✅ Exercises Completed: {totalCompleted}</Text>
        {lastWorkoutDate && <Text style={styles.stat}>🕒 Last Workout: {lastWorkoutDate}</Text>}
      </View>

      <Button mode="contained-tonal" onPress={() => {}} style={styles.editBtn}>
        Edit Profile
      </Button>
      <Button
  mode="outlined"
  onPress={async () => {
    await AsyncStorage.clear();
    alert('AsyncStorage cleared!');
  }}
>
  Clear Storage
</Button>

      <Text style={styles.quote}>“No pain, no gain!” 💪</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  name: {
    marginTop: 16,
    color: '#fff',
  },
  email: {
    color: '#aaa',
    marginBottom: 20,
  },
  statsBox: {
    backgroundColor: '#1c1c1e',
    borderRadius: 12,
    padding: 16,
    width: '100%',
    marginVertical: 20,
  },
  stat: {
    color: '#ccc',
    fontSize: 16,
    marginBottom: 8,
  },
  editBtn: {
    marginBottom: 16,
  },
  quote: {
    color: '#888',
    fontStyle: 'italic',
  },
});
