const { initializeApp, cert } = require("firebase-admin/app");

const { getFirestore } = require("firebase-admin/firestore");

const base64EncodedServiceAccount =
  process.env.FIREBASE_ADMINSDK_BASE64_ENCODED;
const decodedServiceAccount = Buffer.from(
  base64EncodedServiceAccount,
  "base64"
).toString("utf-8");
const firebaseConfig = JSON.parse(decodedServiceAccount);

// If no apps already exist, initialize the app
initializeApp({
  credential: cert(firebaseConfig),
});

const db = getFirestore();

// Set Firestore settings to use ignoreUndefinedProperties
db.settings({
  ignoreUndefinedProperties: true,
});

/**
 *
 */
const getRef = (path) => {
  let ref = db;

  // Iterate through the path array to build the reference
  for (let i = 0; i < path.length; i++) {
    const segment = path[i];
    if (i % 2 === 0) {
      // Even index: collection name
      ref = ref.collection(segment);
    } else {
      // Odd index: document ID
      ref = ref.doc(segment);
    }
  }

  return ref;
};

/**
 * Generic Helper: Get all documents from a nested collection
 * @param {...String} path - Indeterminate number of arguments representing the path to the nested collection
 */
const getItems = async (...path) => {
  if (path.length % 2 === 0) {
    throw new Error("Path must be an odd number of arguments");
  }

  let collectionRef = getRef(path);

  const snapshot = await collectionRef.get();

  return snapshot.docs.map((doc) => {
    return {
      id: doc.id,
      ...doc.data(),
    };
  });
};

/**
 * Generic Helper: Get a document from a collection
 */
const getItem = async (...path) => {
  // Path must be an even number of arguments
  if (path.length % 2 !== 0) {
    throw new Error("Path must be an even number of arguments");
  }

  let docRef = getRef(path);

  const doc = await docRef.get();

  return {
    id: doc.id,
    ...doc.data(),
  };
};

/**
 * Generic Helper: Search documents in a nested collection
 * @param {String} searchKey - The key to search by
 * @param {String} searchTerm - The term to search for
 * @param {...String} path - Indeterminate number of arguments representing the path to the nested collection
 */
const searchItems = async (searchKey, searchTerm, ...path) => {
  if (path.length % 2 === 0) {
    throw new Error("Path must be an odd number of arguments");
  }

  let collectionRef = getRef(path);

  const snapshot = await collectionRef.where(searchKey, "==", searchTerm).get();

  return snapshot.docs.map((doc) => {
    return {
      id: doc.id,
      ...doc.data(),
    };
  });
};

/**
 * Generic Helper: Query documents in a collection chaining multiple where methods
 *
 * Example to find a phase:
 * queryItems("phases", [
 *  { key: "phase", operator: "==", value: 0 },
 *  { key: "team", operator: "==", value: "r2rZ3VPlU7x2HX3nzLE0" }
 * ]);
 */
const queryItems = async (queries, ...path) => {
  if (path.length % 2 === 0) {
    throw new Error("Path must be an odd number of arguments");
  }

  let collectionRef = getRef(path);

  queries.forEach((query) => {
    collectionRef = collectionRef.where(query.key, query.operator, query.value);
  });

  const snapshot = await collectionRef.get();

  return snapshot.docs.map((doc) => {
    return {
      id: doc.id,
      ...doc.data(),
    };
  });
};

/**
 * Generic Helper: Add a document to a nested collection
 * @param {Object} docData
 * @param {...String} path - Indeterminate number of arguments representing the path to the nested collection
 */
const addItem = async (docData, ...path) => {
  // Path must be an even number of arguments
  if (path.length % 2 === 0) {
    throw new Error("Path must be an odd number of arguments");
  }

  let collectionRef = getRef(path);

  const newItemRef = await collectionRef.add(docData);
  const newItemDoc = await newItemRef.get();

  return {
    id: newItemRef.id,
    ...newItemDoc.data(),
  };
};

/**
 * Generic Helper: Set a document in a nested collection
 * @param {Object} docData
 * @param {...String} path - Indeterminate number of arguments representing the path to the nested collection
 */
const setItem = async (docData, ...path) => {
  // Path must be an even number of arguments
  if (path.length % 2 !== 0) {
    throw new Error("Path must be an even number of arguments");
  }

  let ref = getRef(path);

  await ref.set(docData);

  // Get the document that was just set
  const newItemDoc = await ref.get();

  return {
    id: newItemDoc.id,
    ...newItemDoc.data(),
  };
};

/**
 * Generic Helper: Delete a document from a nested collection
 * @param {...String} path - Indeterminate number of arguments representing the path to the nested collection
 */
const deleteItem = async (...path) => {
  // Path must be an even number of arguments
  if (path.length % 2 !== 0) {
    throw new Error("Path must be an even number of arguments");
  }

  let ref = getRef(path);

  return await ref.delete();
};

/**
 * Generic Helper: Update a document in a nested collection
 * @param {Object} docData
 * @param {...String} path - Indeterminate number of arguments representing the path to the nested collection
 */
const updateItem = async (docData, ...path) => {
  // Path must be an even number of arguments
  if (path.length % 2 !== 0) {
    throw new Error("Path must be an even number of arguments");
  }

  let documentRef = getRef(path);

  await documentRef.update(docData);

  const updatedItemDoc = await documentRef.get();

  const docID = updatedItemDoc.id;

  return {
    id: docID,
    ...updatedItemDoc.data(),
  };
};

module.exports = {
  getItems,
  getItem,
  searchItems,
  addItem,
  setItem,
  deleteItem,
  updateItem,
  queryItems,
};
