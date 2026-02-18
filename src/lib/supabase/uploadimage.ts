import { createClient } from '@/lib/supabase/client';

export const uploadPostImage = async (file: File) => {
  const supabase = createClient();

  // 1. 확장자 추출 및 체크
  const fileExt = file.name.split('.').pop()?.toLowerCase();

  if (!file.type.startsWith('image/')) {
    throw new Error('이미지 파일만 업로드 가능합니다.');
  }

  const fileName = `${crypto.randomUUID()}.${fileExt}`;
  const filePath = `${process.env.NEXT_PUBLIC_UPLOAD_KEY}/${fileName}`;

  const { data, error } = await supabase.storage.from('post').upload(filePath, file, {
    contentType: file.type,
    upsert: false,
  });

  if (error) throw error;

  const {
    data: { publicUrl },
  } = supabase.storage.from('post').getPublicUrl(filePath);

  return publicUrl;
};
