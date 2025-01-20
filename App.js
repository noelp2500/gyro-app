import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import { Gyroscope } from "expo-sensors";
import RNSpeedometer from "react-native-speedometer";

const labels = [
  {
    name: "Unbelievably Fast",
    labelColor: "#00ff6b",
    activeBarColor: "#00ff6b",
  },
  {
    name: "Normal",
    labelColor: "#f2cf1f",
    activeBarColor: "#f2cf1f",
  },
  {
    name: "Too Slow",
    labelColor: "#ff2900",
    activeBarColor: "#ff2900",
  },
];

const GyroSpeedometerDisplay = () => {
  const [gyroData, setGyroData] = useState({ x: 0, y: 0, z: 0 });

  useEffect(() => {
    const subscription = Gyroscope.addListener((data) => {
      setGyroData(data);
    });
    Gyroscope.setUpdateInterval(1000);
    return () => subscription.remove();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Gyroscope Speedometers</Text>

      <View style={styles.speedometerContainer}>
        <Text style={styles.label}>X-Axis</Text>
        <RNSpeedometer
          labels={labels}
          value={gyroData.x * 57.29578}
          maxValue={50}
          minValue={0}
          allowedDecimals={5}
          size={200}
          text={`X: ${(gyroData.x * 57.29578).toFixed(5)}`}
        />
      </View>

      <View style={styles.speedometerContainer}>
        <Text style={styles.label}>Y-Axis</Text>
        <RNSpeedometer
          labels={labels}
          value={gyroData.y * 57.29578}
          maxValue={50}
          minValue={0}
          allowedDecimals={5}
          size={200}
          text={`Y: ${(gyroData.y * 57.29578).toFixed(5)}`}
        />
      </View>

      <View style={styles.speedometerContainer}>
        <Text style={styles.label}>Z-Axis</Text>
        <RNSpeedometer
          labels={labels}
          value={gyroData.z * 57.29578}
          maxValue={50}
          minValue={0}
          allowedDecimals={5}
          size={200}
          text={`Z: ${(gyroData.z * 57.29578).toFixed(5)}`}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  speedometerContainer: {
    marginBottom: 30,
    alignItems: "center",
  },
  label: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    marginTop: 35,
  },
});

export default GyroSpeedometerDisplay;
