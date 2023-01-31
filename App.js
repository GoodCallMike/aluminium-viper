import { useState, useRef } from "react";
import { Camera, CameraType } from "expo-camera";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  FlatList,
  Image,
} from "react-native";
import { Provider as PaperProvider } from "react-native-paper";

export default function App() {
  const cameraRef = useRef();

  const [permission, requestPermission] = Camera.useCameraPermissions();

  const [cameraReady, setCameraReady] = useState(false);
  const [type, setType] = useState(CameraType.back);
  const [images, setImages] = useState([]);

  if (!permission) {
    requestPermission();
  }

  const onCameraReady = () => {
    setCameraReady(true);
  };

  const toggleCameraType = () => {
    setType(type === CameraType.back ? CameraType.front : CameraType.back);
  };

  const takePhoto = async () => {
    try {
      if (!cameraReady) return;
      const data = await cameraRef.current.takePictureAsync({
        quality: 1,
      });
      setImages((prevState) => [...prevState, data.uri]);
    } catch (error) {
      console.log("error:", error);
    }
  };

  return (
    <PaperProvider>
      <View style={styles.container}>
        <View style={styles.container}>
          <Camera
            style={styles.camera}
            ref={cameraRef}
            type={type}
            onCameraReady={onCameraReady}
          >
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.button}
                onPress={toggleCameraType}
              >
                <Text style={styles.text}>Change Camera</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={takePhoto}>
                <Text style={styles.text}>Take Photo</Text>
              </TouchableOpacity>
            </View>
          </Camera>
        </View>
        <View style={styles.gallery}>
          <FlatList
            numColumns={2}
            data={images}
            renderItem={({ item }) => (
              <Image
                style={styles.image}
                objectFit="contain"
                source={{ uri: item }}
              />
            )}
            keyExtractor={(item) => item}
          />
        </View>
        <StatusBar style="auto" />
      </View>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "transparent",
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: "flex-end",
    alignItems: "center",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
  gallery: {
    flex: 1,
    marginLeft: 20,
    marginRight: 20,
  },
  image: {
    width: 175,
    height: 175,
    margin: 10,
  },
});
