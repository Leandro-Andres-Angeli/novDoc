import { getStorage, ref, uploadString } from 'firebase/storage';
import {
  FirebaseErrorResponse,
  FirebaseResponseData,
} from 'src/types/firebaseResponse/firebaseResponses';
import * as ImagePicker from 'expo-image-picker';

const storageRef = getStorage();
const profileImagesRef = ref(storageRef, 'profile_images');
export const uploadFile = async (
  photo: ImagePicker.ImagePickerAsset,
): Promise<FirebaseResponseData<{ url: string }> | FirebaseErrorResponse> => {
  try {
    console.log('PHOTOOO');
    console.log('PHOTOOO NAME', photo.fileName);
    const newImgRef = ref(profileImagesRef, `${photo.fileName}`);
    if (!photo.base64) {
      throw Error('Error getting 64base from file');
    }
    const uploadData = await uploadString(newImgRef, photo.base64, 'base64');
    console.log('uploaded result', uploadData);
    return {
      data: { url: uploadData.ref.fullPath },
      message: 'Success uploading picture',
      success: true,
    };
  } catch (error) {
    console.log('errr', error);
    return { success: false, message: 'Error  uploading picture' };
  }
};
