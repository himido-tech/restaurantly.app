import { FirestoreAdapter } from "@next-auth/firebase-adapter";
import { Adapter } from "next-auth/adapters";

// This is firebase admin sdk instance which is wrapped in a next-auth adapter
export const fireStoreAdapter = FirestoreAdapter() as Adapter
