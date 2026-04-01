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
import { Feather, Plus, LogOut } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

const AdminDashboard = () => {
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [editingPoem, setEditingPoem] = useState<Poem | null>(null);
  const [showEditor, setShowEditor] = useState(false);
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
    <div className="min-h-screen bg-page">
      <div className="min-h-screen bg-background/80 backdrop-blur-sm">
        <header className="glass-panel border-b border-border/50">
          <div className="container mx-auto px-4 py-6 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Link to="/">
                <Feather className="h-6 w-6 text-primary" />
              </Link>
              <h1 className="text-xl font-heading font-bold text-foreground">Admin Dashboard</h1>
            </div>
            <div className="flex items-center gap-3">
              <Button
                onClick={() => {
                  setEditingPoem(null);
                  setShowEditor(true);
                }}
                size="sm"
                className="font-ui gap-2"
              >
                <Plus className="h-4 w-4" /> New Poem
              </Button>
              <Button onClick={handleLogout} variant="outline" size="sm" className="font-ui gap-2">
                <LogOut className="h-4 w-4" /> Logout
              </Button>
            </div>
          </div>
        </header>

        <div className="container mx-auto px-4 py-8">
          <Tabs defaultValue="posts">
            <TabsList className="font-ui mb-6 bg-secondary">
              <TabsTrigger value="posts">Posts</TabsTrigger>
              <TabsTrigger value="statistics">Statistics</TabsTrigger>
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
                  setEditingPoem(poem