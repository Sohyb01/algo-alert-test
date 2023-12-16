"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/options";

export const checkIfSubscribed = async () => {
  const session = await getServerSession(authOptions);
  return session?.user?.isActive;
};
