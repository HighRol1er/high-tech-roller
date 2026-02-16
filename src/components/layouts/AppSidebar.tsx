import Link from 'next/link';
// import { Logo } from '@/components/common';
// import { Tags } from '@/components/posts';
import { DarkMode } from '../DarkMode';
import Logo from '@/components/common/Logo';
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

export function AppSidebar() {
  return (
    <Sidebar collapsible='icon'>
      <SidebarHeader>
        <div className='flex items-center gap-2 px-2 py-1.5'>
          <div className='flex flex-col group-data-[collapsible=icon]:hidden'>
            <Logo />
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {NAV.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild tooltip={item.title} className='font-figtree'>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
              <DarkMode />
              <Separator />

              {/* {location.pathname.includes('/posts') && (
                <div className='group-data-[collapsible=icon]:hidden'>
                  <SidebarGroupLabel className='font-figtree'>Post Tags</SidebarGroupLabel>
                  <Link to='/posts'>
                    <SidebarMenuButton tooltip='All Posts'>
                      <Tags className='dark:bg-green-950 dark:text-green-300'>All ({posts.length})</Tags>
                    </SidebarMenuButton>
                  </Link>
                  {Array.from(tags)
                    .sort()
                    .map((tag) => (
                      <SidebarMenuItem key={tag}>
                        <SidebarMenuButton tooltip={tag}>
                          <Link to={`/posts?tag=${tag}`}>
                            <Tags>
                              {tag} ({getTagCount(tag)})
                            </Tags>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                </div>
              )} */}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
