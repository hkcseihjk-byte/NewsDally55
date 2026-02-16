import { Post } from '../types';

// -----------------------------------------------------------------------------------------
// 🔥 FIREBASE SETUP INSTRUCTIONS (Start Here)
// -----------------------------------------------------------------------------------------
// 1. Go to Firebase Console: https://console.firebase.google.com/
// 2. Create a new project.
// 3. Add a Web App to the project.
// 4. Copy the `firebaseConfig` object provided by Firebase.
// 5. Run `npm install firebase` in your terminal.
// 6. Uncomment the imports and the configuration code below.
// -----------------------------------------------------------------------------------------

/* UNCOMMENT THIS SECTION FOR FIREBASE
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, addDoc, deleteDoc, doc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "YOUR_API_KEY_HERE",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
*/

// Mock Data (This appears when Firebase is not connected)
// Note: Video links and specific personal photos have been removed as requested.
let mockPosts: Post[] = [
  {
    id: '1',
    title: 'Futuristic AI Portrait',
    imageUrl: 'https://picsum.photos/600/400?random=101', 
    content: 'Prompt: A futuristic cyborg with neon accents...',
    timestamp: Date.now()
  },
  {
    id: '2',
    title: 'Abstract Fluid Art',
    imageUrl: 'https://picsum.photos/600/400?random=102',
    content: 'Prompt: Swirling colors of oil and water, macro photography...',
    timestamp: Date.now() - 10000
  },
  {
    id: '3',
    title: 'Minimalist Landscape',
    imageUrl: 'https://picsum.photos/600/400?random=103',
    content: 'Prompt: A lone tree in a snowy field, high contrast...',
    timestamp: Date.now() - 20000
  },
  {
    id: '4',
    title: 'Cyberpunk Street',
    imageUrl: 'https://picsum.photos/600/400?random=104',
    content: 'Prompt: Rainy street in Tokyo at night, neon lights...',
    timestamp: Date.now() - 30000
  }
];

export const getPosts = async (): Promise<Post[]> => {
  // ---------------------------------------------------------------------------------------
  // 🔥 MARK: USE FIREBASE HERE (Read Data)
  // Replace the mock return with the following code:
  // ---------------------------------------------------------------------------------------
  /*
  const querySnapshot = await getDocs(collection(db, "posts"));
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Post));
  */
  
  // Return Mock Data
  return new Promise((resolve) => {
    setTimeout(() => resolve([...mockPosts]), 500);
  });
};

export const addPost = async (post: Omit<Post, 'id'>): Promise<Post> => {
  // ---------------------------------------------------------------------------------------
  // 🔥 MARK: USE FIREBASE HERE (Add Data)
  // Replace the mock return with the following code:
  // ---------------------------------------------------------------------------------------
  /*
  const docRef = await addDoc(collection(db, "posts"), post);
  return { id: docRef.id, ...post };
  */

  // Add to Mock Data
  return new Promise((resolve) => {
    const newPost = { ...post, id: Math.random().toString(36).substr(2, 9) };
    mockPosts = [newPost, ...mockPosts];
    setTimeout(() => resolve(newPost), 500);
  });
};

export const deletePost = async (id: string): Promise<void> => {
  // ---------------------------------------------------------------------------------------
  // 🔥 MARK: USE FIREBASE HERE (Delete Data)
  // Replace the mock return with the following code:
  // ---------------------------------------------------------------------------------------
  /*
  await deleteDoc(doc(db, "posts", id));
  */

  // Delete from Mock Data
  return new Promise((resolve) => {
    mockPosts = mockPosts.filter(p => p.id !== id);
    setTimeout(() => resolve(), 500);
  });
};
