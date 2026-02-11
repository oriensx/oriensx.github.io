"use client";

import { AnimatedBackground } from "@/components/motion-primitives/animated-background";
import { PostCard, type PostData } from "./post-card";

export function PostList({ posts }: { posts: PostData[] }) {
  return (
    <AnimatedBackground
      transition={{
        type: "spring",
        bounce: 0.2,
        duration: 0.6,
      }}
      enableHover
      className="rounded-lg bg-white/10 dark:bg-black/10"
    >
      {posts.map((post, index) => (
        <div key={post.slug} data-id={post.slug}>
          <PostCard post={post} index={index} />
        </div>
      ))}
    </AnimatedBackground>
  );
}
