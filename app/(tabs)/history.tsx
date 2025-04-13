import { useEffect, useState } from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text } from 'react-native-paper';
import { getWorkoutHistory } from '@/storage/storage';
import { DailyWorkout } from '@/types/types';

export default function HistoryScreen() {
  const [history, setHistory] = useState<DailyWorkout[]>([]);

  useEffect(() => {
    (async () => {
      const logs = await getWorkoutHistory();
      setHistory(logs);
    })();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#000' }}>
    <ScrollView
      contentContainerStyle={styles.container}
      style={{ backgroundColor: '#000' }}
    >
      <Text variant="titleLarge" style={styles.title}>
        Workout History
      </Text>

      {history.length === 0 ? (
        <Text style={styles.emptyText}>No workout history found.</Text>
      ) : (
        history.map((log, i) => (
          <View key={i} style={styles.logBox}>
            <Text variant="titleMedium" style={styles.date}>
              {log.date}
            </Text>
            {log.exercises.map((ex, j) => (
              <Text key={j} style={styles.exercise}>
                {log.completed[j] ? '✅' : '❌'} {ex.name} ({ex.sets}x{ex.reps})
              </Text>
            ))}
          </View>
        ))
      )}
    </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingBottom: 40,
  },
  title: {
    color: '#fff',
    marginBottom: 16,
    fontWeight: 'bold',
  },
  emptyText: {
    color: '#aaa',
    fontStyle: 'italic',
    marginTop: 20,
  },
  logBox: {
    backgroundColor: '#1c1c1e',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
  },
  date: {
    color: '#fff',
    marginBottom: 6,
  },
  exercise: {
    color: '#ccc',
    marginLeft: 6,
    marginBottom: 4,
  },
});
