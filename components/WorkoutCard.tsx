// components/WorkoutCard.tsx
import { Card, Text } from 'react-native-paper';

export default function WorkoutCard({ workout }: { workout: any }) {
  return (
    <Card style={{ marginVertical: 8 }}>
      <Card.Title title={workout.name} />
      <Card.Content>
        {workout.reps && <Text>Reps: {workout.reps} × {workout.sets} sets</Text>}
        {workout.duration && <Text>Duration: {workout.duration}</Text>}
      </Card.Content>
    </Card>
  );
}
