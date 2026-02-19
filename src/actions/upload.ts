'use server';

import { createClient } from '@/lib/supabase/server'; // 서버용 클라이언트 사용
import sharp from 'sharp';

export const uploadPostImageAction = async (formData: FormData) => {
  // 개발 환경인지 체크 (선택 사항: 더 안전하게 관리하고 싶을 때)
  if (process.env.NODE_ENV !== 'development') {
    throw new Error('운영 환경에서는 업로드를 지원하지 않습니다.');
  }

  const file = formData.get('file') as File;
  if (!file) throw new Error('파일이 없습니다.');

  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  const optimizedBuffer = await sharp(buffer)
    .resize(1200, null, {
      withoutEnlargement: true, // 원본보다 커지지 않게
      fit: 'inside',
    })
    .webp({ quality: 75, effort: 6 }) // 품질 75, 압축 노력 최대
    .toBuffer();

  const supabase = await createClient();
  const fileName = `${crypto.randomUUID()}.webp`;
  const filePath = `${process.env.NEXT_PUBLIC_UPLOAD_KEY}/${fileName}`;

  // 3. Supabase Storage 업로드
  const { data, error } = await supabase.storage.from('post').upload(filePath, optimizedBuffer, {
    contentType: 'image/webp',
    upsert: false,
  });

  if (error) throw error;

  const {
    data: { publicUrl },
  } = supabase.storage.from('post').getPublicUrl(filePath);

  return { publicUrl };
};
