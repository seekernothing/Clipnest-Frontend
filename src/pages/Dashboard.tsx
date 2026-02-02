import { Share2 } from "lucide-react";
import { useState } from "react";
import { Card } from "../components/Card";
import { CreateContentModal } from "../components/CreateContentModal";
import { Sidebar } from "../components/Sidebar";
import { Button } from "../components/ui/Button";
import { useContent } from "../hooks/useContent";
import { PlusIcon } from "../icons/PlusIcon";

export const Dashboard = () => {
  const { contents, refresh } = useContent();
  const [modalOpen, setModalOpen] = useState(false);
  const [filter, setFilter] = useState("all");

  const filteredContents =
    filter === "all" ? contents : contents.filter((c) => c.type === filter);

  return (
    <div>
      <Sidebar selectedTab={filter} onSelect={setFilter} />
      <div className="p-4 ml-64 min-h-screen bg-gray-100 border-2 border-slate-100">
        <CreateContentModal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          onSuccess={() => refresh()}
        />
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold font-sans">All Notes</h2>
          <div className="flex gap-2">
            <Button
              startIcon={<Share2 className="size-4" />}
              variant="secondary"
              text="Share Brain"
            />
            <Button
              onClick={() => setModalOpen(true)}
              startIcon={<PlusIcon className="size-4" />}
              variant="primary"
              text="Add Content"
            />
          </div>
        </div>

        <div className="flex gap-4 flex-wrap">
          {filteredContents.map(
            ({ type, link, title, _id, tags, createdAt }) => (
              <Card
                key={_id}
                type={type}
                link={link}
                title={title}
                tags={tags}
                createdAt={createdAt}
              />
            ),
          )}
        </div>
      </div>
    </div>
  );
};
