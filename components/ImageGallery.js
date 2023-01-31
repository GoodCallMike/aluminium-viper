import { StyleSheet, View, FlatList, Image } from "react-native";

const ImageGallery = ({ images }) => {
  return (
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
  );
};

const styles = StyleSheet.create({
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

export default ImageGallery;
