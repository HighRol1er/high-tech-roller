// import { NextResponse } from 'next/server';
// import { db } from '@/db';
// import { posts } from '@/db/schema/post';
// import { desc } from 'drizzle-orm'; // 정렬을 위해 필요

// export async function GET() {
//   try {
//     const allPosts = await db
//       .select({ id: posts.id, title: posts.title, slug: posts.slug, tags: posts.tags, createdAt: posts.createdAt })
//       .from(posts)
//       .orderBy(desc(posts.createdAt));

//     return NextResponse.json(allPosts, { status: 200 });
//   } catch (error) {
//     console.error('GET_POSTS_ERROR:', error);
//     return NextResponse.json({ error: '포스트 목록을 불러오는 중 오류가 발생했습니다.' }, { status: 500 });
//   }
// }
