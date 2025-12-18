import React, { useState } from 'react';
import { api } from '../services/mockDb';
import { Risk } from '../types';
import { RISK_LEVEL_COLORS } from '../constants';
import { ChevronRight, Filter, Download } from 'lucide-react';

interface RiskListProps {
  onRiskClick: (risk: Risk) => void;
}

export const RiskList: React.FC<RiskListProps> = ({ onRiskClick }) => {
  const risks = api.getRisks();
  const processes = api.getProcesses();

  // Helper to find process names
  const getProcessNames = (ids?: string[]) => {
    if (!ids) return 'N/A';
    return ids.map(id => processes.find(p => p.id === id)?.name).filter(Boolean).join(', ');
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-800">Inventário de Riscos</h2>
        <div className="flex gap-2">
           <button className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-200 rounded text-sm text-gray-600 hover:bg-gray-50">
             <Filter size={16} /> Filtros
           </button>
           <button className="flex items-center gap-2 px-3 py-2 bg-brand-blue text-white rounded text-sm hover:bg-blue-800 shadow-sm">
             <Download size={16} /> Exportar XLSX
           </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Risco</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Processos</th>
              <th className="px-6 py-3 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider">Inerente</th>
              <th className="px-6 py-3 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider">Mitigação</th>
              <th className="px-6 py-3 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider">Residual</th>
              <th className="px-6 py-3"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {risks.map((risk) => (
              <tr 
                key={risk.id} 
                className="hover:bg-blue-50/50 cursor-pointer transition-colors"
                onClick={() => onRiskClick(risk)}
              >
                <td className="px-6 py-4">
                  <div className="text-sm font-medium text-gray-900">{risk.title}</div>
                  <div className="text-xs font-mono text-gray-500">{risk.code}</div>
                </td>
                <td className="px-6 py-4">
                   <div className="flex flex-wrap gap-1">
                     {risk.processIds?.map(pid => {
                       const p = processes.find(proc => proc.id === pid);
                       return p ? (
                         <span key={pid} className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800">
                           {p.name}
                         </span>
                       ) : null;
                     })}
                   </div>
                </td>
                <td className="px-6 py-4 text-center">
                  <div className="text-sm font-bold text-gray-600">{risk.inherentScore}</div>
                </td>
                <td className="px-6 py-4 text-center">
                  <div className="flex items-center justify-center gap-1">
                    <div className="w-16 bg-gray-200 rounded-full h-2 overflow-hidden">
                      <div className="bg-blue-600 h-2" style={{ width: `${risk.totalMitigationPercent}%` }}></div>
                    </div>
                    <span className="text-xs font-bold text-blue-700">{Math.round(risk.totalMitigationPercent)}%</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center">
                  <span className={`px-2 py-1 text-xs font-bold rounded-full ${RISK_LEVEL_COLORS[risk.residualLevel]}`}>
                    {risk.residualLevel}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <ChevronRight size={16} className="text-gray-400 inline" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
