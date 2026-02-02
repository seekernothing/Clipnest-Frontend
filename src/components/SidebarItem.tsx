import type { ReactElement } from "react";

interface SidebarItemProps {
  icon: ReactElement;
  text: string;
  onClick?: () => void;
  active?: boolean;
}

export const SidebarItem = ({
  icon,
  text,
  onClick,
  active,
}: SidebarItemProps) => {
  return (
    <div
      onClick={onClick}
      className={`flex items-center gap-3 p-3 text-gray-700 hover:bg-gray-200 hover:text-gray-900 rounded-md cursor-pointer transition-colors duration-200 ${
        active ? "bg-gray-200 text-gray-900" : ""
      }`}
    >
      <div className="text-gray-600">{icon}</div>
      <span className="font-medium text-base">{text}</span>
    </div>
  );
};
