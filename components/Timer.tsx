import React, { useEffect, useState } from 'react';
import { Text } from 'react-native-paper';

export default function Timer({ seconds = 60 }: { seconds?: number }) {
  const [timeLeft, setTimeLeft] = useState(seconds);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(t => Math.max(t - 1, 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return <Text>Time Left: {timeLeft}s</Text>;
}
