import { useQuery } from "@tanstack/react-query";
import { fetchPoems, type Poem } from "@/lib/api";
import { Link } from "react-router-dom";
import { Feather } from "lucide-react";

const Index = () => {
  const { data: poems, isLoading } = useQuery<Poem[]>({
    queryKey: ["poems"],
    queryFn: () => fetchPoems(),
  });

  return (
    <div className="min-h-screen bg-page">
      <div className="min-h-screen bg-background/80 backdrop-blur-sm">
        {/* Header */}
        <header className="glass-panel border-b border-border/50">
          <div className="container mx-auto px-4 py-6 flex items-center justify-between">
            <Link to="/" className="flex items-center gap-3">
              <Feather className="h-6 w-6 text-primary" />
              <h1 className="text-2xl font-heading font-bold text-foreground text-glow">
                Verses & Visions
              </h1>
            </Link>
            <Link
              to="/admin"
              className="font-ui text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              Admin
            </Link>
          </div>
        </header>

        {/* Hero */}
        <section className="container mx-auto px-4 py-20 text-center">
          <h2 className="text-5xl md:text-6xl font-heading font-bold text-foreground text-glow mb-4 animate-fade-in">
            A Collection of Poems
          </h2>
          <p className="text-lg text-muted-foreground font-body max-w-2xl mx-auto animate-fade-in">
            Where words dance and emotions breathe through carefully crafted verses.
          </p>
        </section>

        {/* Poems Grid */}
        <section className="container mx-auto px-4 pb-20">
          {isLoading ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="glass-panel rounded-lg p-8 animate-pulse h-64" />
              ))}
            </div>
          ) : poems && poems.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {poems.map((poem, i) => (
                <Link
                  key={poem.id}
                  to={`/poem/${poem.id}`}
                  className="glass-panel rounded-lg overflow-hidden hover:border-primary/30 transition-all duration-300 group animate-fade-in"
                  style={{ animationDelay: `${i * 100}ms` }}
                >
                  {poem.image_url && (
                    <img
                      src={poem.image_url}
                      alt={poem.title}
                      className="w-full h-48 object-cover"
                    />
                  )}
                  <div className="p-8">
                    <h3 className="text-xl font-heading font-semibold text-foreground group-hover:text-primary transition-colors mb-3">
                      {poem.title}
                    </h3>
                    <p className="text-sm font-ui text-muted-foreground mb-4">
                      by {poem.author}
                    </p>
                    <p className="poem-content text-secondary-foreground/80 line-clamp-4 text-sm">
                      {poem.excerpt || poem.content.slice(0, 150)}
                    </p>
                    <p className="text-xs font-ui text-muted-foreground mt-4">
                      {new Date(poem.created_at).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <Feather className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground font-body text-lg">
                No poems published yet. The ink is still drying...
              </p>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default Index;
