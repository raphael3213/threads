import React from "react";
import Link from "next/link";
import Image from "next/image";

type ThreadCardProps = {
  key: string;
  id: string;
  currentUserId?: string;
  parentId: string | null;
  content: string;
  author: {
    name: string;
    image: string;
    id: string;
  };
  community: {
    name: string;
    image: string;
    id: string;
  } | null;
  createdAt: string;
  comments: {
    author: {
      image: string;
    };
  }[];
  isComment?: boolean;
};
function ThreadCard({
  key,
  id,
  currentUserId,
  parentId,
  content,
  author,
  createdAt,
  comments,
  isComment,
}: ThreadCardProps) {
  return (
    <article
      className={`flex w-full flex-col rounded-xl ${
        isComment ? "px-0 xs:px-7 mt-4" : "bg-dark-2 p-7"
      }`}
    >
      <div className="flex items-start justify-between">
        <div className="flex w-full flex-1 flex-row gap-4">
          <div className="flex flex-col items-center">
            <Link href={`/profile/${author.id}`} className="relative h-11 w-11">
              <Image
                src={author.image}
                alt="Profile Image"
                fill
                priority
                className="rounded-full cursor-pointer"
              />
            </Link>
            <div className="thread-card_bar" />
          </div>
          <div className="flex w-full flex-col">
            <Link href={`/profile/${author.id}`} className="w-fit">
              <h4 className="cursor-pointer text-base-semibold text-light-1">
                {author.name}
              </h4>
            </Link>
            <p className="mt-2 text-small-regular text-light-2">{content}</p>
            <div className="mt-5 flex-col gap-3">
              <div className="flex gap-3.5">
                <Image
                  src="/assets/heart-gray.svg"
                  alt="Profile Image"
                  height={24}
                  width={24}
                  priority
                  className="object-contain cursor-pointer"
                />
                <Link href={`/thread/${id}`} className="w-fit">
                  <Image
                    src="/assets/reply.svg"
                    alt="Profile Image"
                    height={24}
                    width={24}
                    priority
                    className="object-contain cursor-pointer"
                  />
                </Link>

                <Image
                  src="/assets/repost.svg"
                  alt="Profile Image"
                  height={24}
                  width={24}
                  priority
                  className="object-contain cursor-pointer"
                />
                <Image
                  src="/assets/share.svg"
                  alt="Profile Image"
                  height={24}
                  width={24}
                  priority
                  className="object-contain cursor-pointer"
                />
              </div>

              {isComment && comments.length > 0 && (
                <Link href={`/thread/${id}`} className="w-fit">
                  <p className="mt-1 text-subtle-medium text-gray-1">
                    {comments.length} replies
                  </p>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

export default ThreadCard;
