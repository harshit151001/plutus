import { doc, setDoc, getDocs, getDoc, collection } from "firebase/firestore";

import { db } from "../../firebase.config";
import { createNotification } from "./notifications";
import { v4 as uuidv4 } from "uuid";

export async function createPost(post) {
  const postRef = doc(db, "posts", post.uid);
  setDoc(postRef, post);
}

export async function getPosts() {
  const postsCollection = collection(db, "posts");
  const postSnapshot = await getDocs(postsCollection);
  const postList = postSnapshot.docs.map((doc) => doc.data());
  return postList;
}

export async function getPostByUser(email) {
  // query all posts where posts.createdBy === email
  const postsCollection = collection(db, "posts");
  const postSnapshot = await getDocs(postsCollection);
  const postList = postSnapshot.docs.map((doc) => doc.data());

  return postList.filter((post) => post.email === email);
}

export async function like(postId, likedBy) {
  const postRef = doc(db, "posts", postId);
  const postDoc = await getDoc(postRef);
  const post = postDoc.data();

  post.likes += 1;
  await setDoc(postRef, post);

  await createNotification({
    uid: uuidv4(),
    message: "Your post has been liked",
    post: post.post,
    createdFor: post.email,
    createdBy: likedBy,
    createdAt: new Date().toISOString(),
  });
  return post.likes;
}
