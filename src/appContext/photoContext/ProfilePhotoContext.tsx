import * as ImagePicker from 'expo-image-picker';
import { createContext, PropsWithChildren, useState } from 'react';
interface ProfilePhotoContextProps extends PropsWithChildren {
  handleSetPhoto: (photo: ImagePicker.ImagePickerAsset) => void;
  resetPhoto: () => void;
  photo: ImagePicker.ImagePickerAsset | null;
}
export const ProfilePhotoContext = createContext(
  {} as ProfilePhotoContextProps,
);

interface ProfilePhotoContextProviderProps extends PropsWithChildren {}
export const ProfilePhotoContextProvider = ({
  children,
}: ProfilePhotoContextProviderProps) => {
  const [photo, setPhoto] = useState<ImagePicker.ImagePickerAsset | null>(null);
  const handleSetPhoto = (photo: ImagePicker.ImagePickerAsset) => {
    setPhoto(photo);
  };
  const resetPhoto = () => {
    setPhoto(null);
  };
  return (
    <ProfilePhotoContext.Provider value={{ handleSetPhoto, photo, resetPhoto }}>
      {children}
    </ProfilePhotoContext.Provider>
  );
};
