import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
  getFirestore,
  collection,
  getDocs,
  getDoc,
  doc,
} from "firebase/firestore";
import { getStorage, ref, listAll, getDownloadURL } from "firebase/storage";
import { useDataStore } from "src/stores/dataStore";

// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli/boot-files
const limitPagination = 8;
const firebaseConfig = {
  apiKey: "AIzaSyCJoeO_Z53VI0SwVM0yHxs-fBJcicE1O24",
  authDomain: "shoesstore-33dd3.firebaseapp.com",
  projectId: "shoesstore-33dd3",
  storageBucket: "shoesstore-33dd3.appspot.com",
  messagingSenderId: "653130539370",
  appId: "1:653130539370:web:356e1bfe67c9758b9a0513",
  measurementId: "G-50VM2L1ESL",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);
const storage = getStorage(app);

let countDocs = 0;

// Obtener un producto por su ID
const getProduct = async (docID) => {
  const docRef = doc(db, "products", docID);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    const product = docSnap.data();
    product.id = docID;
    getImagesProduct(product);
  } else {
    console.log("No such document!");
  }
};

// Obtener todos los productos
export const getProducts = async () => {
  const response = await getDocs(collection(db, "products"));
  const docsLength = response.docs.length;
  response.forEach((doc) => {
    const product = {
      id: doc.id,
      name: doc.data().name,
      price: doc.data().price,
      brand: doc.data().brand,
      size: doc.data().size,
      gender: doc.data().gender,
      imagesURL: [],
    };

    useDataStore()
      .brands.map((brand) => brand.name)
      .includes(product.brand)
      ? useDataStore().brands[
          useDataStore()
            .brands.map((brand) => brand.name)
            .indexOf(product.brand)
        ].count++
      : useDataStore().brands.push({
          name: product.brand,
          count: 1,
          active: false,
        });
    getImagesProduct(product, docsLength);
  });
};

const getImagesProduct = (product, totalProducts) => {
  const listRef = ref(storage, product.id);
  listAll(listRef)
    .then((res) => {
      const numImagesProduct = res.items.length;
      res.items.forEach((imageRef) => {
        getDownloadURL(ref(storage, imageRef.fullPath))
          .then((url) => {
            product.imagesURL.push(url);
            if (numImagesProduct === product.imagesURL.length) {
              useDataStore().shoes.push(product);
              countDocs++;
              if (countDocs === totalProducts) {
                useDataStore().isFullied = true;
              }
            }
          })
          .catch((error) => {
            console.log("error on download image", error);
          });
      });
    })
    .catch((error) => {
      console.log("error al obtener la imagenes ", error);
    });
};
