import process from "node:process";
import { initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { getAuth } from "firebase-admin/auth";

process.env.FIRESTORE_EMULATOR_HOST = "127.0.0.1:8080";
process.env.FIREBASE_AUTH_EMULATOR_HOST = "127.0.0.1:9099";

initializeApp({
  projectId: "pentia-1"
});

const db = getFirestore();
const auth = getAuth();

const users = [
  {
    uid: "demo-user-a",
    email: "usera@test.dk",
    password: "test1234",
    firstName: "User",
    lastName: "A",
    projectId: "project-a",
    projectName: "Projekt A"
  },
  {
    uid: "demo-user-b",
    email: "userb@test.dk",
    password: "test1234",
    firstName: "User",
    lastName: "B",
    projectId: "project-b",
    projectName: "Projekt B"
  }
];

for (const user of users) {
  try {
    await auth.createUser({
      uid: user.uid,
      email: user.email,
      password: user.password,
      displayName: `${user.firstName} ${user.lastName}`
    });
  } catch (error) {
    if (error.code !== "auth/uid-already-exists") {
      throw error;
    }
  }

  const userRef = db.collection("users").doc(user.uid);

  await userRef.set({
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email
  });

  await db.collection("projects").doc(user.projectId).set({
    name: user.projectName,
    customerId: userRef
  });
}

console.log("Emulator seedet");
console.log("User A: usera@test.dk / test1234");
console.log("User B: userb@test.dk / test1234");