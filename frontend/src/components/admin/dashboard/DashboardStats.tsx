// import { useEffect, useMemo, useState } from 'react';
// import { Activity, Bus, Calendar, DollarSign, Seat, TrendingUp, Users } from 'lucide-react';
// import { apiUrl } from '../../http';

// interface Stat {
//   label: string;
//   value: string;
//   icon: React.ReactNode;
//   accent: string;
//   sub?: string;
// }

// function StatCard({ label, value, icon, accent, sub }: Stat) {
//   return (
//     <div className="rounded-2xl border border-slate-100 bg-white/80 p-5 shadow-sm backdrop-blur">
//       <div className="flex items-start justify-between">
//         <div className="flex flex-col gap-1">
//           <span className="text-sm font-medium text-slate-500">{label}</span>
//           <span className="text-2xl font-semibold text-slate-900">{value}</span>
//           {sub && <span className="text-xs text-slate-500">{sub}</span>}
//         </div>
//         <div className={`flex h-10 w-10 items-center justify-center rounded-full ${accent}`}>
//           {icon}
//         </div>
//       </div>
//     </div>
//   );
// }

// export function DashboardStats() {
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   const [stats, setStats] = useState({
//     totalBuses: 0,
//     totalBookings: 0,
//     activeBookings: 0,
//     todayBookings: 0,
//     totalRevenue: 0,
//     soldSeats: 0,
//     seatUtilization: 0,
//     totalRoutes: 0,
//     totalUsers: 0,
//   });

//   useEffect(() => {
//     const fetchStats = async () => {
//       try {
//         setLoading(true);
//         setError(null);
//         const response = await fetch(`${apiUrl}/admin/stats`);
//         if (!response.ok) {
//           throw new Error('Failed to fetch stats');
//         }
//         const data = await response.json();
//         setStats({
//           totalBuses: data.totalBuses ?? 0,
//           totalBookings: data.totalBookings ?? 0,
//           activeBookings: data.activeBookings ?? 0,
//           todayBookings: data.todayBookings ?? 0,
//           totalRevenue: data.totalRevenue ?? 0,
//           soldSeats: data.soldSeats ?? 0,
//           seatUtilization: data.seatUtilization ?? 0,
//           totalRoutes: data.totalRoutes ?? 0,
//           totalUsers: data.totalUsers ?? 0,
//         });
//       } catch (err: any) {
//         setError(err?.message || 'Unable to load stats');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchStats();
//   }, []);

//   const cards = useMemo<Stat[]>(
//     () => [
//       {
//         label: 'Revenue',
//         value: `$${stats.totalRevenue.toLocaleString(undefined, { maximumFractionDigits: 0 })}`,
//         sub: 'Lifetime booking revenue',
//         icon: <DollarSign className="h-5 w-5 text-emerald-700" />,
//         accent: 'bg-emerald-50',
//       },
//       {
//         label: 'Bookings',
//         value: `${stats.totalBookings}`,
//         sub: `${stats.todayBookings} today · ${stats.activeBookings} confirmed`,
//         icon: <TrendingUp className="h-5 w-5 text-blue-700" />,
//         accent: 'bg-blue-50',
//       },
//       {
//         label: 'Seat Utilization',
//         value: `${stats.seatUtilization}%`,
//         sub: `${stats.soldSeats} seats sold`,
//         icon: <Seat className="h-5 w-5 text-orange-700" />,
//         accent: 'bg-orange-50',
//       },
//       {
//         label: 'Fleet',
//         value: `${stats.totalBuses} buses`,
//         sub: `${stats.totalRoutes} routes`,
//         icon: <Bus className="h-5 w-5 text-indigo-700" />,
//         accent: 'bg-indigo-50',
//       },
//       {
//         label: 'Users',
//         value: `${stats.totalUsers}`,
//         sub: 'Registered accounts',
//         icon: <Users className="h-5 w-5 text-slate-700" />,
//         accent: 'bg-slate-100',
//       },
//       {
//         label: 'Upcoming Trips',
//         value: `${stats.todayBookings}`,
//         sub: 'Departing today',
//         icon: <Calendar className="h-5 w-5 text-rose-700" />,
//         accent: 'bg-rose-50',
//       },
//     ],
//     [stats]
//   );

//   if (loading) {
//     return (
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//         {[...Array(6)].map((_, idx) => (
//           <div
//             key={idx}
//             className="h-28 animate-pulse rounded-2xl bg-slate-100"
//           />
//         ))}
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="rounded-xl border border-rose-100 bg-rose-50 p-4 text-rose-700">
//         {error}
//       </div>
//     );
//   }

//   return (
//     <div className="space-y-4">
//       <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-6 gap-4">
//         {cards.map((card) => (
//           <StatCard key={card.label} {...card} />
//         ))}
//       </div>
//       <div className="rounded-2xl bg-gradient-to-r from-slate-900 via-indigo-900 to-slate-800 p-[1px]">
//         <div className="rounded-2xl bg-slate-900/70 px-6 py-5 text-slate-50 shadow-lg">
//           <div className="flex items-center gap-3 text-sm uppercase tracking-[0.2em] text-indigo-200">
//             <Activity className="h-4 w-4" /> Live Pulse
//           </div>
//           <div className="mt-3 text-2xl font-semibold">
//             {stats.activeBookings} active bookings · {stats.totalBuses} buses in service
//           </div>
//           <p className="mt-2 text-sm text-slate-200">
//             Aggregates refresh on load. Keep this tab open during operations to monitor fleet health.
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }
