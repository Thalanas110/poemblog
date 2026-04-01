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
      <div className="min-h-screen bg-page relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/85 via-slate-950/60 to-slate-950/90" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_12%,rgba(245,158,11,0.18),transparent_38%),radial-gradient(circle_at_18%_82%,rgba(251,146,60,0.2),transparent_32%)]" />
        <div className="relative z-10 min-h-screen flex items-center justify-center">
          <Feather className="h-8 w-8 text-amber-300 animate-pulse" />
        </div>
      </div>
    );
  }

  if (!poem) {
    return (
      <div className="min-h-screen bg-page relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/85 via-slate-950/60 to-slate-950/90" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_12%,rgba(245,158,11,0.18),transparent_38%),radial-gradient(circle_at_18%_82%,rgba(251,146,60,0.2),transparent_32%)]" />
        <div className="relative z-10 min-h-screen flex items-center justify-center">
          <p className="text-amber-100/80">Poem not found.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-page relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950/85 via-slate-950/65 to-slate-950/95" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_52%_8%,rgba(245,158,11,0.17),transparent_35%),radial-gradient(circle_at_14%_84%,rgba(251,146,60,0.26),transparent_30%),radial-gradient(circle_at_82%_80%,rgba(59,130,246,0.14),transparent_38%)]" />
      <div className="relative z-10 min-h-screen backdrop-blur-[1.5px]">
        <header className="border-b border-amber-100/10 bg-slate-950/35">
          <div className="container mx-auto px-4 py-6 flex items-center gap-4">
            <Link to="/" className="text-amber-100/65 hover:text-amber-200 transition-colors">
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <Link to="/" className="flex items-center gap-3">
              <Feather className="h-5 w-5 text-amber-300" />
              <span className="font-heading font-bold text-amber-50/95">Verses & Visions</span>
            </Link>
          </div>
        </header>

        <article className="container mx-auto px-4 py-14 md:py-16 max-w-3xl animate-fade-in">
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
