import { useQuery } from "@tanstack/react-query";
import { fetchPoemStats } from "@/lib/api";
import { type Poem } from "@/lib/api";
import { BookOpen, Eye, FileEdit, TrendingUp, Clock3 } from "lucide-react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface AdminStatisticsProps {
  poems?: Poem[];
}

const monthFormatter = new Intl.DateTimeFormat("en", { month: "short" });

const buildMonthlyTrend = (poems: Poem[]) => {
  const now = new Date();
  const buckets: { key: string; label: string; poems: number; published: number }[] = [];

  for (let offset = 5; offset >= 0; offset -= 1) {
    const date = new Date(now.getFullYear(), now.getMonth() - offset, 1);
    const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
    buckets.push({ key, label: monthFormatter.format(date), poems: 0, published: 0 });
  }

  for (const poem of poems) {
    const created = new Date(poem.created_at);
    const key = `${created.getFullYear()}-${String(created.getMonth() + 1).padStart(2, "0")}`;
    const bucket = buckets.find((item) => item.key === key);
    if (!bucket) continue;
    bucket.poems += 1;
    if (poem.published) bucket.published += 1;
  }

  return buckets;
};

const AdminStatistics = ({ poems = [] }: AdminStatisticsProps) => {
  const { data: stats, isLoading } = useQuery({
    queryKey: ["poem-stats"],
    queryFn: fetchPoemStats,
  });

  if (isLoading) {
    return (
      <div className="grid gap-4 lg:grid-cols-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="admin-stat-panel rounded-2xl p-6 animate-pulse h-32" />
        ))}
      </div>
    );
  }

  const total = stats?.total ?? 0;
  const published = stats?.published ?? 0;
  const drafts = stats?.drafts ?? 0;
  const publishRate = total > 0 ? Math.round((published / total) * 100) : 0;
  const monthlyTrend = buildMonthlyTrend(poems);
  const latestMonth = monthlyTrend[monthlyTrend.length - 1];
  const previousMonth = monthlyTrend[monthlyTrend.length - 2];
  const recentGrowth = Math.max(0, (latestMonth?.poems ?? 0) - (previousMonth?.poems ?? 0));

  const statusShare = [
    { name: "Published", value: published, color: "hsl(152 44% 56%)" },
    { name: "Drafts", value: drafts, color: "hsl(30 86% 64%)" },
  ];

  const cards = [
    {
      label: "Total Poems",
      value: total,
      icon: BookOpen,
      accent: "text-amber-100",
      note: `${recentGrowth > 0 ? `+${recentGrowth}` : "0"} vs last month`,
    },
    {
      label: "Published",
      value: published,
      icon: Eye,
      accent: "text-emerald-200",
      note: `${publishRate}% publish rate`,
    },
    {
      label: "Drafts",
      value: drafts,
      icon: FileEdit,
      accent: "text-orange-200",
      note: `${Math.max(total - published, 0)} in queue`,
    },
  ];

  return (
    <div className="space-y-5 md:space-y-7">
      <div className="grid gap-4 md:grid-cols-3">
        {cards.map((card) => (
          <div key={card.label} className="admin-stat-panel rounded-2xl p-5 animate-fade-in md:p-6">
            <div className="mb-3 flex items-center gap-3">
              <div className="rounded-xl border border-amber-100/20 bg-slate-950/25 p-2">
                <card.icon className={`h-4 w-4 ${card.accent}`} />
              </div>
              <span className="font-ui text-sm text-amber-50/80">{card.label}</span>
            </div>
            <p className="text-3xl font-heading font-semibold text-amber-50 md:text-4xl">{card.value}</p>
            <p className="mt-2 font-ui text-xs text-amber-100/70">{card.note}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-4 xl:grid-cols-[1.5fr_1fr]">
        <section className="admin-stat-panel rounded-2xl p-4 md:p-6">
          <div className="mb-4 flex items-center justify-between gap-2">
            <div>
              <p className="font-ui text-xs uppercase tracking-[0.18em] text-amber-100/65">Growth Lens</p>
              <h3 className="text-lg font-heading font-semibold text-amber-50">Poems Created by Month</h3>
            </div>
            <div className="flex items-center gap-2 rounded-full border border-emerald-200/25 bg-emerald-400/10 px-3 py-1">
              <TrendingUp className="h-3.5 w-3.5 text-emerald-200" />
              <span className="font-ui text-xs text-emerald-100">Live trend</span>
            </div>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer>
              <AreaChart data={monthlyTrend} margin={{ left: -12, right: 12, top: 6, bottom: 0 }}>
                <defs>
                  <linearGradient id="poems-area" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="hsl(43 85% 70%)" stopOpacity={0.5} />
                    <stop offset="100%" stopColor="hsl(43 85% 70%)" stopOpacity={0.02} />
                  </linearGradient>
                </defs>
                <CartesianGrid vertical={false} stroke="hsla(40, 34%, 84%, 0.18)" />
                <XAxis
                  dataKey="label"
                  tickLine={false}
                  axisLine={false}
                  stroke="hsla(40, 34%, 90%, 0.62)"
                  fontSize={12}
                />
                <YAxis allowDecimals={false} tickLine={false} axisLine={false} width={28} fontSize={12} />
                <Tooltip
                  contentStyle={{
                    borderRadius: "0.8rem",
                    border: "1px solid hsla(40, 30%, 80%, 0.28)",
                    background: "hsla(223, 24%, 12%, 0.92)",
                    color: "hsl(40 28% 92%)",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="poems"
                  stroke="hsl(43 88% 72%)"
                  strokeWidth={2.5}
                  fill="url(#poems-area)"
                  activeDot={{ r: 5 }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </section>

        <section className="admin-stat-panel rounded-2xl p-4 md:p-6">
          <div className="mb-4">
            <p className="font-ui text-xs uppercase tracking-[0.18em] text-amber-100/65">Status Split</p>
            <h3 className="text-lg font-heading font-semibold text-amber-50">Publishing Balance</h3>
          </div>

          <div className="mx-auto h-52 w-full max-w-[280px]">
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={statusShare}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={58}
                  outerRadius={85}
                  paddingAngle={4}
                >
                  {statusShare.map((entry) => (
                    <Cell key={entry.name} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    borderRadius: "0.8rem",
                    border: "1px solid hsla(40, 30%, 80%, 0.28)",
                    background: "hsla(223, 24%, 12%, 0.92)",
                    color: "hsl(40 28% 92%)",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="grid gap-2">
            {statusShare.map((item) => (
              <div key={item.name} className="flex items-center justify-between rounded-xl border border-amber-100/15 bg-slate-950/25 px-3 py-2">
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="font-ui text-sm text-amber-50/85">{item.name}</span>
                </div>
                <span className="font-ui text-sm text-amber-100/90">{item.value}</span>
              </div>
            ))}
          </div>
        </section>
      </div>

      <div className="admin-stat-panel rounded-2xl p-4 md:p-5">
        <div className="flex items-center gap-2 text-amber-100/80">
          <Clock3 className="h-4 w-4" />
          <p className="font-ui text-sm">
            Last cycle: {latestMonth?.label ?? "N/A"} added {latestMonth?.poems ?? 0} poems and published {latestMonth?.published ?? 0}.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminStatistics;
