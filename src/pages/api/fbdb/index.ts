// import { initializeApp } from "firebase/app";
// import { Database, getDatabase } from "firebase/database";

// const handler = async (
//   req: { method: string },
//   res: {
//     status: (arg0: number) => {
//       (): any;
//       new (): any;
//       json: { (arg0: { message: string }): any; new (): any };
//       send: { (arg0: { message: string | Database }): any; new (): any };
//     };
//   }
// ) => {
//   if (req.method !== "GET")
//     return res.status(405).json({ message: "Method not allowed" });

//   try {
//     const firebaseConfig = {
//       apiKey: process.env.FIREBASE_API_KEY,
//       authDomain: "project1-f8077.firebaseapp.com",
//       databaseURL:
//         "https://project1-f8077-default-rtdb.asia-southeast1.firebasedatabase.app/",
//       projectId: "project1-f8077",
//       storageBucket: "project1-f8077.appspot.com",
//       messagingSenderId: "530976265289",
//       appId: "1:530976265289:web:d936f1639cc0055c735b98",
//       measurementId: "G-1XX85GT3DY",
//     };

//     const app = initializeApp(firebaseConfig);

//     const db = getDatabase(app)

//     return res.status(200).send({ message: db });
//   } catch (error) {
//     console.log(error);
//     return res.status(418).send({ message: "Firebase Initialization Error" });
//   }
// };
// export default handler;
