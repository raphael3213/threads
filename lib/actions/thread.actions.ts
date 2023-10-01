"use server";

import { revalidatePath } from "next/cache";
import Thread from "../models/thread.model";
import { User } from "../models/user.model";
import { connectToDB } from "../mongoose";

type CreateThreadProps = {
  text: string;
  author: string;
  community: string | null;
  path: string;
};

export async function createThread({
  text,
  author,
  community,
  path,
}: CreateThreadProps) {
  try {
    connectToDB();

    const createdThread = await Thread.create({ text, author, community });

    await User.findByIdAndUpdate(author, {
      $push: { threads: createdThread._id },
    });

    revalidatePath(path);
  } catch (error) {
    if (error instanceof Error)
      throw new Error(`Error in Thread creation : ${error.message}`);
  }
}
