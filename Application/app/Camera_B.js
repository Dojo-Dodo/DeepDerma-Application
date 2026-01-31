import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { useState, useRef , useCallback} from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View, ActivityIndicator, Image} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stack, useRouter } from 'expo-router'
import * as ImagePicker from 'expo-image-picker'
import Slider from '@react-native-community/slider';

export default function CameraScreen() {
  const [facing, setFacing] = useState('back');
  const [permission, requestPermission] = useCameraPermissions();
  const [zoom, setZoom] = useState(0);
  const [isLoading, setIsLoading] = useState(false)
  const [photoUri, setPhotoUri] = useState(null);
  const cameraRef = useRef(null);
  const router = useRouter();

  const handleZoomChange = useCallback((value) => {
    setZoom(value);
  }, []);

  const pickImage = async() => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images', 'videos'],
      allowsEditing: true,
      aspect:[4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  if (!permission) {
    // Camera permissions are still loading.
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View style={styles.container}>
        <Text style={styles.message}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  function toggleCameraFacing() {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
    
  }

  async function takePhoto(){
    if(!cameraRef.current) return;

    try{
      setIsLoading(true);
      const photo = await cameraRef.current.takePictureAsync({})
    
      setPhotoUri(photo.uri)

      //await new Promise(resolve => setTimeout(resolve, 2000));
      } catch(error){
        console.error('Error taking photo:', error);
      } finally{
        setIsLoading(false)
      }
    }  

  function retakePhoto(){
    setPhotoUri(null)
  }

  async function processAndNavigate() {
    if (!photoUri) return;

    try {
      setIsLoading(true);

      await new Promise(resolve => setTimeout(resolve, 3000));

      router.push('/Report')
    } catch (error) {
      console.error('Error processing photo', error);
    } finally {
      setIsLoading(false);
    }
  }

  if (photoUri) {
    return (
      <SafeAreaView style={styles.container}>
        <Image source={{ uri: photoUri }} style={styles.preview} />
        <View style={styles.previewButtons}>
          <TouchableOpacity style={styles.button} onPress={retakePhoto}>
            <Text style={styles.buttonText}>Retake</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={processAndNavigate} disbled={isLoading}>
            <Text style={styles.buttonText}>{isLoading ? 'Processing...' : 'Process'}</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  if(isLoading) {
    return(
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="0000ff"/>
          <Text>Loading...</Text>
      </SafeAreaView>
    )
  }
  return (
    <View style={styles.container}>
      <CameraView style={styles.camera} facing={facing} ref={cameraRef} zoom={zoom}>
        <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={pickImage}>
            <Text style={styles.text}>Access Gallery</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
            <Text style={styles.text}>Flip Camera</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={takePhoto}>
            <Text style={styles.text}>Take Photo</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.row}>
          <Text style={styles.text}>Zoom: {zoom.toFixed(1)}</Text>
          <Slider
            style={styles.slider}
            minimumValue={0}
            maximumValue={1}
            value={zoom}
            onValueChange={handleZoomChange}
            />
        </View>
      </CameraView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  message: {
    textAlign: 'center',
    paddingBottom: 10,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    margin: 16,
  },
  button: {
    flex: 1,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  row:{
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems:"center",
    marginBottom: 40
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    justifyContent: "center",
    alignItems: "center"
  },
  preview: {
    flex: 1,
    width: '100%',
  },
  previewButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 20,
    backgroundColor: '#000',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold'
  },
  slider: {
    flex: 1,
  },
  image:{
    width:200,
    height: 200,
  }
});
