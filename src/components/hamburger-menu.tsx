import { useState } from "react";
import { ChevronRight, Menu } from "lucide-react";
import { mainMenu } from "@/config/menu";
import { NavLink, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

export function HamburgerMenu() {
  const location = useLocation();
  const [openSubmenus, setOpenSubmenus] = useState<Record<string, boolean>>({});

  const toggleSubmenu = (title: string) => {
    setOpenSubmenus((prev) => ({ ...prev, [title]: !prev[title] }));
  };

  return (
    <div className="flex items-center md:hidden">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7 data-[state=open]:bg-accent"
          >
            <Menu />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="w-56 overflow-hidden rounded-lg p-1"
          align="start"
        >
          <nav className="flex flex-col gap-1">
            {mainMenu.map((item, index) =>
              item.items && item.items.length > 0 ? (
                <div key={item.title}>
                  <button
                    onClick={() => toggleSubmenu(item.title)}
                    className="flex w-full items-center gap-2 rounded-md p-2 text-left text-sm hover:bg-accent hover:text-accent-foreground transition-colors"
                  >
                    {item.icon && <item.icon className="size-4" />}
                    <span>{item.title}</span>
                    <ChevronRight
                      className={cn(
                        "ml-auto size-3 transition-transform duration-200",
                        openSubmenus[item.title] && "rotate-90"
                      )}
                    />
                  </button>
                  {openSubmenus[item.title] && (
                    <div className="ml-6 flex flex-col gap-1 py-1">
                      {item.items?.map((subItem) => (
                        <NavLink
                          key={subItem.title}
                          to={subItem.url}
                          className={cn(
                            "flex h-7 items-center gap-2 rounded-md px-2 text-sm hover:bg-accent hover:text-accent-foreground transition-colors",
                            subItem.url === location.pathname &&
                              "bg-accent text-accent-foreground"
                          )}
                        >
                          <span>{subItem.title}</span>
                        </NavLink>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <NavLink
                  key={index}
                  to={item.url}
                  className={cn(
                    "flex items-center gap-2 rounded-md p-2 text-sm hover:bg-accent hover:text-accent-foreground transition-colors",
                    item.url === location.pathname &&
                      "bg-accent text-accent-foreground"
                  )}
                >
                  {item.icon && <item.icon className="size-4" />}
                  <span>{item.title}</span>
                </NavLink>
              )
            )}
          </nav>
        </PopoverContent>
      </Popover>
    </div>
  );
}
