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
  description: 'テクノロジー', // 테그 블로그 라는 뜻
  icons: {
    icon: '/icon.svg',
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { data: allPosts } = await supabase.from('posts').select('tags');

  const tagCounts: Record<string, number> = {};
  (allPosts ?? []).forEach((post) => {
    (post.tags ?? []).forEach((tag: string) => {
      tagCounts[tag] = (tagCounts[tag] || 0) + 1;
    });
  });

  return (
    <html
      lang='en'
      className={`${domine.variable} ${lora.variable} ${jetbrainsmono.variable}`}
      suppressHydrationWarning
    >
      <body className={`antialiased`}>
        <ThemeProvider attribute='class' defaultTheme='dark' enableSystem disableTransitionOnChange>
          <SidebarProvider>
            <AppSidebar tagCounts={tagCounts} />
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
