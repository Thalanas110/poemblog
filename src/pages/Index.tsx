import { useQuery } from "@tanstack/react-query";
import { fetchPoems, type Poem } from "@/lib/api";
import { Link } from "react-router-dom";
import { ArrowRight, Feather, Menu } from "lucide-react";
import { Sheet, SheetClose, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

const Index = () => {
  const { data: poems, isLoading } = useQuery<Poem[]>({
    queryKey: ["poems"],
    queryFn: () => fetchPoems(),
  });

  const featuredPoem = poems?.[0];
  const remainingPoems = poems?.slice(1) ?? [];

  return (
    <div className="admin-shell min-h-screen bg-page">
      <div className="admin-shell-overlay relative z-10 min-h-screen">
        <header className="sticky top-0 z-40 border-b border-amber-100/10 bg-slate-950/55 backdrop-blur-lg">
          <div className="mx-auto w-full max-w-6xl px-4 py-4 flex items-center justify-between gap-4">
            <Link to="/" className="flex items-center gap-3 min-w-0">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-amber-200/30 bg-slate-900/80">
                <Feather className="h-5 w-5 text-amber-300" />
              </span>
              <div className="min-w-0">
                <h1 className="text-xl md:text-2xl font-heading font-bold text-amber-50 text-glow leading-none truncate">
                  Adriaan's Hidden Corner
                </h1>
                <p className="font-ui text-[10px] md:text-xs uppercase tracking-[0.16em] text-amber-100/55 mt-1">
                  Poetry Corner
                </p>
              </div>
            </Link>

            <nav className="hidden md:flex items-center gap-3 font-ui">
              <a
                href="#latest-poems"
                className="rounded-full border border-amber-100/20 bg-slate-900/60 px-3 py-1.5 text-sm text-amber-100/85 hover:text-amber-50 hover:border-amber-200/40 transition-colors"
              >
                Latest
              </a>
              <Link
                to="/admin"
                className="rounded-full border border-amber-100/25 px-3 py-1.5 text-sm text-amber-100/80 hover:text-amber-50 hover:bg-slate-900/55 transition-colors"
              >
                Admin
              </Link>
            </nav>

            <Sheet>
              <SheetTrigger asChild>
                <button
                  type="button"
                  aria-label="Open navigation menu"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-amber-100/25 bg-slate-900/60 text-amber-100/90 transition-colors hover:text-amber-50 hover:border-amber-200/40 md:hidden"
                >
                  <Menu className="h-5 w-5" />
                </button>
              </SheetTrigger>
              <SheetContent
                side="top"
                className="border-amber-100/15 bg-slate-950/97 px-4 pb-6 pt-12 text-amber-100 shadow-[0_24px_50px_rgba(2,6,23,0.85)]"
              >
                <SheetTitle className="sr-only">Navigation menu</SheetTitle>
                <div className="mt-2 flex flex-col gap-3 font-ui">
                  <SheetClose asChild>
                    <a
                      href="#latest-poems"
                      className="rounded-xl border border-amber-100/20 bg-slate-900/65 px-4 py-3 text-sm uppercase tracking-[0.14em] text-amber-100/90 transition-colors hover:text-amber-50 hover:border-amber-200/45"
                    >
                      Latest poems
                    </a>
                  </SheetClose>
                  <SheetClose asChild>
                    <Link
                      to="/admin"
                      className="rounded-xl border border-amber-100/25 bg-slate-900/55 px-4 py-3 text-sm uppercase tracking-[0.14em] text-amber-100/85 transition-colors hover:text-amber-50 hover:border-amber-200/45"
                    >
                      Admin dashboard
                    </Link>
                  </SheetClose>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </header>

        <section className="relative mx-auto w-full max-w-6xl px-4 pb-20 pt-14 md:pt-20">
          <div className="pointer-events-none absolute inset-x-4 top-10 h-[14rem] rounded-3xl bg-slate-950/42 blur-2xl" />
          <div className="pointer-events-none absolute inset-x-4 top-[26rem] bottom-10 rounded-3xl bg-slate-950/36 blur-2xl md:top-[30rem]" />

          <div className="relative z-10">
          <div className="mb-12 rounded-2xl border border-amber-100/15 bg-slate-950/78 p-6 shadow-[0_14px_45px_rgba(2,6,23,0.7)] md:mb-14 md:p-8 animate-fade-in">
            <p className="font-ui uppercase tracking-[0.22em] text-xs text-amber-100/65 mb-4">
              My hidden corner for everything.
            </p>
            <h2 className="text-4xl md:text-6xl font-heading font-bold text-amber-50 text-glow max-w-4xl leading-tight">
              A quiet nook for my poetry and musings, tucked away from the noise of the world.
            </h2>
            <p className="mt-5 text-lg text-amber-100/65 font-body max-w-2xl leading-relaxed">
              Here I share my verses, thoughts, and reflections—a personal sanctuary where words bloom and
              creativity flows freely.
            </p>
          </div>

          {isLoading ? (
            <div className="space-y-6">
              <div className="glass-panel rounded-2xl p-8 animate-pulse h-[28rem]" />
              <div className="space-y-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="glass-panel rounded-xl p-6 animate-pulse h-52" />
                ))}
              </div>
            </div>
          ) : poems && poems.length > 0 ? (
            <>
              {featuredPoem && (
                <Link
                  to={`/poem/${featuredPoem.id}`}
                  className="group mb-12 block overflow-hidden rounded-2xl border border-amber-100/20 bg-slate-950/88 backdrop-blur-sm shadow-[0_20px_70px_rgba(2,6,23,0.82),0_0_42px_rgba(251,146,60,0.18)] transition-all duration-300 hover:border-amber-200/40 hover:shadow-[0_25px_85px_rgba(2,6,23,0.88),0_0_55px_rgba(251,146,60,0.25)]"
                >
                  <div className="grid lg:grid-cols-[1.25fr_1fr]">
                    <div className="relative min-h-72 lg:min-h-[27rem]">
                      {featuredPoem.image_url ? (
                        <img
                          src={featuredPoem.image_url}
                          alt={featuredPoem.title}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="h-full w-full bg-gradient-to-br from-amber-400/35 via-orange-400/25 to-slate-900" />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 to-transparent" />
                    </div>

                    <div className="p-7 md:p-10 lg:p-12 flex flex-col justify-between bg-slate-950/88">
                      <div>
                        <p className="font-ui text-xs uppercase tracking-[0.18em] text-amber-200/80 mb-4">
                          Featured Poem
                        </p>
                        <h3 className="text-3xl md:text-4xl font-heading font-semibold text-amber-50 mb-4 leading-tight group-hover:text-amber-100 transition-colors">
                          {featuredPoem.title}
                        </h3>
                        <p className="text-sm font-ui text-amber-100/65 mb-5">
                          by {featuredPoem.author} · {new Date(featuredPoem.created_at).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </p>
                        <p className="poem-content text-amber-50/85 line-clamp-6 text-base leading-relaxed">
                          {featuredPoem.excerpt || featuredPoem.content.slice(0, 260)}
                        </p>
                      </div>

                      <div className="mt-8 flex items-center gap-2 font-ui text-sm text-amber-200/85 group-hover:text-amber-100 transition-colors">
                        Read poem
                        <ArrowRight className="h-4 w-4" />
                      </div>
                    </div>
                  </div>
                </Link>
              )}

              <div id="latest-poems" className="mx-auto w-full max-w-6xl scroll-mt-28">
                {remainingPoems.length > 0 && (
                  <div className="mb-5 flex items-end justify-between px-1">
                    <h3 className="text-2xl font-heading font-semibold text-amber-50/95">Latest poems</h3>
                    <p className="font-ui text-xs uppercase tracking-[0.17em] text-amber-100/80">
                      {remainingPoems.length} entries
                    </p>
                  </div>
                )}

                <div
                  className="rounded-2xl border border-amber-100/20 p-4 shadow-[0_18px_50px_rgba(2,6,23,0.72)] md:p-6"
                  style={{ backgroundColor: "rgba(2, 6, 23, 0.88)" }}
                >
                  <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                  {remainingPoems.map((poem, i) => (
                    <Link
                      key={poem.id}
                      to={`/poem/${poem.id}`}
                      className="group overflow-hidden rounded-xl border border-amber-100/20 transition-all duration-300 hover:border-amber-200/50 hover:shadow-[0_12px_45px_rgba(2,6,23,0.78)] animate-fade-in"
                      style={{
                        animationDelay: `${i * 90}ms`,
                        backgroundColor: "rgba(15, 23, 42, 0.92)",
                      }}
                    >
                      <div>
                        <div className="h-52 overflow-hidden">
                          {poem.image_url ? (
                            <img
                              src={poem.image_url}
                              alt={poem.title}
                              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                            />
                          ) : (
                            <div className="h-full w-full bg-gradient-to-br from-amber-400/30 via-orange-400/20 to-slate-900" />
                          )}
                        </div>

                        <div className="p-5" style={{ backgroundColor: "rgba(15, 23, 42, 0.96)" }}>
                          <p className="font-ui text-[11px] uppercase tracking-[0.16em] text-amber-300/85 mb-3">
                            Poem
                          </p>
                          <h4 className="text-2xl font-heading font-semibold text-amber-50 group-hover:text-amber-100 transition-colors mb-3 leading-tight line-clamp-2">
                            {poem.title}
                          </h4>
                          <p className="text-sm font-ui text-amber-100/70 mb-3">by {poem.author}</p>
                          <p className="poem-content text-amber-50/86 line-clamp-2 text-sm leading-relaxed mb-4">
                            {poem.excerpt || poem.content.slice(0, 120)}
                          </p>
                          <div className="border-t border-amber-100/10 pt-4 flex items-center justify-between font-ui text-xs text-amber-100/65">
                            <span className="font-medium">
                              {new Date(poem.created_at).toLocaleDateString("en-US", {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                              })}
                            </span>
                            <span className="inline-flex items-center gap-1 text-amber-200/90 group-hover:text-amber-100 transition-colors">
                              Read More
                              <ArrowRight className="h-3.5 w-3.5" />
                            </span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
                </div>
              </div>
            </>
          ) : (
            <div className="text-center py-20 glass-panel rounded-2xl border-amber-100/15 bg-slate-950/35">
              <Feather className="h-12 w-12 text-amber-200/70 mx-auto mb-4" />
              <p className="text-amber-100/70 font-body text-lg">
                No poems published yet. The ink is still drying...
              </p>
            </div>
          )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Index;
