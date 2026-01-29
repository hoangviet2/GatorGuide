// services/storage.service.ts
// File storage service for resumes and transcripts
// Currently saves to AsyncStorage as base64, will use Firebase Storage later

import AsyncStorage from '@react-native-async-storage/async-storage';
import { isStubMode } from './config';

export type UploadedFile = {
  name: string;
  url: string;
  uploadedAt: Date;
};

class StorageService {
  /**
   * Upload resume file
   * STUB: Saves filename to AsyncStorage
   * TODO: Replace with Firebase Storage upload
   */
  async uploadResume(userId: string, fileUri: string): Promise<UploadedFile> {
    if (isStubMode()) {
      await new Promise((resolve) => setTimeout(resolve, 500));

      const fileName = `resume_${Date.now()}.pdf`;
      const stubData = {
        name: fileName,
        url: `stub://resumes/${userId}/${fileName}`,
        uploadedAt: new Date(),
      };

      // Save stub reference to AsyncStorage
      await AsyncStorage.setItem(
        `resume:${userId}`,
        JSON.stringify(stubData)
      );

      return stubData;
    }

    // TODO: Real Firebase Storage implementation
    // const storage = getStorage();
    // const storageRef = ref(storage, `resumes/${userId}/${fileName}`);
    // const uploadTask = uploadBytesResumable(storageRef, file);
    // const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
    // return { name: fileName, url: downloadURL, uploadedAt: new Date() };

    throw new Error('Firebase Storage not configured yet');
  }

  /**
   * Upload transcript file
   * STUB: Saves filename to AsyncStorage
   * TODO: Replace with Firebase Storage upload
   */
  async uploadTranscript(userId: string, fileUri: string): Promise<UploadedFile> {
    if (isStubMode()) {
      await new Promise((resolve) => setTimeout(resolve, 500));

      const fileName = `transcript_${Date.now()}.pdf`;
      const stubData = {
        name: fileName,
        url: `stub://transcripts/${userId}/${fileName}`,
        uploadedAt: new Date(),
      };

      await AsyncStorage.setItem(
        `transcript:${userId}`,
        JSON.stringify(stubData)
      );

      return stubData;
    }

    // TODO: Real Firebase Storage implementation
    throw new Error('Firebase Storage not configured yet');
  }

  /**
   * Get user's uploaded resume
   * STUB: Retrieves from AsyncStorage
   * TODO: Replace with Firebase Storage download URL
   */
  async getResume(userId: string): Promise<UploadedFile | null> {
    if (isStubMode()) {
      const data = await AsyncStorage.getItem(`resume:${userId}`);
      return data ? JSON.parse(data) : null;
    }

    // TODO: Real Firebase Storage implementation
    throw new Error('Firebase Storage not configured yet');
  }

  /**
   * Get user's uploaded transcript
   * STUB: Retrieves from AsyncStorage
   * TODO: Replace with Firebase Storage download URL
   */
  async getTranscript(userId: string): Promise<UploadedFile | null> {
    if (isStubMode()) {
      const data = await AsyncStorage.getItem(`transcript:${userId}`);
      return data ? JSON.parse(data) : null;
    }

    // TODO: Real Firebase Storage implementation
    throw new Error('Firebase Storage not configured yet');
  }

  /**
   * Delete uploaded file
   * STUB: Removes from AsyncStorage
   * TODO: Replace with Firebase Storage delete
   */
  async deleteFile(userId: string, fileType: 'resume' | 'transcript'): Promise<void> {
    if (isStubMode()) {
      await AsyncStorage.removeItem(`${fileType}:${userId}`);
      return;
    }

    // TODO: Real Firebase Storage implementation
    throw new Error('Firebase Storage not configured yet');
  }
}

export const storageService = new StorageService();
