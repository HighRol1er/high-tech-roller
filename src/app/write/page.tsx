import { redirect } from 'next/navigation';

export default function WritePage() {
  if (process.env.NODE_ENV === 'production') {
    redirect('/');
  }

  return (
    <div className='p-8'>
      <h1 className='text-2xl font-bold italic mb-4'>🛠️ Dev Mode: Write Page</h1>
      <p>이 페이지는 개발 환경에서만 접근 가능합니다.</p>
    </div>
  );
}
