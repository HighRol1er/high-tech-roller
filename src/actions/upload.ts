'use server';

import { createClient } from '@/lib/supabase/server';

export const uploadPostImageAction = async (formData: FormData) => {
  if (process.env.NODE_ENV !== 'development') {
    throw new Error('운영 환경에서는 업로드를 지원하지 않습니다.');
  }

  const file = formData.get('file') as File;
  if (!file) throw new Error('파일이 없습니다.');

  const supabase = await createClient();
  const fileName = `${crypto.randomUUID()}.webp`;
  const filePath = `${process.env.NEXT_PUBLIC_UPLOAD_KEY}/${fileName}`;

  const { error } = await supabase.storage.from('post').upload(filePath, file, {
    contentType: file.type,
    upsert: false,
  });

  if (error) throw error;

  const {
    data: { publicUrl },
  } = supabase.storage.from('post').getPublicUrl(filePath);

  return { publicUrl };
};
