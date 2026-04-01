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
      <div className="admin-shell min-h-screen bg-page">
        <div className="admin-shell-overlay relative z-10 min-h-screen flex items-center justify-center">
          <Feather className="h-8 w-8 text-amber-300 animate-pulse" />
        </div>
      </div>
    );
  }

  if (!poem) {
    return (
      <div className="admin-shell min-h-screen bg-page">
        <div className="admin-shell-overlay relative z-10 min-h-screen flex items-center justify-center">
          <p className="text-amber-100/80">Poem not found.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-shell min-h-screen bg-page">
      <div className="admin-shell-overlay relative z-10 min-h-screen">
        <div className="mx-auto w-full max-w-3xl px-4 pt-6 md:pt-8">
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-full border border-amber-100/25 bg-slate-900/65 px-4 py-2 text-sm font-ui text-amber-100/85 hover:text-amber-50 hover:border-amber-200/40 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Go back to home
          </Link>
        </div>

        <article className="container mx-auto px-4 py-10 md:py-12 max-w-3xl animate-fade-in">
          {poem.image_url && (
            <div className="mb-8 overflow-hidden rounded-xl border border-amber-100/20 shadow-[0_20px_70px_rgba(2,6,23,0.85),0_0_40px_rgba(251,146,60,0.18)]">
              <img
                src={poem.image_url}
                alt={poem.title}
                className="w-full h-64 md:h-80 object-cover saturate-[1.05] contrast-[1.05]"
              />
            </div>
          )}

          <header className="text-center mb-12">
            <div className="mx-auto mb-5 h-px w-28 bg-gradient-to-r from-transparent via-amber-200/70 to-transparent" />
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-amber-50 text-glow mb-4">
              {poem.title}
            </h1>
            <p className="font-ui text-amber-100/65 tracking-wide">
              by {poem.author} ·{" "}
              {new Date(poem.created_at).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </header>

          <div className="glass-panel rounded-xl p-8 md:p-12 border-amber-100/15 bg-slate-950/45 shadow-[0_10px_45px_rgba(2,6,23,0.75)]">
            <div className="poem-content text-amber-50/90 text-lg leading-relaxed">
              {poem.content}
            </div>
          </div>
        </article>
      </div>
    </div>
  );
};

export default PoemPage;
