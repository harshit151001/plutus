import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase.config";

export async function getOrCreateUser(email, name, image) {
  const userRef = doc(db, "users", email);
  const userDoc = await getDoc(userRef);

  if (userDoc.exists()) {
    return userDoc.data();
  } else {
    setDoc(userRef, { role: "reader", email: email, name: name, image: image });
    return { role: "reader", email: email, name: name, image: image };
  }
}

export async function getUser(email) {
  const userRef = doc(db, "users", email);
  const userDoc = await getDoc(userRef);
  return userDoc.data();
}

export async function updateUser(email, updatedData) {
  const userRef = doc(db, "users", email);
  await updateDoc(userRef, updatedData);
}

export async function updateUserRole(email, role) {
  const userRef = doc(db, "users", email);
  await updateDoc(userRef, { role: role });
}
