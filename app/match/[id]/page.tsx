"use client";
import { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import { ChevronLeft, Star, Activity, BarChart3, Users, History } from "lucide-react";
import { getFullMatchData } from "@/lib/api";
import MomentumChart from "@/components/MomentumChart";

export default function MatchDetailPage({ params }: { params: { id: string } }) {
  const [activeTab, setActiveTab] = useState("ozet");
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getFullMatchData(params.id).then(res => {
      setData(res);
      setLoading(false);
    });
  }, [params.id]);

  if (loading) return <div className="min-h-screen bg-[#0b0e14] flex items-center justify-center"><div className="w-8 h-8 border-4 border-[#374df5] border-t-transparent rounded-full animate-spin"></div></div>;
  if (!data) return <div className="text-white p-10 text-center">Veri bulunamadı.</div>;

  const match = data.info.event;

  return (
    <main className="min-h-screen bg-[#0b0e14] text-white font-sans pb-20">
      {/* HEADER / SKORBORD */}
      <header className="bg-[#151a23] p-6 border-b border-white/5">
        <div className="flex justify-between mb-8">
          <Link href="/"><ChevronLeft /></Link>
          <div className="text-center">
            <p className="text-[10px] text-slate-400 uppercase font-bold">{match.tournament.name}</p>
          </div>
          <Star className="text-slate-500" />
        </div>
        
        <div className="flex justify-between items-center">
          <TeamDisplay name={match.homeTeam.name} id={match.homeTeam.id} />
          <div className="text-center">
            <div className="text-4xl font-black mb-1">{match.homeScore.display} - {match.awayScore.display}</div>
            <div className="text-[10px] bg-white/5 px-2 py-1 rounded text-slate-400 font-bold uppercase">{match.status.description}</div>
          </div>
          <TeamDisplay name={match.awayTeam.name} id={match.awayTeam.id} reverse />
        </div>
      </header>

      {/* TABS */}
      <div className="flex overflow-x-auto bg-[#0b0e14] border-b border-white/5 sticky top-0 z-50">
        {['ozet', 'analiz', 'kadro', 'istatistik'].map((tab) => (
          <button 
            key={tab} 
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-4 text-[11px] font-bold uppercase transition-all ${activeTab === tab ? "text-[#374df5] border-b-2 border-[#374df5]" : "text-slate-500"}`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* CONTENT */}
      <div className="p-4 max-w-2xl mx-auto space-y-4">
        {activeTab === 'analiz' && (
          <div className="space-y-4 animate-in fade-in duration-500">
            <MomentumChart data={data.momentum} />
            
            {/* ŞUT ANALİZİ KARTI */}
            <div className="bg-[#151a23] p-4 rounded-xl border border-white/5">
              <h3 className="text-[10px] font-bold text-slate-400 uppercase mb-4 tracking-widest">Şut Analizi</h3>
              <div className="grid grid-cols-2 gap-4">
                <StatMini title="Toplam Şut" value={data.shots.length} />
                <StatMini title="xG (Gol Beklentisi)" value={(data.shots.length * 0.12).toFixed(2)} />
              </div>
            </div>

            {/* ISI HARİTASI ÖNİZLEME */}
            <div className="bg-[#151a23] p-4 rounded-xl border border-white/5">
              <h3 className="text-[10px] font-bold text-slate-400 uppercase mb-4 tracking-widest">Saha Yerleşimi</h3>
              <div className="aspect-[3/2] bg-[#0b0e14] rounded-lg border border-white/5 flex items-center justify-center relative overflow-hidden">
                 <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'url(https://www.sofascore.com/static/images/pitch.png)', backgroundSize: 'cover' }}></div>
                 <span className="text-[10px] text-slate-500 z-10 font-bold">Ortalama Pozisyonlar Hazırlanıyor...</span>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'ozet' && <div className="text-slate-400 text-sm italic">Maç olayları ve özet burada yer alacak...</div>}
      </div>
    </main>
  );
}

// YARDIMCI BİLEŞENLER
function TeamDisplay({ name, id, reverse }: any) {
  return (
    <div className={`flex flex-col items-center gap-2 w-1/3 ${reverse ? 'text-right' : 'text-left'}`}>
      <img src={`https://img.sofascore.com/api/v1/team/${id}/image`} className="w-12 h-12 object-contain" />
      <span className="text-[11px] font-bold text-center leading-tight">{name}</span>
    </div>
  );
}

function StatMini({ title, value }: any) {
  return (
    <div className="bg-[#0b0e14] p-3 rounded-lg border border-white/5">
      <p className="text-[9px] text-slate-500 font-bold uppercase mb-1">{title}</p>
      <p className="text-xl font-black text-white">{value}</p>
    </div>
  );
}
