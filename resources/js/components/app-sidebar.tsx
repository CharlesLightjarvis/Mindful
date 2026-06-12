import { Link, usePage } from '@inertiajs/react';
import { BookOpen, CreditCard, FolderGit2, GraduationCap, LayoutGrid } from 'lucide-react';
import AppLogo from '@/components/app-logo';
import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { dashboard } from '@/routes';
import type { NavItem } from '@/types';
import adminCourses from '@/actions/App/Http/Controllers/Admin/Courses/CourseController';
import adminPlans from '@/actions/App/Http/Controllers/Admin/Plans/PlanController';
import trainerCourses from '@/actions/App/Http/Controllers/Trainer/Courses/CourseController';

const footerNavItems: NavItem[] = [
    {
        title: 'Repository',
        href: 'https://github.com/laravel/react-starter-kit',
        icon: FolderGit2,
    },
    {
        title: 'Documentation',
        href: 'https://laravel.com/docs/starter-kits#react',
        icon: BookOpen,
    },
];

export function AppSidebar() {
    const { auth } = usePage().props;
    const user = auth.user;

    const mainNavItems: NavItem[] = [
        {
            title: 'Dashboard',
            href: dashboard(),
            icon: LayoutGrid,
        },
        ...(user?.is_admin
            ? [
                  {
                      title: 'Gestion des Cours',
                      href: adminCourses.index(),
                      icon: FolderGit2,
                  },
                  {
                      title: 'Plans formateurs',
                      href: adminPlans.index(),
                      icon: CreditCard,
                  },
              ]
            : []),
        ...(user?.is_trainer && !user?.is_admin
            ? [
                  {
                      title: 'Mes Cours',
                      href: trainerCourses.index(),
                      icon: FolderGit2,
                  },
              ]
            : []),
        ...(user?.is_student && !user?.is_admin && !user?.is_trainer
            ? [
                  {
                      title: 'Mes Formations',
                      href: '/student/courses',
                      icon: GraduationCap,
                  },
              ]
            : []),
    ];

    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={dashboard()} prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
