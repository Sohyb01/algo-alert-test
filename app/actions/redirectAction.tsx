"use server";

import { redirect } from "next/navigation";

export const redirectManually = async (path: string) => {
  redirect(path);
};
