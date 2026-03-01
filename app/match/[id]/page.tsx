// Sayfanın üstüne importları ekle:
import MomentumChart from "@/components/MomentumChart";
import { getFullMatchData } from "@/lib/api";

// ... State kısmına ekle:
const [analysisData, setAnalysisData] = useState<any>(null);

// ... useEffect içinde veriyi çek:
useEffect(() => {
  getFullMatchData(params.id).then(data => {
    if(data) setAnalysisData(data);
  });
}, [params.id]);

// ... Tablar kısmına "Analiz" tabı ekle ve içeriğine şunu koy:
{activeTab === 'analiz' && analysisData && (
  <div className="space-y-4 animate-in">
    <MomentumChart data={analysisData.momentum} />
    
    {/* Buraya Şut Haritası ve Isı Haritası gelecek */}
    <div className="bg-[#151a23] p-4 rounded-xl border border-white/5">
       <h3 className="text-[10px] font-bold text-slate-400 uppercase mb-2">Şut Analizi</h3>
       <p className="text-xs text-slate-500">Toplam Şut: {analysisData.shots?.length || 0}</p>
       {/* Şut görselleştirmesi bir sonraki adımda */}
    </div>
  </div>
)}
  
