"use client";
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer, ReferenceLine, Tooltip } from 'recharts';

export default function MomentumChart({ data }: { data: any[] }) {
  if (!data || data.length === 0) return null;

  return (
    <div className="bg-[#151a23] p-4 rounded-xl border border-white/5">
      <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">Maç Baskı Momenti</h3>
      <div className="h-[160px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <XAxis dataKey="minute" hide />
            <YAxis hide domain={[-100, 100]} />
            <ReferenceLine y={0} stroke="#ffffff10" />
            <Tooltip content={() => null} />
            <Area type="monotone" dataKey="value" stroke="#374df5" fill="#374df5" fillOpacity={0.3} baseLine={0} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <div className="flex justify-between mt-2 text-[8px] font-bold text-slate-500">
        <span>EV SAHİBİ</span>
        <span>DEPLASMAN</span>
      </div>
    </div>
  );
}
