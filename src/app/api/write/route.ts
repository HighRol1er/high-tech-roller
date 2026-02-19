import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { db } from '@/db';
import { posts } from '@/db/schema/post';
import { postSchema } from '@/types';

export async function POST(req: NextRequest) {
  if (process.env.NODE_ENV === 'production') {
    return;
  }

  try {
    const body = await req.json();
    const result = postSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json({ error: result.error.issues[0].message }, { status: 400 });
    }

    const { title, content, tags, slug } = result.data;

    const newPost = await db
      .insert(posts)
      .values({
        title,
        content,
        tags,
        slug,
      })
      .returning();

    return NextResponse.json({ success: true, data: newPost[0] }, { status: 201 });
  } catch (error: unknown) {
    console.error('POST_ERROR:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
