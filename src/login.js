import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebase";

export default async function login(
  email,
  password
) {
  try {
    const userCredential =
      await signInWithEmailAndPassword(
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