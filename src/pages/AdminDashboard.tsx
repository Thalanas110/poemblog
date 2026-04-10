import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchPoems,
  createPoem,
  updatePoem,
  deletePoem,
  checkAdmin,
  logout,
  type Poem,
} from "@/lib/api";
import AdminLogin from "@/components/AdminLogin";
import PoemEditor from "@/components/PoemEditor";
import AdminPostsList from "@/components/AdminPostsList";
import AdminStatistics from "@/components/AdminStatistics";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ConfirmModal } from "@/components/Modals";
import { Feather, Sparkles, Plus, LogOut, ScrollText } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

const AdminDashboard = () => {
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [editingPoem, setEditingPoem] = useState<Poem | null>(null);
  const [showEditor, setShowEditor] = useState(false);
  const [logoutConfirmOpen, setLogoutConfirmOpen] = useState(false);
  const queryClient = useQueryClient();

  useEffect(() => {
    checkAdmin().then(setIsAdmin);
  }, []);

  const { data: poems, isLoading } = useQuery<Poem[]>({
    queryKey: ["admin-poems"],
    queryFn: () => fetchPoems(true),
    enabled: isAdmin === true,
  });

  const createMutation = useMutation({
    mutationFn: (poem: Partial<Poem>) => createPoem(poem),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-poems"] });
      queryClient.invalidateQueries({ queryKey: ["poems"] });
      queryClient.invalidateQueries({ queryKey: ["poem"] });
      queryClient.invalidateQueries({ queryKey: ["poem-stats"] });
      setShowEditor(false);
      toast.success("Poem created!");
    },
    onError: (error) => {
      const message = error instanceof Error ? error.message : "Failed to create poem";
      toast.error(message);
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, ...poem }: Partial<Poem> & { id: string }) => updatePoem(id, poem),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-poems"] });
      queryClient.invalidateQueries({ queryKey: ["poems"] });
      queryClient.invalidateQueries({ queryKey: ["poem"] });
      queryClient.invalidateQueries({ queryKey: ["poem-stats"] });
      setEditingPoem(null);
      setShowEditor(false);
      toast.success("Poem updated!");
    },
    onError: (error) => {
      const message = error instanceof Error ? error.message : "Failed to update poem";
      toast.error(message);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deletePoem(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-poems"] });
      queryClient.invalidateQueries({ queryKey: ["poems"] });
      queryClient.invalidateQueries({ queryKey: ["poem"] });
      queryClient.invalidateQueries({ queryKey: ["poem-stats"] });
      toast.success("Poem deleted.");
    },
    onError: (error) => {
      const message = error instanceof Error ? error.message : "Failed to delete poem";
      toast.error(message);
    },
  });

  const handleSave = (poem: Partial<Poem>) => {
    if (editingPoem) {
      updateMutation.mutate({ id: editingPoem.id, ...poem });
    } else {
      createMutation.mutate(poem);
    }
  };

  const handleLogout = async () => {
    await logout();
    setIsAdmin(false);
  };

  const totalPoems = poems?.length ?? 0;
  const publishedPoems = poems?.filter((poem) => poem.published).length ?? 0;
  const draftPoems = Math.max(totalPoems - publishedPoems, 0);
  const latestTitle = poems?.[0]?.title;

  if (isAdmin === null) {
    return (
      <div className="min-h-screen bg-page">
        <div className="min-h-screen bg-background/80 backdrop-blur-sm flex items-center justify-center">
          <Feather className="h-8 w-8 text-primary animate-pulse" />
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return <AdminLogin onLogin={() => setIsAdmin(true)} />;
  }

  if (showEditor) {
    return (
      <PoemEditor
        poem={editingPoem}
        onSave={handleSave}
        onCancel={() => {
          setShowEditor(false);
          setEditingPoem(null);
        }}
        saving={createMutation.isPending || updateMutation.isPending}
      />
    );
  }

  return (
    <div className="admin-shell min-h-screen bg-page">
      <div className="admin-shell-overlay min-h-screen">
        <header className="admin-topbar border-b border-amber-100/15">
          <div className="container mx-auto px-4 py-4 md:py-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex min-w-0 items-center gap-3">
                <Link to="/" className="admin-glyph">
                  <Sparkles className="h-5 w-5 text-amber-200" />
                </Link>
                <div className="min-w-0">
                  <p className="font-ui text-xs uppercase tracking-[0.2em] text-amber-100/70">Enchanted Console</p>
                  <h1 className="truncate text-lg font-heading font-semibold text-amber-50 md:text-2xl">
                    Poems Control Room
                  </h1>
                </div>
              </div>
              <div className="flex w-full items-center gap-2 sm:w-auto">
                <Button
                  onClick={() => {
                    setEditingPoem(null);
                    setShowEditor(true);
                  }}
                  size="sm"
                  className="admin-primary-btn font-ui gap-2 flex-1 sm:flex-none"
                >
                  <Plus className="h-4 w-4" /> New Poem
                </Button>
                <Button
                  onClick={() => setLogoutConfirmOpen(true)}
                  variant="outline"
                  size="sm"
                  className="font-ui gap-2 border-amber-200/25 bg-slate-900/25 text-amber-50 hover:bg-slate-900/55"
                >
                  <LogOut className="h-4 w-4" /> Logout
                </Button>
              </div>
            </div>
          </div>
        </header>

        <ConfirmModal
          open={logoutConfirmOpen}
          title="Confirm logout"
          description="Logging out will end your current session. Any unsaved changes in the editor will be lost."
          confirmLabel="Logout"
          cancelLabel="Stay logged in"
          onCancel={() => setLogoutConfirmOpen(false)}
          onConfirm={() => {
            handleLogout();
            setLogoutConfirmOpen(false);
          }}
        />

        <div className="container mx-auto px-4 py-6 md:py-8">
          <Tabs defaultValue="posts">
            <section className="admin-overview-band mb-5 hidden items-center gap-4 rounded-2xl p-5 md:grid md:grid-cols-[1.4fr_repeat(3,minmax(0,1fr))] md:mb-7">
              <div className="min-w-0">
                <p className="font-ui text-xs uppercase tracking-[0.18em] text-amber-100/65">Royal Briefing</p>
                <h2 className="mt-1 truncate text-2xl font-heading font-semibold text-amber-50">
                  {latestTitle ? `Latest manuscript: ${latestTitle}` : "Your archive awaits its first manuscript"}
                </h2>
                <p className="mt-1 font-ui text-sm text-amber-100/75">
                  Curate, polish, and publish every verse with the council tools below.
                </p>
              </div>
              <div className="admin-overview-pill">
                <span className="admin-overview-label">Total</span>
                <span className="admin-overview-value">{totalPoems}</span>
              </div>
              <div className="admin-overview-pill">
                <span className="admin-overview-label">Published</span>
                <span className="admin-overview-value">{publishedPoems}</span>
              </div>
              <div className="admin-overview-pill">
                <span className="admin-overview-label">Drafts</span>
                <span className="admin-overview-value">{draftPoems}</span>
              </div>
            </section>

            <TabsList className="admin-tabs-list mb-5 md:mb-7">
              <TabsTrigger value="posts" className="admin-tab-trigger font-ui">
                <ScrollText className="h-4 w-4" />
                Posts
              </TabsTrigger>
              <TabsTrigger value="statistics" className="admin-tab-trigger font-ui">
                <Sparkles className="h-4 w-4" />
                Statistics
              </TabsTrigger>
            </TabsList>
            <TabsContent value="posts">
              <AdminPostsList
                poems={poems}
                isLoading={isLoading}
                onNew={() => {
                  setEditingPoem(null);
                  setShowEditor(true);
                }}
                onEdit={(poem) => {
                  setEditingPoem(poem);
                  setShowEditor(true);
                }}
                onDelete={(id) => deleteMutation.mutate(id)}
              />
            </TabsContent>
            <TabsContent value="statistics">
              <AdminStatistics poems={poems} />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
