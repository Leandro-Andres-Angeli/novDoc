import { getStorage, ref } from 'firebase/storage';
import {
  FirebaseErrorResponse,
  FirebaseResponseData,
} from 'src/types/firebaseResponse/firebaseResponses';
import * as ImagePicker from 'expo-image-picker';

const storageRef = getStorage();
const profileImagesRef = ref(storageRef, 'profile_images');
export const uploadFile = async (photo: ImagePicker.ImagePickerAsset) =>
  // : Promise<FirebaseResponseData<any> | FirebaseErrorResponse>
  {
    try {
      console.log('PHOTOOO');
      console.log('PHOTOOO NAME', photo.fileName);
      // const newImgRef = ref(profileImagesRef ,
      //     `${photo.fileName}`
      // )
    } catch (error) {}
  };
