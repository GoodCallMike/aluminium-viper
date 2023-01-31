import { useState, useRef } from "react";
import { Camera, CameraType } from "expo-camera";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, TouchableOpacity, Text } from "react-native";
import ImageGallery from "./components/ImageGallery";
import CameraActions from "./components/CameraActions";

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
    <View style={styles.container}>
      <Camera
        style={styles.camera}
        ref={cameraRef}
        type={type}
        onCameraReady={onCameraReady}
      >
        <CameraActions
          takePhoto={takePhoto}
          toggleCameraType={toggleCameraType}
        />
      </Camera>
      <ImageGallery images={images} />
      <StatusBar style="auto" />
    </View>
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
});
