import { HStack, Text, VStack } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';

const Timer = () => {
  const [seconds, setSeconds] = useState(0);

  // issue was useEffect capturing the initial 'seconds' state (0) and not recognizing updates. the solution was to use a functional update to setSeconds

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((prevSeconds) => prevSeconds + 1);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  // previously date was a normal variable so react was updating it each rerender (it was caused by interval in useEffect)
  const [date] = useState(new Date().toTimeString());

  return (
    <VStack
      gap="10px"
      align="left"
    >
      <HStack>
        <Text fontWeight="bold">Seconds spend on page:</Text>
        <p>{`${seconds} s`}</p>
      </HStack>
      <HStack>
        <Text fontWeight="bold">Time of entering the website:</Text>
        <p>{date}</p>
      </HStack>
    </VStack>
  );
};

export default Timer;
