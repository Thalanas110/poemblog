import { useQuery } from "@tanstack/react-query";
import { fetchPoemStats } from "@/lib/api";
import { BookOpen, Eye, FileEdit } from "lucide-react";

const AdminStatistics = () => {
  const { data: stats, isLoading } = useQuery({
    queryKey: ["poem-stats"],
    queryFn: fetchPoemStats,
  });

  if (isLoading) {
    return (
      <div className="grid gap-6 md:grid-cols-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="glass-panel rounded-lg p-8 animate-pulse h-32" />
        ))}
      </div>
    );
  }

  const cards = [
    { label: "Total Poems", value: stats?.total ?? 0, icon: BookOpen, color: "text-primary" },
    { label: "Published", value: stats?.published ?? 0, icon: Eye, color: "text-accent" },
    { label: "Drafts", value: stats?.drafts ?? 0, icon: FileEdit, color: "text-muted-foreground" },
  ];

  return (
    <div className="space-y-8">
      <div className="grid gap-6 md:grid-cols-3">
        {cards.map((card) => (
          <div key={card.label} className="glass-panel rounded-lg p-8 animate-fade-in">
            <div className="flex items-center gap-3 mb-4">
              <card.icon className={`h-6 w-6 ${card.color}`} />
              <span className="font-ui text-sm text-muted-foreground">{card.label}</span>
            </div>
            <p className={`text-4xl font-heading font-bold ${card.color}`}>{card.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminStatistics;
