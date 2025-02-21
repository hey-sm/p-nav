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
import { TextAnimate } from "@/components/magicui/text-animate";
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
              text="Just some shiny text!"
              disabled={false}
              speed={1.5}
              className="custom-class"
            />
            {/* <TextAnimate animation="blurInUp" by="character">
              P-WebSide
            </TextAnimate> */}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  {item.children ? (
                    <Collapsible defaultOpen className="group/collapsible">
                      <CollapsibleTrigger asChild>
                        <SidebarMenuButton>
                          <Icon icon={item.icon} />
                          <span>{item.title}</span>
                        </SidebarMenuButton>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <SidebarMenuSub>
                          {item.children.map((child) => (
                            <SidebarMenuSubItem key={child.title}>
                              <SidebarMenuButton asChild>
                                <Link href={child.url}>
                                  <Icon icon={child.icon} />
                                  <span>{child.title}</span>
                                </Link>
                              </SidebarMenuButton>
                            </SidebarMenuSubItem>
                          ))}
                        </SidebarMenuSub>
                      </CollapsibleContent>
                    </Collapsible>
                  ) : (
                    <SidebarMenuButton asChild>
                      <Link href={item.url}>
                        <Icon icon={item.icon} className="w-10 h-10" />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
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
