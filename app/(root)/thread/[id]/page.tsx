import ThreadCard from "@/components/cards/ThreadCard";
import React from "react";
import { currentUser } from "@clerk/nextjs";
import { fetchUser } from "@/lib/actions/user.actions";
import { redirect } from "next/navigation";
import { fetchThreadById } from "@/lib/actions/thread.actions";
import Comment from "@/components/forms/Comment";

async function Page({ params }: { params: { id: string } }) {
  if (!params.id) return null;

  const user = await currentUser();

  if (!user) return null;

  const userInfo = await fetchUser({ userId: user.id });

  if (!userInfo?.onboarded) redirect("/onboarding");

  const thread = await fetchThreadById(params.id);

  return (
    <section className="relative">
      <div>
        <ThreadCard
          key={thread._id}
          id={thread._id}
          currentUserId={user?.id}
          parentId={thread.parentId}
          content={thread.text}
          author={thread.author}
          comments={thread.children}
          createdAt={thread.createdAt}
          community={thread.community}
        />
      </div>
      <div className="mt-7">
        <Comment
          threadId={thread._id}
          currentUserImg={user.imageUrl}
          currentUserId={userInfo._id.toString()}
        />
      </div>
    </section>
  );
  return <div>Page</div>;
}

export default Page;
