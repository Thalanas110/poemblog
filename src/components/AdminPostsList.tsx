import { type Poem } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Feather, Plus, Edit, Trash2 } from "lucide-react";

interface AdminPostsListProps {
  poems: Poem[] | undefined;
  isLoading: boolean;
  onNew: () => void;
  onEdit: (poem: Poem) => void;
  onDelete: (id: string) => void;
}

const AdminPostsList = ({ poems, isLoading, onNew, onEdit, onDelete }: AdminPostsListProps) => {
  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="glass-panel rounded-lg p-6 animate-pulse h-24" />
        ))}
      </div>
    );
  }

  if (!poems || poems.length === 0) {
    return (
      <div className="text-center py-20">
        <Feather className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
        <p className="text-muted-foreground font-body text-lg mb-4">
          No poems yet. Start writing!
        </p>
        <Button onClick={onNew} className="font-ui gap-2">
          <Plus className="h-4 w-4" /> Create Your First Poem
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {poems.map((poem) => (
        <div
          key={poem.id}
          className="glass-panel rounded-lg p-6 flex items-start justify-between gap-4 animate-fade-in"
        >
          <div className="flex items-start gap-4 flex-1 min-w-0">
            {poem.image_url && (
              <img
                src={poem.image_url}
                alt={poem.title}
                className="w-16 h-16 rounded-md object-cover flex-shrink-0"
              />
            )}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3 mb-1">
                <h3 className="font-heading text-lg font-semibold text-foreground truncate">
                  {poem.title}
                </h3>
                <Badge variant={poem.published ? "default" : "secondary"} className="font-ui text-xs">
                  {poem.published ? "Published" : "Draft"}
                </Badge>
              </div>
              <p className="text-sm font-ui text-muted-foreground">
                by {poem.author} · {new Date(poem.created_at).toLocaleDateString()}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" onClick={() => onEdit(poem)}>
              <Edit className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => {
                if (confirm("Delete this poem?")) onDelete(poem.id);
              }}
            >
              <Trash2 className="h-4 w-4 text-destructive" />
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AdminPostsList;
