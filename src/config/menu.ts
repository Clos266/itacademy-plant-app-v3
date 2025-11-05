import {
  MapPinIcon,
  LucideIcon,
  HomeIcon,
  LeafIcon,
  UserIcon,
} from "lucide-react";

type MenuItemType = {
  title: string;
  url: string;
  external?: string;
  icon?: LucideIcon;
  items?: MenuItemType[];
};
type MenuType = MenuItemType[];

export const mainMenu: MenuType = [
  {
    title: "Home",
    url: "/",
    icon: HomeIcon,
  },
  {
    title: "Events",
    url: "/events",
    icon: MapPinIcon,
  },
  {
    title: "My Plants",
    url: "/MyPlants",
    icon: LeafIcon,
  },
  {
    title: "Profile",
    url: "/profile",
    icon: UserIcon,
  },
];
