import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { Gyroscope } from "expo-sensors";

export default function GyroscopeSensor() {
  const [gyroData, setGyroData] = useState({
    x: 0,
    y: 0,
    z: 0,
  });

  const [subscription, setSubscription] = useState(null);

  const _subscribe = () => {
    setSubscription(
      Gyroscope.addListener((gyroscopeData) => {
        setGyroData(gyroscopeData);
      })
    );
    // Set update interval (in milliseconds)
    Gyroscope.setUpdateInterval(1000); // 1 second
  };

  const _unsubscribe = () => {
    subscription && subscription.remove();
    setSubscription(null);
  };

  useEffect(() => {
    _subscribe();
    return () => _unsubscribe();
  }, []);

  const { x, y, z } = gyroData;

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Gyroscope:</Text>
      <Text style={styles.text}>x: {x.toFixed(2)}</Text>
      <Text style={styles.text}>y: {y.toFixed(2)}</Text>
      <Text style={styles.text}>z: {z.toFixed(2)}</Text>
      <View style={styles.buttonContainer}>
        <Button onPress={_subscribe} title="Start" />
        <Button onPress={_unsubscribe} title="Stop" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 18,
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
});
