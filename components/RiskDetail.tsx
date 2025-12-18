import React from 'react';
import { api } from '../services/mockDb';
import { ControlEffectiveness, Risk } from '../types';
import { RISK_LEVEL_COLORS } from '../constants';
import { Briefcase } from 'lucide-react';

interface RiskDetailProps {
  risk: Risk;
  onClose: () => void;
}

export const RiskDetail: React.FC<RiskDetailProps> = ({ risk, onClose }) => {
  const processes = api.getProcesses();
  const enrichedControls = api.getRiskControlsEnriched(risk.id);
  
  // Helper to find process names
  const getProcessNames = (ids?: string[]) => {
    if (!ids) return 'N/A';
    return ids.map(id => processes.find(p => p.id === id)?.name).filter(Boolean).join(', ');
  };

  const getEffectivenessColor = (eff: ControlEffectiveness) => {
    switch (eff) {
      case ControlEffectiveness.EFFECTIVE: return 'bg-green-100 text-green-800 border-green-200';
      case ControlEffectiveness.PARTIALLY_EFFECTIVE: return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case ControlEffectiveness.INEFFECTIVE: return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };
  
  const totalMitigation = Math.round(risk.totalMitigationPercent);

  return (
    <div className="fixed inset-0 bg-black/50 z-[60] flex justify-end backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-3xl bg-white h-full shadow-2xl overflow-y-auto animate-in slide-in-from-right duration-300">
        
        {/* Header */}
        <div className="p-6 border-b border-gray-100 flex justify-between items-start sticky top-0 bg-white z-20 shadow-sm">
          <div>
            <div className="flex items-center gap-2 mb-2">
               <span className="text-xs font-mono text-gray-500 bg-gray-100 px-2 py-0.5 rounded border border-gray-200">{risk.code}</span>
               <span className={`px-2 py-0.5 text-xs font-bold rounded-full ${RISK_LEVEL_COLORS[risk.residualLevel]}`}>
                  {risk.residualLevel}
               </span>
            </div>
            <h2 className="text-2xl font-bold text-gray-800 leading-tight">{risk.title}</h2>
            <div className="flex items-center gap-2 mt-2 text-sm text-gray-500">
              <Briefcase size={14} />
              <span>Processos: {getProcessNames(risk.processIds)}</span>
            </div>
          </div>
          <button onClick={onClose} className="px-4 py-2 bg-gray-100 rounded hover:bg-gray-200 transition-colors font-medium text-gray-600">
            Fechar
          </button>
        </div>

        <div className="p-8 space-y-8">
          
          {/* Calculation Explanation */}
          <div className="bg-blue-50/50 p-6 rounded-xl border border-blue-100 shadow-sm">
             <h3 className="text-sm font-bold text-brand-blue uppercase mb-4 tracking-wide border-b border-blue-100 pb-2">Cálculo de Risco Residual</h3>
             <div className="flex items-center justify-between text-center max-w-lg mx-auto">
               <div>
                 <div className="text-3xl font-bold text-gray-400">{risk.inherentScore}</div>
                 <div className="text-xs font-semibold text-gray-500 uppercase mt-1">Inerente</div>
               </div>
               <div className="text-xl text-gray-400 font-light">×</div>
               <div>
                 <div className="text-3xl font-bold text-blue-600">{(100 - totalMitigation)}%</div>
                 <div className="text-xs font-semibold text-gray-500 uppercase mt-1">Exposição</div>
               </div>
               <div className="text-xl text-gray-400 font-light">=</div>
               <div>
                 <div className="text-4xl font-bold text-brand-blue">{risk.residualScore}</div>
                 <div className="text-xs font-semibold text-brand-blue uppercase mt-1">Score Residual</div>
               </div>
             </div>
             <div className="mt-4 text-center text-xs text-gray-400 bg-white/50 p-2 rounded">
                Mitigação Total Aplicada: <strong>{totalMitigation}%</strong> (Soma da mitigação efetiva dos controles)
             </div>
          </div>

          {/* Controls Table */}
          <div>
            <div className="flex justify-between items-end mb-4">
               <h3 className="text-lg font-bold text-gray-800">Eficácia dos Controles</h3>
               <span className="text-xs text-gray-500 bg-gray-50 px-2 py-1 rounded">
                 Mitigação Efetiva = Desenho × Eficácia
               </span>
            </div>
            
            <div className="border border-gray-200 rounded-lg overflow-hidden shadow-sm">
              <table className="w-full text-sm text-left">
                <thead className="bg-gray-50 text-gray-500 font-semibold border-b border-gray-200">
                  <tr>
                    <th className="p-3">Controle</th>
                    <th className="p-3">Avaliação</th>
                    <th className="p-3 text-right">Desenho</th>
                    <th className="p-3 text-right">Real</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {enrichedControls.map(c => (
                    <tr key={c.id} className="bg-white hover:bg-gray-50 transition-colors">
                      <td className="p-3">
                        <div className="font-medium text-gray-900">{c.name}</div>
                        <div className="text-xs text-gray-500">{c.code} • {c.type}</div>
                      </td>
                      <td className="p-3">
                         <span className={`px-2 py-1 rounded text-xs font-bold border ${getEffectivenessColor(c.effectiveness)}`}>
                           {c.effectiveness}
                         </span>
                      </td>
                      <td className="p-3 text-right text-gray-500">{c.designMitigation}%</td>
                      <td className="p-3 text-right font-bold text-brand-blue">
                        {c.effectiveMitigation > 0 ? c.effectiveMitigation.toFixed(0) : 0}%
                      </td>
                    </tr>
                  ))}
                  {enrichedControls.length === 0 && (
                    <tr>
                      <td colSpan={4} className="p-4 text-center text-gray-400 italic">Sem controles vinculados.</td>
                    </tr>
                  )}
                </tbody>
                <tfoot className="bg-gray-50 font-bold text-gray-700 border-t border-gray-200">
                  <tr>
                    <td colSpan={3} className="p-3 text-right uppercase text-xs tracking-wider">Mitigação Total</td>
                    <td className="p-3 text-right text-brand-blue text-lg">{totalMitigation}%</td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>

          {/* Description */}
          <div>
            <h3 className="text-lg font-bold mb-2 text-gray-800">Descrição Detalhada</h3>
            <p className="text-gray-600 leading-relaxed text-sm bg-gray-50 p-4 rounded-lg border border-gray-100">
              {risk.description}
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};
