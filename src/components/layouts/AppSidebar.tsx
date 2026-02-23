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
  SidebarFooter,
} from '@/components/ui/sidebar';
import { slugify } from '@/lib';
import { NAV } from '@/shared/constants';

interface AppSidebarProps {
  tagCounts: Record<string, number>;
  totalPost: number;
}

export function AppSidebar({ tagCounts, totalPost }: AppSidebarProps) {
  const tags = Object.keys(tagCounts).sort();

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
                    <Link
                      href={item.url}
                      target={item.isExternal ? '_blank' : '_self'}
                      rel={item.isExternal ? 'noopener noreferrer' : undefined}
                    >
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
              <SidebarMenuItem>
                <DarkMode />
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <Separator />

        <SidebarGroup className='group-data-[collapsible=icon]:hidden'>
          <SidebarGroupLabel className='font-figtree'>Post Tags</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href='/' className='flex items-center justify-between w-full'>
                    <span>All Posts</span>
                    <Badge variant='secondary' className='bg-blue-500 text-white dark:bg-blue-950 dark:text-blue-300'>
                      {totalPost}
                    </Badge>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              {tags.map((tag) => (
                <SidebarMenuItem key={tag}>
                  <SidebarMenuButton asChild>
                    <Link href={`/?tag=${slugify(tag)}`} className='flex items-center justify-between w-full'>
                      <span className='truncate'># {tag}</span>
                      <span className='text-sm text-muted-foreground ml-2'>({tagCounts[tag]})</span>
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
