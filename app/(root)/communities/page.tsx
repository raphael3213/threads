import React from "react";
import { currentUser } from "@clerk/nextjs";
import { fetchUser, fetchUsers } from "@/lib/actions/user.actions";
import { redirect } from "next/navigation";
import UserCard from "@/components/cards/UserCard";
import { fetchCommunities } from "@/lib/actions/community.actions";
import CommunityCard from "@/components/cards/CommunityCard";

async function Page() {
  const user = await currentUser();
  if (!user) return null;

  const userInfo = await fetchUser({ userId: user.id });
  if (!userInfo?.onboarded) redirect("/onboarding");

  const result = await fetchCommunities({
    pageNumber: 1,
    pageSize: 20,
    searchString: "",
    sortBy: "desc",
  });

  return (
    <section>
      <h1 className="head-text mb-10">Search</h1>

      <div className="mt-14 flex  flex-wrap gap-9">
        {result?.communities.length === 0 ? (
          <p className="no-result">No communities found</p>
        ) : (
          <>
            {result?.communities.map((community) => (
              <CommunityCard
                key={community.id}
                id={community.id}
                name={community.name}
                username={community.username}
                imgUrl={community.image}
                bio={community.bio}
                members={community.members}
              />
            ))}
          </>
        )}
      </div>
    </section>
  );
}

export default Page;
