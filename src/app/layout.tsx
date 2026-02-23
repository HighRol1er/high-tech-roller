import type { Metadata } from 'next';
import { domine, jetbrainsmono, lora } from './fonts';
import '../shared/styles/globals.css';
import { AppSidebar, Header } from '@/components/layouts';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import { Toaster } from '@/components/ui/sonner';
import { supabase } from '@/lib/supabase';
import { ThemeProvider } from '@/providers';

export const metadata: Metadata = {
  title: 'HighTechRoller',
  description: '技術ブログ', // 기술블로그 라는 뜻
  icons: {
    icon: '/icon.svg',
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const getPostTags = async () => {
    const { data: allPosts } = await supabase.from('posts').select('tags');

    if (!allPosts) return { uniqueTags: [], tagCounts: {}, totalPostCount: 0 };

    const totalPostCount = allPosts.length;

    const tagCounts = allPosts
      .flatMap((p) => p.tags || [])
      .reduce(
        (acc, tag) => {
          acc[tag] = (acc[tag] || 0) + 1;
          return acc;
        },
        {} as Record<string, number>,
      );

    return {
      tagCounts,
      totalPostCount,
    };
  };

  const { tagCounts, totalPostCount } = await getPostTags();

  return (
    <html
      lang='en'
      className={`${domine.variable} ${lora.variable} ${jetbrainsmono.variable}`}
      suppressHydrationWarning
    >
      <body className={`antialiased`} suppressHydrationWarning>
        <ThemeProvider attribute='class' defaultTheme='dark' enableSystem disableTransitionOnChange>
          <SidebarProvider>
            <AppSidebar tagCounts={tagCounts} totalPost={totalPostCount} />
            <SidebarInset>
              <Header />
              <main>{children}</main>
              <Toaster />
            </SidebarInset>
          </SidebarProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
