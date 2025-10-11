// types/index.d.ts
import { DecodedIdToken } from "firebase-admin/auth";

declare global {
  namespace Express {
    interface Request {
      user?: DecodedIdToken; // or your custom user type
    }
  }
}
