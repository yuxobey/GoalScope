"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { ChevronLeft, Star } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer, ReferenceLine, Tooltip } from 'recharts';

// --- API FONKSİYONU BURADA ---
const REPL_URL = "https://goalscope-scraper.yuxobey.repl.co"; // BURAYI KENDİ LİNKİNLE DEĞİŞTİR

async function getFullData(id: string) {
  try {
    const res = await fetch(`${REPL_URL}/match/${id}/full`, { cache: 'no-store' });
    return await res.json();
  } catch (e) { return null; }
}

// --- MOMENTUM BİLEŞENİ BURADA ---
function MomentumChart({ data }: { data: any[] }) {
  if (!data || data.length === 0) return null;
  return (
    <div className="bg-[#151a23] p-4 rounded-xl border border-white/5 h-[200px] w-full mb-4">
      <h3 className="text-[10px] font-bold text-slate-400 uppercase mb-4">Maç Baskı Momenti</h3>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <XAxis dataKey="minute" hide />
          <YAxis hide domain={[-100, 100]} />
          <ReferenceLine y={0} stroke="#ffffff10" />
          <Area type="monotone" dataKey="value" stroke="#374df5" fill="#374df5" fillOpacity={0.3} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
function ShotMap({ shots }: { shots: any[] }) {
  if (!shots || shots.length === 0) return null;

  return (
    <div className="bg-[#151a23] p-4 rounded-xl border border-white/5">
      <h3 className="text-[10px] font-bold text-slate-400 uppercase mb-4 tracking-widest">Şut Haritası</h3>
      <div className="relative aspect-[3/2] bg-[#0b0e14] rounded-lg border border-white/10 overflow-hidden">
        {/* Saha Çizgileri - Basit SVG */}
        <svg viewBox="0 0 100 64" className="absolute inset-0 w-full h-full opacity-20 stroke-white fill-none">
          <rect x="0" y="0" width="100" height="64" />
          <line x1="50" y1="0" x2="50" y2="64" />
          <circle cx="50" cy="32" r="8" />
          <rect x="0" y="16" width="16" height="32" />
          <rect x="84" y="16" width="16" height="32" />
        </svg>

        {/* Şut Noktaları */}
        {shots.map((shot, i) => (
          <div 
            key={i}
            className={`absolute w-2 h-2 rounded-full border border-black transform -translate-x-1/2 -translate-y-1/2 shadow-lg transition-transform hover:scale-150`}
            style={{ 
              left: `${shot.playerCoordinates.x}%`, 
              top: `${shot.playerCoordinates.y}%`,
              backgroundColor: shot.isHome ? '#374df5' : '#e53935', // Ev: Mavi, Dep: Kırmızı
              opacity: shot.shotType === 'goal' ? 1 : 0.6,
              boxShadow: shot.shotType === 'goal' ? '0 0 10px #fff' : 'none'
            }}
            title={shot.shotType}
          />
        ))}
      </div>
      <div className="flex justify-between mt-3 text-[8px] font-bold text-slate-500">
        <div className="flex items-center gap-1"><div className="w-2 h-2 bg-[#374df5] rounded-full"></div> EV</div>
        <div className="flex items-center gap-1"><div className="w-2 h-2 bg-[#e53935] rounded-full"></div> DEP</div>
        <div className="italic">* Parlak noktalar goldür</div>
      </div>
    </div>
  );
}

// --- ANA SAYFA ---
export default function MatchDetailPage({ params }: { params: { id: string } }) {
  const [activeTab, setActiveTab] = useState("analiz");
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    getFullData(params.id).then(setData);
  }, [params.id]);

  if (!data) return <div className="p-10 text-center text-white">Yükleniyor...</div>;

  const match = data.info.event;

  return (
    <main className="min-h-screen bg-[#0b0e14] text-white p-4">
      <header className="mb-6 flex justify-between items-center bg-[#151a23] p-4 rounded-xl">
        <div className="flex flex-col items-center w-1/3">
           <img src={`https://img.sofascore.com/api/v1/team/${match.homeTeam.id}/image`} className="w-10 h-10 mb-2" />
           <span className="text-[10px] font-bold text-center">{match.homeTeam.name}</span>
        </div>
        <div className="text-center w-1/3">
           <div className="text-2xl font-black">{match.homeScore.display} - {match.awayScore.display}</div>
           <div className="text-[8px] opacity-50 uppercase">{match.status.description}</div>
        </div>
        <div className="flex flex-col items-center w-1/3">
           <img src={`https://img.sofascore.com/api/v1/team/${match.awayTeam.id}/image`} className="w-10 h-10 mb-2" />
           <span className="text-[10px] font-bold text-center">{match.awayTeam.name}</span>
        </div>
      </header>

      <div className="space-y-4">
        <MomentumChart data={data.momentum} />
        <ShotMap shots={data.shots} />
        <div className="bg-[#151a23] p-4 rounded-xl border border-white/5">
           <h3 className="text-[10px] font-bold text-slate-400 uppercase mb-2">Maç İstatistiği</h3>
           <div className="text-xs">Toplam Şut: {data.shots.length}</div>
        </div>
      </div>
    </main>
  );
}
