import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="admin-shell min-h-screen bg-page">
      <div className="admin-shell-overlay relative min-h-screen overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/34 via-slate-950/14 to-slate-950/52" />

      <div className="pointer-events-none absolute -top-20 -left-16 h-72 w-72 rounded-full bg-amber-200/25 blur-3xl" />
      <div className="pointer-events-none absolute top-24 right-0 h-80 w-80 rounded-full bg-emerald-200/12 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 left-1/3 h-56 w-56 rounded-full bg-sky-200/10 blur-3xl" />

      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-5xl items-end px-4 pb-8 pt-24 sm:px-6 md:items-center md:pb-12">
        <section className="w-full max-w-2xl rounded-3xl border border-amber-100/30 bg-slate-950/24 p-7 text-left shadow-[0_26px_70px_-48px_rgba(4,8,20,0.95)] backdrop-blur-[2px] sm:p-10 animate-fade-in">
          <p className="font-ui text-xs uppercase tracking-[0.22em] text-amber-100/80">The Lost Chapter</p>

          <h1 className="mt-3 font-heading text-6xl leading-none text-amber-50 [text-shadow:0_5px_22px_rgba(8,13,28,0.72)] sm:text-7xl md:text-8xl">
            404
          </h1>

          <h2 className="mt-3 max-w-xl font-heading text-2xl leading-tight text-amber-100 [text-shadow:0_4px_16px_rgba(8,13,28,0.78)] sm:text-3xl">
            This page vanished into the woods before the story could be finished.
          </h2>

          <p className="mt-4 max-w-xl text-base text-amber-50/90 [text-shadow:0_2px_12px_rgba(8,13,28,0.8)] sm:text-lg">
            The lanterns are still glowing, but the path you asked for does not exist in this realm.
          </p>

          <p className="mt-5 inline-flex rounded-full border border-amber-100/24 bg-slate-950/36 px-3 py-1.5 font-ui text-xs text-amber-100/90">
            Lost path: {location.pathname}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href="/"
              className="inline-flex items-center rounded-full border border-amber-100/45 bg-amber-200/90 px-5 py-2.5 font-ui text-sm font-semibold text-slate-900 transition hover:bg-amber-100"
            >
              Return to the Castle
            </a>

            <a
              href="/poems"
              className="inline-flex items-center rounded-full border border-amber-100/40 bg-slate-900/35 px-5 py-2.5 font-ui text-sm font-medium text-amber-50 transition hover:bg-slate-900/55"
            >
              Find Another Tale
            </a>
          </div>
        </section>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-slate-950/70 to-transparent" />
      <div className="pointer-events-none absolute inset-0 border border-amber-50/10" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_12%,rgba(255,248,214,0.14),transparent_32%),radial-gradient(circle_at_84%_22%,rgba(188,242,211,0.12),transparent_30%)]" />
      <div className="pointer-events-none absolute inset-0 [mask-image:linear-gradient(to_bottom,transparent,black_26%,black_88%,transparent)] bg-[url('/images/bg.png')] bg-cover bg-center opacity-[0.06]" />
      <div className="pointer-events-none absolute top-8 left-1/2 h-24 w-px -translate-x-1/2 bg-gradient-to-b from-amber-100/40 to-transparent" />
      <div className="pointer-events-none absolute right-8 bottom-8 h-2 w-2 rounded-full bg-amber-100/80 shadow-[0_0_18px_rgba(255,241,185,0.95)]" />
      <div className="pointer-events-none absolute right-16 bottom-16 h-1.5 w-1.5 rounded-full bg-emerald-100/75 shadow-[0_0_16px_rgba(203,255,231,0.9)]" />
      <div className="pointer-events-none absolute left-10 top-28 h-1.5 w-1.5 rounded-full bg-amber-50/80 shadow-[0_0_14px_rgba(255,244,204,0.95)]" />
      <div className="pointer-events-none absolute left-16 top-40 h-1 w-1 rounded-full bg-sky-100/80 shadow-[0_0_12px_rgba(206,240,255,0.9)]" />
      <div className="pointer-events-none absolute right-20 top-36 h-1 w-1 rounded-full bg-amber-50/80 shadow-[0_0_12px_rgba(255,244,204,0.9)]" />
      <div className="pointer-events-none absolute left-1/3 bottom-24 h-1 w-1 rounded-full bg-emerald-100/70 shadow-[0_0_12px_rgba(203,255,231,0.9)]" />
      <div className="pointer-events-none absolute right-1/4 top-1/2 h-1 w-1 rounded-full bg-amber-100/70 shadow-[0_0_12px_rgba(255,241,185,0.9)]" />
      <div className="pointer-events-none absolute left-1/4 top-1/3 h-1 w-1 rounded-full bg-sky-100/70 shadow-[0_0_12px_rgba(206,240,255,0.9)]" />
      <div className="pointer-events-none absolute right-12 top-16 h-1 w-1 rounded-full bg-amber-100/70 shadow-[0_0_12px_rgba(255,241,185,0.9)]" />
      <div className="pointer-events-none absolute left-8 bottom-20 h-1 w-1 rounded-full bg-amber-100/70 shadow-[0_0_12px_rgba(255,241,185,0.9)]" />
      <div className="pointer-events-none absolute right-1/3 bottom-10 h-1 w-1 rounded-full bg-sky-100/70 shadow-[0_0_12px_rgba(206,240,255,0.9)]" />
      <div className="pointer-events-none absolute left-1/2 top-20 h-1 w-1 -translate-x-1/2 rounded-full bg-amber-50/80 shadow-[0_0_12px_rgba(255,244,204,0.9)]" />
      <div className="pointer-events-none absolute left-[55%] top-28 h-1 w-1 rounded-full bg-emerald-100/70 shadow-[0_0_12px_rgba(203,255,231,0.9)]" />
      <div className="pointer-events-none absolute left-[45%] top-32 h-1 w-1 rounded-full bg-sky-100/70 shadow-[0_0_12px_rgba(206,240,255,0.9)]" />
      <div className="pointer-events-none absolute right-[40%] bottom-28 h-1 w-1 rounded-full bg-amber-100/70 shadow-[0_0_12px_rgba(255,241,185,0.9)]" />
      <div className="pointer-events-none absolute left-[38%] bottom-16 h-1 w-1 rounded-full bg-emerald-100/70 shadow-[0_0_12px_rgba(203,255,231,0.9)]" />
      <div className="pointer-events-none absolute right-[48%] top-[42%] h-1 w-1 rounded-full bg-amber-50/80 shadow-[0_0_12px_rgba(255,244,204,0.9)]" />
      <div className="pointer-events-none absolute left-[62%] top-[48%] h-1 w-1 rounded-full bg-sky-100/70 shadow-[0_0_12px_rgba(206,240,255,0.9)]" />
      <div className="pointer-events-none absolute left-[70%] top-[58%] h-1 w-1 rounded-full bg-emerald-100/70 shadow-[0_0_12px_rgba(203,255,231,0.9)]" />
      <div className="pointer-events-none absolute right-[22%] top-[64%] h-1 w-1 rounded-full bg-amber-100/70 shadow-[0_0_12px_rgba(255,241,185,0.9)]" />
      <div className="pointer-events-none absolute left-[18%] top-[62%] h-1 w-1 rounded-full bg-sky-100/70 shadow-[0_0_12px_rgba(206,240,255,0.9)]" />
      <div className="pointer-events-none absolute left-[14%] top-[72%] h-1 w-1 rounded-full bg-amber-50/80 shadow-[0_0_12px_rgba(255,244,204,0.9)]" />
      <div className="pointer-events-none absolute right-[32%] top-[72%] h-1 w-1 rounded-full bg-emerald-100/70 shadow-[0_0_12px_rgba(203,255,231,0.9)]" />
      <div className="pointer-events-none absolute right-[12%] top-[80%] h-1 w-1 rounded-full bg-sky-100/70 shadow-[0_0_12px_rgba(206,240,255,0.9)]" />
      <div className="pointer-events-none absolute left-[28%] top-[82%] h-1 w-1 rounded-full bg-amber-100/70 shadow-[0_0_12px_rgba(255,241,185,0.9)]" />
      <div className="pointer-events-none absolute left-[58%] top-[84%] h-1 w-1 rounded-full bg-amber-50/80 shadow-[0_0_12px_rgba(255,244,204,0.9)]" />
      <div className="pointer-events-none absolute right-[42%] top-[88%] h-1 w-1 rounded-full bg-emerald-100/70 shadow-[0_0_12px_rgba(203,255,231,0.9)]" />
      <div className="pointer-events-none absolute left-[8%] top-[88%] h-1 w-1 rounded-full bg-sky-100/70 shadow-[0_0_12px_rgba(206,240,255,0.9)]" />
      <div className="pointer-events-none absolute right-[8%] top-[90%] h-1 w-1 rounded-full bg-amber-100/70 shadow-[0_0_12px_rgba(255,241,185,0.9)]" />
      <div className="pointer-events-none absolute left-[48%] top-[92%] h-1 w-1 rounded-full bg-sky-100/70 shadow-[0_0_12px_rgba(206,240,255,0.9)]" />
      <div className="pointer-events-none absolute left-[74%] top-[26%] h-1 w-1 rounded-full bg-amber-100/70 shadow-[0_0_12px_rgba(255,241,185,0.9)]" />
      <div className="pointer-events-none absolute left-[80%] top-[34%] h-1 w-1 rounded-full bg-emerald-100/70 shadow-[0_0_12px_rgba(203,255,231,0.9)]" />
      <div className="pointer-events-none absolute right-[68%] top-[22%] h-1 w-1 rounded-full bg-sky-100/70 shadow-[0_0_12px_rgba(206,240,255,0.9)]" />
      <div className="pointer-events-none absolute right-[74%] top-[30%] h-1 w-1 rounded-full bg-amber-50/80 shadow-[0_0_12px_rgba(255,244,204,0.9)]" />
      <div className="pointer-events-none absolute right-[58%] top-[16%] h-1 w-1 rounded-full bg-emerald-100/70 shadow-[0_0_12px_rgba(203,255,231,0.9)]" />
      <div className="pointer-events-none absolute left-[66%] top-[14%] h-1 w-1 rounded-full bg-sky-100/70 shadow-[0_0_12px_rgba(206,240,255,0.9)]" />
      <div className="pointer-events-none absolute left-[32%] top-[14%] h-1 w-1 rounded-full bg-amber-100/70 shadow-[0_0_12px_rgba(255,241,185,0.9)]" />
      <div className="pointer-events-none absolute left-[22%] top-[18%] h-1 w-1 rounded-full bg-emerald-100/70 shadow-[0_0_12px_rgba(203,255,231,0.9)]" />
      <div className="pointer-events-none absolute right-[18%] top-[18%] h-1 w-1 rounded-full bg-sky-100/70 shadow-[0_0_12px_rgba(206,240,255,0.9)]" />
      <div className="pointer-events-none absolute left-[12%] top-[22%] h-1 w-1 rounded-full bg-amber-50/80 shadow-[0_0_12px_rgba(255,244,204,0.9)]" />
      <div className="pointer-events-none absolute right-[12%] top-[24%] h-1 w-1 rounded-full bg-amber-100/70 shadow-[0_0_12px_rgba(255,241,185,0.9)]" />
      <div className="pointer-events-none absolute left-[50%] top-[12%] h-1 w-1 -translate-x-1/2 rounded-full bg-emerald-100/70 shadow-[0_0_12px_rgba(203,255,231,0.9)]" />
      <div className="pointer-events-none absolute left-[42%] top-[18%] h-1 w-1 rounded-full bg-sky-100/70 shadow-[0_0_12px_rgba(206,240,255,0.9)]" />
      <div className="pointer-events-none absolute right-[44%] top-[20%] h-1 w-1 rounded-full bg-amber-50/80 shadow-[0_0_12px_rgba(255,244,204,0.9)]" />
      <div className="pointer-events-none absolute left-[26%] top-[26%] h-1 w-1 rounded-full bg-amber-100/70 shadow-[0_0_12px_rgba(255,241,185,0.9)]" />
      <div className="pointer-events-none absolute right-[26%] top-[28%] h-1 w-1 rounded-full bg-emerald-100/70 shadow-[0_0_12px_rgba(203,255,231,0.9)]" />
      <div className="pointer-events-none absolute left-[36%] top-[36%] h-1 w-1 rounded-full bg-sky-100/70 shadow-[0_0_12px_rgba(206,240,255,0.9)]" />
      <div className="pointer-events-none absolute right-[36%] top-[38%] h-1 w-1 rounded-full bg-amber-100/70 shadow-[0_0_12px_rgba(255,241,185,0.9)]" />
      <div className="pointer-events-none absolute left-[52%] top-[40%] h-1 w-1 rounded-full bg-amber-50/80 shadow-[0_0_12px_rgba(255,244,204,0.9)]" />
      <div className="pointer-events-none absolute left-[16%] top-[46%] h-1 w-1 rounded-full bg-emerald-100/70 shadow-[0_0_12px_rgba(203,255,231,0.9)]" />
      <div className="pointer-events-none absolute right-[16%] top-[50%] h-1 w-1 rounded-full bg-sky-100/70 shadow-[0_0_12px_rgba(206,240,255,0.9)]" />
      <div className="pointer-events-none absolute left-[24%] top-[56%] h-1 w-1 rounded-full bg-amber-100/70 shadow-[0_0_12px_rgba(255,241,185,0.9)]" />
      <div className="pointer-events-none absolute right-[24%] top-[56%] h-1 w-1 rounded-full bg-amber-50/80 shadow-[0_0_12px_rgba(255,244,204,0.9)]" />
      <div className="pointer-events-none absolute left-[46%] top-[60%] h-1 w-1 rounded-full bg-emerald-100/70 shadow-[0_0_12px_rgba(203,255,231,0.9)]" />
      <div className="pointer-events-none absolute right-[46%] top-[62%] h-1 w-1 rounded-full bg-sky-100/70 shadow-[0_0_12px_rgba(206,240,255,0.9)]" />
      <div className="pointer-events-none absolute left-[34%] top-[68%] h-1 w-1 rounded-full bg-amber-100/70 shadow-[0_0_12px_rgba(255,241,185,0.9)]" />
      <div className="pointer-events-none absolute right-[34%] top-[68%] h-1 w-1 rounded-full bg-emerald-100/70 shadow-[0_0_12px_rgba(203,255,231,0.9)]" />
      <div className="pointer-events-none absolute left-[40%] top-[74%] h-1 w-1 rounded-full bg-sky-100/70 shadow-[0_0_12px_rgba(206,240,255,0.9)]" />
      <div className="pointer-events-none absolute right-[40%] top-[76%] h-1 w-1 rounded-full bg-amber-50/80 shadow-[0_0_12px_rgba(255,244,204,0.9)]" />
      <div className="pointer-events-none absolute left-[60%] top-[78%] h-1 w-1 rounded-full bg-amber-100/70 shadow-[0_0_12px_rgba(255,241,185,0.9)]" />
      <div className="pointer-events-none absolute right-[60%] top-[80%] h-1 w-1 rounded-full bg-emerald-100/70 shadow-[0_0_12px_rgba(203,255,231,0.9)]" />
      <div className="pointer-events-none absolute left-[54%] top-[86%] h-1 w-1 rounded-full bg-sky-100/70 shadow-[0_0_12px_rgba(206,240,255,0.9)]" />
      <div className="pointer-events-none absolute right-[54%] top-[88%] h-1 w-1 rounded-full bg-amber-100/70 shadow-[0_0_12px_rgba(255,241,185,0.9)]" />
      <div className="pointer-events-none absolute left-[64%] top-[92%] h-1 w-1 rounded-full bg-amber-50/80 shadow-[0_0_12px_rgba(255,244,204,0.9)]" />
      <div className="pointer-events-none absolute left-[20%] bottom-[26%] h-1 w-1 rounded-full bg-emerald-100/70 shadow-[0_0_12px_rgba(203,255,231,0.9)]" />
      <div className="pointer-events-none absolute right-[20%] bottom-[22%] h-1 w-1 rounded-full bg-sky-100/70 shadow-[0_0_12px_rgba(206,240,255,0.9)]" />
      <div className="pointer-events-none absolute left-[30%] bottom-[30%] h-1 w-1 rounded-full bg-amber-100/70 shadow-[0_0_12px_rgba(255,241,185,0.9)]" />
      <div className="pointer-events-none absolute right-[30%] bottom-[30%] h-1 w-1 rounded-full bg-amber-50/80 shadow-[0_0_12px_rgba(255,244,204,0.9)]" />
      <div className="pointer-events-none absolute left-[44%] bottom-[34%] h-1 w-1 rounded-full bg-emerald-100/70 shadow-[0_0_12px_rgba(203,255,231,0.9)]" />
      <div className="pointer-events-none absolute right-[44%] bottom-[36%] h-1 w-1 rounded-full bg-sky-100/70 shadow-[0_0_12px_rgba(206,240,255,0.9)]" />
      <div className="pointer-events-none absolute left-[52%] bottom-[22%] h-1 w-1 rounded-full bg-amber-100/70 shadow-[0_0_12px_rgba(255,241,185,0.9)]" />
      <div className="pointer-events-none absolute right-[52%] bottom-[24%] h-1 w-1 rounded-full bg-emerald-100/70 shadow-[0_0_12px_rgba(203,255,231,0.9)]" />
      <div className="pointer-events-none absolute left-[68%] bottom-[18%] h-1 w-1 rounded-full bg-sky-100/70 shadow-[0_0_12px_rgba(206,240,255,0.9)]" />
      <div className="pointer-events-none absolute right-[68%] bottom-[16%] h-1 w-1 rounded-full bg-amber-100/70 shadow-[0_0_12px_rgba(255,241,185,0.9)]" />
      <div className="pointer-events-none absolute left-[76%] bottom-[28%] h-1 w-1 rounded-full bg-amber-50/80 shadow-[0_0_12px_rgba(255,244,204,0.9)]" />
      <div className="pointer-events-none absolute right-[76%] bottom-[26%] h-1 w-1 rounded-full bg-emerald-100/70 shadow-[0_0_12px_rgba(203,255,231,0.9)]" />
      <div className="pointer-events-none absolute left-[10%] bottom-[34%] h-1 w-1 rounded-full bg-sky-100/70 shadow-[0_0_12px_rgba(206,240,255,0.9)]" />
      <div className="pointer-events-none absolute right-[10%] bottom-[38%] h-1 w-1 rounded-full bg-amber-100/70 shadow-[0_0_12px_rgba(255,241,185,0.9)]" />
      <div className="pointer-events-none absolute left-[6%] top-[52%] h-1 w-1 rounded-full bg-amber-50/80 shadow-[0_0_12px_rgba(255,244,204,0.9)]" />
      <div className="pointer-events-none absolute right-[6%] top-[48%] h-1 w-1 rounded-full bg-sky-100/70 shadow-[0_0_12px_rgba(206,240,255,0.9)]" />
      <div className="pointer-events-none absolute left-[2%] top-[66%] h-1 w-1 rounded-full bg-emerald-100/70 shadow-[0_0_12px_rgba(203,255,231,0.9)]" />
      <div className="pointer-events-none absolute right-[2%] top-[70%] h-1 w-1 rounded-full bg-amber-100/70 shadow-[0_0_12px_rgba(255,241,185,0.9)]" />
      <div className="pointer-events-none absolute left-[94%] top-[12%] h-1 w-1 rounded-full bg-amber-50/80 shadow-[0_0_12px_rgba(255,244,204,0.9)]" />
      <div className="pointer-events-none absolute left-[96%] top-[26%] h-1 w-1 rounded-full bg-emerald-100/70 shadow-[0_0_12px_rgba(203,255,231,0.9)]" />
      <div className="pointer-events-none absolute left-[98%] top-[42%] h-1 w-1 rounded-full bg-sky-100/70 shadow-[0_0_12px_rgba(206,240,255,0.9)]" />
      <div className="pointer-events-none absolute left-[96%] top-[58%] h-1 w-1 rounded-full bg-amber-100/70 shadow-[0_0_12px_rgba(255,241,185,0.9)]" />
      <div className="pointer-events-none absolute left-[94%] top-[74%] h-1 w-1 rounded-full bg-amber-50/80 shadow-[0_0_12px_rgba(255,244,204,0.9)]" />
      <div className="pointer-events-none absolute left-[92%] top-[88%] h-1 w-1 rounded-full bg-emerald-100/70 shadow-[0_0_12px_rgba(203,255,231,0.9)]" />
      <div className="pointer-events-none absolute right-[94%] top-[10%] h-1 w-1 rounded-full bg-sky-100/70 shadow-[0_0_12px_rgba(206,240,255,0.9)]" />
      <div className="pointer-events-none absolute right-[96%] top-[24%] h-1 w-1 rounded-full bg-amber-100/70 shadow-[0_0_12px_rgba(255,241,185,0.9)]" />
      <div className="pointer-events-none absolute right-[98%] top-[40%] h-1 w-1 rounded-full bg-amber-50/80 shadow-[0_0_12px_rgba(255,244,204,0.9)]" />
      <div className="pointer-events-none absolute right-[96%] top-[56%] h-1 w-1 rounded-full bg-emerald-100/70 shadow-[0_0_12px_rgba(203,255,231,0.9)]" />
      <div className="pointer-events-none absolute right-[94%] top-[72%] h-1 w-1 rounded-full bg-sky-100/70 shadow-[0_0_12px_rgba(206,240,255,0.9)]" />
        <div className="pointer-events-none absolute right-[92%] top-[86%] h-1 w-1 rounded-full bg-amber-100/70 shadow-[0_0_12px_rgba(255,241,185,0.9)]" />
      </div>
    </div>
  );
};

export default NotFound;
