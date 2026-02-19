import Link from 'next/link';
import { Badge } from '../ui/badge';
import { Logo, DarkMode } from '@/components/common';
import { Separator } from '@/components/ui/separator';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { NAV } from '@/shared/constants';

interface AppSidebarProps {
  // 태그 이름과 해당 태그가 포함된 포스트 개수를 함께 받는 것이 좋습니다.
  tagCounts: Record<string, number>;
}

export function AppSidebar({ tagCounts }: AppSidebarProps) {
  const tags = Object.keys(tagCounts).sort();
  const totalPosts = Object.values(tagCounts).reduce((a, b) => a + b, 0);

  return (
    <Sidebar collapsible='icon'>
      <SidebarHeader className='h-16 flex items-center px-4'>
        <Logo />
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {NAV.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild tooltip={item.title}>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
              <div>
                <DarkMode />
              </div>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <Separator />

        {/* 섹션 2: 태그 네비게이션 (독립된 Group으로 분리) */}
        <SidebarGroup className='group-data-[collapsible=icon]:hidden'>
          <SidebarGroupLabel className='font-figtree'>Post Tags</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {/* 전체 보기 */}
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href='/' className='flex items-center justify-between w-full'>
                    <span>All Posts</span>
                    <Badge variant='secondary' className='bg-blue-500 text-white dark:bg-blue-950 dark:text-blue-300'>
                      {totalPosts}
                    </Badge>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              {/* 개별 태그 목록 */}
              {tags.map((tag) => (
                <SidebarMenuItem key={tag}>
                  <SidebarMenuButton asChild>
                    <Link href={`/?tag=${tag}`} className='flex items-center justify-between w-full'>
                      <span className='truncate'># {tag}</span>
                      <span className='text-[10px] text-muted-foreground ml-2 font-mono'>({tagCounts[tag]})</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
