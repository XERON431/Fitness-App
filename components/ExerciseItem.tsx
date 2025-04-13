import { View, Text } from 'react-native';
import { Checkbox } from 'react-native-paper';
import { Exercise } from '@/types/types';

type Props = {
  exercise: Exercise;
  completed: boolean;
  onToggle: () => void;
};

export default function ExerciseItem({ exercise, completed, onToggle }: Props) {
  return (
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 }}>
      <Text>{exercise.name} - {exercise.sets}x{exercise.reps}</Text>
      <Checkbox status={completed ? 'checked' : 'unchecked'} onPress={onToggle} />
    </View>
  );
}
