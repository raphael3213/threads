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

//: Promise<{ posts: Array<typeof Thread>; isNext: boolean } | undefined>
export async function fetchPosts(pageNumber = 1, pageSize = 20) {
  try {
    connectToDB();

    const skipAmount = (pageNumber - 1) * pageSize;
    const postsQuery = Thread.find({
      parentId: { $in: [null, undefined] },
    })
      .sort({ createdAt: "desc" })
      .skip(skipAmount)
      .limit(pageSize)
      .populate({ path: "author", model: User })
      .populate({
        path: "children",
        populate: {
          path: "author",
          model: User,
          select: "_id name parentId image",
        },
      });

    const totalPostsCount = await Thread.countDocuments({
      parentId: { $in: [null, undefined] },
    });

    const posts = await postsQuery.exec();

    const isNext = totalPostsCount > skipAmount + posts.length;
    return { posts, isNext };
  } catch (error) {
    if (error instanceof Error)
      throw new Error(`Error in Threads fetch : ${error.message}`);
  }
}
