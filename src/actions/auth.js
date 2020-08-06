import { auth } from "../firebase";

export const signOut = async () => {
  try {
    await auth.signOut();
    console.log("sign out successfully");
  } catch (error) {
    return { msg: "Error while sign out", error };
  }
};
