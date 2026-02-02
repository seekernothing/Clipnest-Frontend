import { Twitter, Youtube, FileText, Link, Tag } from "lucide-react";
import { SidebarItem } from "./SidebarItem";

interface SidebarProps {
  selectedTab: string;
  onSelect: (tab: string) => void;
}

export const Sidebar = ({ selectedTab, onSelect }: SidebarProps) => {
  return (
    <div className="w-64 h-screen bg-white border-r border-gray-200 p-6 flex flex-col fixed left-0 top-0">
      <div
        className="flex items-center gap-2 mb-8 cursor-pointer"
        onClick={() => onSelect("all")}
      >
        <div className="text-violet-600">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-8"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S13.627 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.627 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418"
            />
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-gray-800">Second Brain</h1>
      </div>

      <div className="flex flex-col gap-2">
        <SidebarItem
          icon={<Twitter className="size-6" />}
          text="Tweets"
          active={selectedTab === "tweet"}
          onClick={() => onSelect("tweet")}
        />
        <SidebarItem
          icon={<Youtube className="size-6" />}
          text="Videos"
          active={selectedTab === "youtube"}
          onClick={() => onSelect("youtube")}
        />
        <SidebarItem
          icon={<FileText className="size-6" />}
          text="Documents"
          active={selectedTab === "document"}
          onClick={() => onSelect("document")}
        />
        <SidebarItem
          icon={<Link className="size-6" />}
          text="Links"
          active={selectedTab === "link"}
          onClick={() => onSelect("link")}
        />
        <SidebarItem
          icon={<Tag className="size-6" />}
          text="Tags"
          active={selectedTab === "tag"}
          onClick={() => onSelect("tag")}
        />
      </div>
    </div>
  );
};
