import {
  Share2,
  Trash2,
  Youtube,
  Twitter,
  FileText,
  Link as LinkIcon,
  ExternalLink,
} from "lucide-react";
import { Tweet } from "react-tweet";

interface CardProps {
  title: string;
  link: string;
  type: "document" | "tweet" | "youtube" | "link";
  tags: (string | { title: string })[];
  createdAt: string; // ISO Date string
}

const getIcon = (type: string) => {
  switch (type) {
    case "youtube":
      return <Youtube className="size-5 text-gray-500" />;
    case "tweet":
      return <Twitter className="size-5 text-gray-500" />;
    case "document":
      return <FileText className="size-5 text-gray-500" />;
    case "link":
      return <LinkIcon className="size-5 text-gray-500" />;
    default:
      return <LinkIcon className="size-5 text-gray-500" />;
  }
};

const formatDate = (dateString: string) => {
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  } catch {
    return "";
  }
};

export const Card = ({ title, link, type, tags, createdAt }: CardProps) => {
  return (
    <div className="bg-white rounded-md border border-gray-200 shadow-sm p-4 w-72 h-80 flex flex-col justify-between hover:shadow-md transition-shadow">
      {/* Header */}
      <div>
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center gap-2">
            {getIcon(type)}
            <span className="font-medium text-gray-600 capitalize text-sm">
              {type}s
            </span>
          </div>
          <div className="flex items-center gap-2 text-gray-400">
            <button className="hover:text-gray-600 transition-colors cursor-pointer">
              <Share2 className="size-4" />
            </button>
            <button className="hover:text-gray-600 transition-colors cursor-pointer">
              <Trash2 className="size-4" />
            </button>
          </div>
        </div>

        <div className="mb-4 overflow-hidden h-40 overflow-y-auto custom-scrollbar">
          <h3 className="font-semibold text-lg text-gray-900 leading-tight mb-3 line-clamp-2">
            {title}
          </h3>

          <div className="text-sm text-gray-600">
            {type === "youtube" && link.includes("youtube") ? (
              <div
                className="rounded-md overflow-hidden aspect-video bg-gray-100 flex items-center justify-center relative group cursor-pointer mb-2"
                onClick={() => window.open(link, "_blank")}
              >
                <img
                  src={`https://img.youtube.com/vi/${link.split("v=")[1]?.split("&")[0] || ""}/sddefault.jpg`}
                  className="w-full h-full object-cover"
                  alt="thumbnail"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = "none";
                  }}
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                  <Youtube className="size-8 text-white/80" />
                </div>
              </div>
            ) : null}

            {type === "tweet" && (
              <div className="w-full h-full flex justify-center border rounded-md overflow-y-auto custom-scrollbar">
                <Tweet
                  id={
                    link
                      .replace("https://x.com/", "")
                      .replace("https://twitter.com/", "")
                      .split("/")[2] || ""
                  }
                />
              </div>
            )}

            {type === "link" || type === "document" ? (
              <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-violet-600 hover:underline flex items-center gap-1 my-2"
              >
                Visit <ExternalLink className="size-3" />
              </a>
            ) : null}
          </div>
        </div>
      </div>

      <div>
        <div className="flex flex-wrap gap-2 mb-3">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-violet-100 text-violet-600 text-xs font-medium rounded-full"
            >
              #{typeof tag === "string" ? tag : tag.title}
            </span>
          ))}
        </div>
        <div className="text-xs text-gray-400 font-medium">
          Added on {formatDate(createdAt)}
        </div>
      </div>
    </div>
  );
};
