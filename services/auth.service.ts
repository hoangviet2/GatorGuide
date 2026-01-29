// services/auth.service.ts
// Authentication service - handles Firebase Auth
// Currently uses stub data, will connect to Firebase later

import { isStubMode } from './config';

export type AuthUser = {
  uid: string;
  email: string;
  name: string;
};

export type SignInCredentials = {
  email: string;
  name: string;
};

class AuthService {
  /**
   * Sign in or create user account
   * STUB: Returns mock user data
   * TODO: Replace with Firebase createUserWithEmailAndPassword / signInWithEmailAndPassword
   */
  async signIn(credentials: SignInCredentials): Promise<AuthUser> {
    if (isStubMode()) {
      // Stub implementation - simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 500));
      
      return {
        uid: `stub-${Date.now()}`,
        email: credentials.email,
        name: credentials.name,
      };
    }

    // TODO: Real Firebase implementation
    // const auth = getAuth();
    // const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    // return userCredential.user;
    
    throw new Error('Firebase Auth not configured yet');
  }

  /**
   * Send password reset email
   * STUB: Returns success immediately
   * TODO: Replace with Firebase sendPasswordResetEmail
   */
  async sendPasswordReset(email: string): Promise<void> {
    if (isStubMode()) {
      await new Promise((resolve) => setTimeout(resolve, 500));
      console.log(`[STUB] Password reset email sent to ${email}`);
      return;
    }

    // TODO: Real Firebase implementation
    // const auth = getAuth();
    // await sendPasswordResetEmail(auth, email);
    
    throw new Error('Firebase Auth not configured yet');
  }

  /**
   * Sign out current user
   * STUB: Clears local data only
   * TODO: Replace with Firebase signOut
   */
  async signOut(): Promise<void> {
    if (isStubMode()) {
      await new Promise((resolve) => setTimeout(resolve, 200));
      console.log('[STUB] User signed out');
      return;
    }

    // TODO: Real Firebase implementation
    // const auth = getAuth();
    // await signOut(auth);
    
    throw new Error('Firebase Auth not configured yet');
  }
}

export const authService = new AuthService();
