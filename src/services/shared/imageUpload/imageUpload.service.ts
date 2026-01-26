import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytes,
  UploadResult,
} from 'firebase/storage';
import {
  FirebaseErrorResponse,
  FirebaseResponseData,
} from 'src/types/firebaseResponse/firebaseResponses';
import * as ImagePicker from 'expo-image-picker';
import uriToBlob from '../../../utils/uriToBlob/uriToBlob';

const storageRef = getStorage();
const profileImagesRef = ref(storageRef, 'profile_images');
export const uploadFile = async (
  photo: ImagePicker.ImagePickerAsset,
): Promise<FirebaseResponseData<{ url: string }> | FirebaseErrorResponse> => {
  try {
    const newImgRef = ref(profileImagesRef, `${photo.fileName}`);
    const blobFromUri = await uriToBlob(photo.uri);
    let uploadData: UploadResult | null = null;
    if (blobFromUri) {
      uploadData = await uploadBytes(newImgRef, blobFromUri);
    }
    if (!uploadData) {
      throw Error('error uploading data');
    }
    return {
      data: {
        url: await getDownloadURL(newImgRef),
      },
      message: 'Success uploading picture',
      success: true,
    };
  } catch (error) {
    console.log('errr', error);
    return { success: false, message: 'Error  uploading picture' };
  }
};
