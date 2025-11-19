import { FieldValue, Timestamp } from "firebase-admin/firestore";

/**
 * Defines all valid Firestore field data types.
 */
export type FirestoreDataTypes =
  | string
  | number
  | boolean
  | null
  | Timestamp
  | FieldValue;
