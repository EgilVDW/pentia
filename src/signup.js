import { createUserWithEmailAndPassword } from "firebase/auth";

import { auth } from "./firebase";


export default async function signup(email, password) {
  try {
    const userCredential =
      await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

    return userCredential.user;
  } catch (error) {
    console.error(error);
    throw error;
  }
}