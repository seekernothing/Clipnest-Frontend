import { useRef, useState } from "react";
import { X } from "lucide-react";
import { Button } from "./ui/Button";
import { Input } from "./ui/Input";
import { BACKEND_URL } from "../config";
import axios from "axios";

interface CreateContentModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const ContentType = {
  Youtube: "youtube",
  Twitter: "tweet",
} as const;

type ContentType = (typeof ContentType)[keyof typeof ContentType];

export const CreateContentModal = ({
  open,
  onClose,
  onSuccess,
}: CreateContentModalProps) => {
  const titleRef = useRef<HTMLInputElement>(null);
  const linkRef = useRef<HTMLInputElement>(null);
  const [type, setType] = useState<ContentType>(ContentType.Youtube);

  const handleSubmit = async () => {
    const title = titleRef.current?.value;
    const link = linkRef.current?.value;

    if (!title || !link) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      await axios.post(
        `${BACKEND_URL}/content`,
        {
          link,
          title,
          type,
        },
        {
          withCredentials: true,
        },
      );
      // manual reset since refs don't clear automatically
      if (titleRef.current) titleRef.current.value = "";
      if (linkRef.current) linkRef.current.value = "";
      onSuccess();
      onClose();
    } catch (e) {
      console.error(e);
      alert("Error adding content");
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X className="size-5" />
        </button>

        <h2 className="text-xl font-bold mb-6 text-gray-800">
          Add New Content
        </h2>

        <div className="space-y-4">
          <Input reference={titleRef} placeholder="Title" />
          <Input reference={linkRef} placeholder="Link" />

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-700">Type</label>
            <select
              className="px-4 py-2 border rounded-md outline-none focus:ring-2 focus:ring-violet-500 bg-white"
              value={type}
              onChange={(e) => setType(e.target.value as ContentType)}
            >
              <option value={ContentType.Youtube}>Youtube</option>
              <option value={ContentType.Twitter}>Twitter</option>
            </select>
          </div>

          <div className="flex justify-end pt-4">
            <Button
              onClick={handleSubmit}
              variant="primary"
              text="Submit"
              size="md"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
