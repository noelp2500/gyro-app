import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { Gyroscope } from "expo-sensors";

export default function App() {
  const [gyroData, setGyroData] = useState({
    x: 0,
    y: 0,
    z: 0,
  });

  const [subscription, setSubscription] = useState(null);

  const subscribe = () => {
    setSubscription(
      Gyroscope.addListener((gyroscopeData) => {
        setGyroData(gyroscopeData);
      })
    );
    Gyroscope.setUpdateInterval(1000);
  };

  const unsubscribe = () => {
    subscription && subscription.remove();
    setSubscription(null);
  };

  useEffect(() => {
    subscribe();
    return () => unsubscribe();
  }, []);

  const { x, y, z } = gyroData;

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Gyroscope Data</Text>
      <Text style={styles.text}>x: {x.toFixed(5)}</Text>
      <Text style={styles.text}>y: {y.toFixed(5)}</Text>
      <Text style={styles.text}>z: {z.toFixed(5)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  text: {
    fontSize: 18,
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    width: "60%",
  },
});

// export default function App() {
//   return (
//     <View style={styles.container}>
//
//       <StatusBar style="auto" />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
