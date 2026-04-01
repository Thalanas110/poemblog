import { useQuery } from "@tanstack/react-query";
import { fetchPoem, type Poem } from "@/lib/api";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Feather } from "lucide-react";

const PoemPage = () => {
  const { id } = useParams<{ id: string }>();
  const { data: poem, isLoading } = useQuery<Poem>({
    queryKey: ["poem", id],
    queryFn: () => fetchPoem(id!),
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-page">
        <div className="min-h-screen bg-background/80 backdrop-blur-sm flex items-center justify-center">
          <Feather className="h-8 w-8 text-primary animate-pulse" />
        </div>
      </div>
    );
  }

  if (!poem) {
    return (
      <div className="min-h-screen bg-page">
        <div className="min-h-screen bg-background/80 backdrop-blur-sm flex items-center justify-center">
          <p className="text-muted-foreground">Poem not found.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-page">
      <div className="min-h-screen bg-background/80 backdrop-blur-sm">
        <header className="glass-panel border-b border-border/50">
          <div className="container mx-auto px-4 py-6 flex items-center gap-4">
            <Link to="/" className="text-muted-foreground hover:text-primary transition-colors">
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <Link to="/" className="flex items-center gap-3">
              <Feather className="h-5 w-5 text-primary" />
              <span className="font-heading font-bold text-foreground">Verses & Visions</span>
            </Link>
          </div>
        </header>

        <article className="container mx-auto px-4 py-16 max-w-2xl animate-fade-in">
          {poem.image_url && (
            <div className="mb-8 overflow-hidden rounded-lg glass-panel">
              <img
                src={poem.image_url}
                alt={poem.title}
                className="w-full h-64 md:h-80 object-cover"
              />
            </div>
          )}

          <header className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-foreground text-glow mb-4">
              {poem.title}
            </h1>
            <p className="font-ui text-muted-foreground">
              by {poem.author} ·{" "}
              {new Date(poem.created_at).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </header>

          <div className="glass-panel rounded-lg p-8 md:p-12">
            <div className="poem-content text-foreground/90 text-lg leading-relaxed">
              {poem.content}
            </div>
          </div>
        </article>
      </div>
    </div>
  );
};

export default PoemPage;
