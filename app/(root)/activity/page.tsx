import React from "react";
import { currentUser } from "@clerk/nextjs";
import { fetchUser, getActivity } from "@/lib/actions/user.actions";
import { redirect } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

async function Page() {
  const user = await currentUser();
  if (!user) return null;

  const userInfo = await fetchUser({ userId: user.id });
  if (!userInfo?.onboarded) redirect("/onboarding");

  const activity = await getActivity({ userId: userInfo._id });

  return (
    <section>
      <h1 className="head-text mb-10">Activity</h1>

      <section className="mt-10 flex flex-col gap-5 bg-dark-2 rounded-md">
        {activity?.length !== undefined && activity?.length > 0 ? (
          <>
            {activity?.map((activity) => (
              <Link key={activity._id} href={`/thread/${activity.parentId}`}>
                <article className="activity-card">
                  <Image
                    alt="Profile Picture"
                    src={activity.author.image}
                    width={35}
                    height={35}
                    className="rounded-full object-cover"
                  />
                  <p className="!text-small-regular text-light-2">
                    <span className="mr-1 text-primary-500">
                      {activity.author.name}
                    </span>{" "}
                    replied to your thread
                  </p>
                </article>
              </Link>
            ))}
          </>
        ) : (
          <p className="!text-base-regular text-light-3">No activity yet</p>
        )}
      </section>
    </section>
  );
}

export default Page;
