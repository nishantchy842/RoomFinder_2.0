import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { storage } from './config';

const uploadFileProgress = (file, subFolder, imageName, setProgress) => {
  return new Promise((resolve, reject) => {
    const storageRef = ref(storage, subFolder + '/' + imageName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(progress);
      },
      (error) => {
        reject(error);
      },
      () => {
        // Upload completed successfully
        getDownloadURL(uploadTask.snapshot.ref)
          .then((url) => {
            resolve(url);
          })
          .catch((error) => {
            reject(error);
          });
      }
    );
  });
};

export default uploadFileProgress;
