/** @format */
import { Icon } from "@iconify/react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import Link from "next/link";
import { CoolMode } from "@/components/magicui/cool-mode";
import ShinyText from "@/components/reactbits/ShinyText";

const items = [
  {
    title: "Home",
    url: "/",
    icon: "ant-design:home-outlined",
  },
  {
    title: "Content",
    icon: "ant-design:folder-outlined",
    children: [
      {
        title: "Inbox",
        url: "#",
        icon: "pixelarticons:search",
      },
      {
        title: "verify",
        url: "/verify",
        icon: "ant-design:carry-out-outlined",
      },
      {
        title: "bookmark",
        url: "/bookmark",
        icon: "ant-design:book-outlined",
      },
    ],
  },
  {
    title: "Settings",
    url: "#",
    icon: "ant-design:setting-outlined",
  },
];

export function AppSidebar() {
  return (
    <Sidebar collapsible="offcanvas">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>
            <ShinyText
              text="PPPPP - WebSide"
              disabled={false}
              speed={3}
              className="text-lg"
            />
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  {item.children ? (
                    <Collapsible defaultOpen className="group/collapsible">
                      <CollapsibleTrigger asChild>
                        <CoolMode>
                          <SidebarMenuButton>
                            <Icon icon={item.icon} />
                            <span>{item.title}</span>
                          </SidebarMenuButton>
                        </CoolMode>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <SidebarMenuSub>
                          {item.children.map((child) => (
                            <SidebarMenuSubItem key={child.title}>
                              <CoolMode>
                                <SidebarMenuButton asChild>
                                  <Link href={child.url}>
                                    <Icon icon={child.icon} />
                                    <span>{child.title}</span>
                                  </Link>
                                </SidebarMenuButton>
                              </CoolMode>
                            </SidebarMenuSubItem>
                          ))}
                        </SidebarMenuSub>
                      </CollapsibleContent>
                    </Collapsible>
                  ) : (
                    <CoolMode>
                      <SidebarMenuButton asChild>
                        <Link href={item.url}>
                          <Icon icon={item.icon} className="w-10 h-10" />
                          <span>{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </CoolMode>
                  )}
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
