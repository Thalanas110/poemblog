import { useState } from "react";
import { type Poem } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Feather, Plus, Edit, Trash2, BookText, CalendarDays } from "lucide-react";

interface AdminPostsListProps {
  poems: Poem[] | undefined;
  isLoading: boolean;
  onNew: () => void;
  onEdit: (poem: Poem) => void;
  onDelete: (id: string) => void;
}

const AdminPostsList = ({ poems, isLoading, onNew, onEdit, onDelete }: AdminPostsListProps) => {
  const [poemToDelete, setPoemToDelete] = useState<Poem | null>(null);

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="admin-post-card rounded-2xl p-6 animate-pulse h-24" />
        ))}
      </div>
    );
  }

  if (!poems || poems.length === 0) {
    return (
      <div className="admin-post-card rounded-2xl py-16 text-center">
        <Feather className="h-12 w-12 text-amber-100/60 mx-auto mb-4" />
        <p className="text-amber-50/80 font-body text-lg mb-4">
          No poems yet. Start writing!
        </p>
        <Button onClick={onNew} className="admin-primary-btn font-ui gap-2">
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
          className="admin-post-card rounded-2xl p-4 md:p-5 animate-fade-in"
        >
          <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
            <div className="flex min-w-0 flex-1 items-start gap-4">
              <div className="admin-cover-frame">
                {poem.image_url ? (
                  <img
                    src={poem.image_url}
                    alt={poem.title}
                    className="h-full w-full rounded-xl object-cover"
                  />
                ) : (
                  <BookText className="h-5 w-5 text-amber-100/55" />
                )}
              </div>
              <div className="min-w-0 flex-1">
                <div className="mb-1.5 flex flex-wrap items-center gap-2">
                  <h3 className="truncate font-heading text-lg font-semibold text-amber-50">{poem.title}</h3>
                  <Badge
                    variant="outline"
                    className={poem.published
                      ? "border-emerald-300/30 bg-emerald-300/10 font-ui text-xs text-emerald-100"
                      : "border-orange-300/30 bg-orange-300/10 font-ui text-xs text-orange-100"
                    }
                  >
                    {poem.published ? "Published" : "Draft"}
                  </Badge>
                </div>
                <p className="font-ui text-sm text-amber-100/75">by {poem.author || "Unknown author"}</p>
                <div className="mt-2 flex items-center gap-2 font-ui text-xs text-amber-100/65">
                  <CalendarDays className="h-3.5 w-3.5" />
                  {new Date(poem.created_at).toLocaleDateString()}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 md:flex md:items-center">
              <Button
                variant="outline"
                onClick={() => onEdit(poem)}
                className="border-amber-100/25 bg-slate-950/20 font-ui text-amber-50 hover:bg-slate-900/45"
              >
                <Edit className="h-4 w-4" /> Edit
              </Button>
              <Button
                variant="outline"
                onClick={() => setPoemToDelete(poem)}
                className="border-rose-300/25 bg-rose-400/10 font-ui text-rose-100 hover:bg-rose-400/20"
              >
                <Trash2 className="h-4 w-4" /> Delete
              </Button>
            </div>
          </div>
        </div>
      ))}
      <AlertDialog
        open={Boolean(poemToDelete)}
        onOpenChange={(isOpen) => {
          if (!isOpen) {
            setPoemToDelete(null);
          }
        }}
      >
        <AlertDialogContent className="border-rose-300/25 bg-slate-950 text-amber-50">
          <AlertDialogHeader>
            <AlertDialogTitle className="font-heading text-xl text-amber-50">
              Delete this poem?
            </AlertDialogTitle>
            <AlertDialogDescription className="font-ui text-amber-100/75">
              {poemToDelete
                ? `This will permanently remove \"${poemToDelete.title}\" and cannot be undone.`
                : "This action cannot be undone."}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="border-amber-100/25 bg-slate-900/20 font-ui text-amber-50 hover:bg-slate-900/45">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                if (!poemToDelete) return;
                onDelete(poemToDelete.id);
                setPoemToDelete(null);
              }}
              className="bg-rose-500 font-ui text-white hover:bg-rose-600"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default AdminPostsList;
