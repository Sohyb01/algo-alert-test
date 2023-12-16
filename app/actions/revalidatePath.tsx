"use server";

import { revalidatePath } from "next/cache";

export const revalidatePathManually = async (url: string | undefined) => {
  url ? revalidatePath(url) : revalidatePath("/");
};
