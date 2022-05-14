import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

// Start writing Firebase Functions

admin.initializeApp();

export const helloWorld = functions.https.onRequest((request, response) => {
  response.status(200).send("Hello from Firebase!");
});

export const callable = functions.https.onCall(async (data, context) => {
  if (context.auth != null) {
    const ref: any = await admin.firestore().doc("col/doc").get();
    return `${Object.values(ref.data())}`;
  } else {
    throw new functions.https.HttpsError("unauthenticated",
        `${401}. Please authenticate before trying to view any data.`);
  }
});
