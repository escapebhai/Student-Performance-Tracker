// Firebase Firestore Database Module
import { 
  collection, 
  addDoc, 
  getDocs, 
  getDoc,
  doc, 
  updateDoc, 
  deleteDoc, 
  query, 
  where,
  orderBy 
} from "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";
import { db } from "./config.js";

// Add a new student
export const addStudent = async (userId, studentData) => {
  try {
    const docRef = await addDoc(collection(db, "students"), {
      userId: userId,
      ...studentData,
      createdAt: new Date(),
      updatedAt: new Date()
    });
    return docRef.id;
  } catch (error) {
    console.error("Error adding student:", error);
    throw error;
  }
};

// Get all students for a user
export const getStudents = async (userId) => {
  try {
    const q = query(collection(db, "students"), where("userId", "==", userId));
    const querySnapshot = await getDocs(q);
    const students = [];
    querySnapshot.forEach((doc) => {
      students.push({ id: doc.id, ...doc.data() });
    });
    return students;
  } catch (error) {
    console.error("Error getting students:", error);
    throw error;
  }
};

// Get a single student
export const getStudent = async (studentId) => {
  try {
    const docRef = doc(db, "students", studentId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() };
    } else {
      console.log("Student not found");
      return null;
    }
  } catch (error) {
    console.error("Error getting student:", error);
    throw error;
  }
};

// Update student info
export const updateStudent = async (studentId, updateData) => {
  try {
    const docRef = doc(db, "students", studentId);
    await updateDoc(docRef, {
      ...updateData,
      updatedAt: new Date()
    });
    console.log("Student updated successfully");
  } catch (error) {
    console.error("Error updating student:", error);
    throw error;
  }
};

// Delete a student
export const deleteStudent = async (studentId) => {
  try {
    await deleteDoc(doc(db, "students", studentId));
    console.log("Student deleted successfully");
  } catch (error) {
    console.error("Error deleting student:", error);
    throw error;
  }
};

// Add performance metric
export const addPerformanceMetric = async (studentId, metricData) => {
  try {
    const docRef = await addDoc(collection(db, "performance"), {
      studentId: studentId,
      ...metricData,
      date: new Date(),
      createdAt: new Date()
    });
    return docRef.id;
  } catch (error) {
    console.error("Error adding performance metric:", error);
    throw error;
  }
};

// Get performance metrics for a student
export const getPerformanceMetrics = async (studentId) => {
  try {
    const q = query(
      collection(db, "performance"), 
      where("studentId", "==", studentId),
      orderBy("date", "desc")
    );
    const querySnapshot = await getDocs(q);
    const metrics = [];
    querySnapshot.forEach((doc) => {
      metrics.push({ id: doc.id, ...doc.data() });
    });
    return metrics;
  } catch (error) {
    console.error("Error getting performance metrics:", error);
    throw error;
  }
};

// Update user profile
export const updateUserProfile = async (userId, profileData) => {
  try {
    const docRef = doc(db, "users", userId);
    await updateDoc(docRef, {
      ...profileData,
      updatedAt: new Date()
    });
    console.log("Profile updated successfully");
  } catch (error) {
    console.error("Error updating profile:", error);
    throw error;
  }
};

// Get user profile
export const getUserProfile = async (userId) => {
  try {
    const docRef = doc(db, "users", userId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() };
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error getting user profile:", error);
    throw error;
  }
};
