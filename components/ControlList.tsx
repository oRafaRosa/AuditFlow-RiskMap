import React, { useState } from 'react';
import { api } from '../services/mockDb';
import { Control, ControlEffectiveness } from '../types';
import { CheckCircle, AlertTriangle, XCircle, Search, Filter, ArrowRight } from 'lucide-react';
import { ControlDetail } from './ControlDetail';

export const ControlList: React.FC = () => {
  const [selectedControl, setSelectedControl] = useState<Control | null>(null);
  const controls = api.getControls();

  const getEffectivenessBadge = (eff: ControlEffectiveness) => {
    switch (eff) {
      case ControlEffectiveness.EFFECTIVE:
        return <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 border border-green-200"><CheckCircle size={12}/> Eficiente</span>;
      case ControlEffectiveness.PARTIALLY_EFFECTIVE:
        return <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 border border-yellow-200"><AlertTriangle size={12}/> Parcial</span>;
      case ControlEffectiveness.INEFFECTIVE:
        return <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 border border-red-200"><XCircle size={12}/> Ineficiente</span>;
      default:
        return <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 border border-gray-200">Não Testado</span>;
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold text-gray-800">Matriz de Controles</h2>
          <p className="text-sm text-gray-500">Inventário de controles, testes de eficácia e cobertura de riscos.</p>
        </div>
        <div className="flex gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <input 
              type="text" 
              placeholder="Buscar controle..." 
              className="pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm w-64 focus:outline-none focus:ring-2 focus:ring-brand-blue/20"
            />
          </div>
          <button className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-50">
             <Filter size={16} /> Filtros
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Código</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Nome do Controle</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Tipo/Freq</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Eficácia</th>
              <th className="px-6 py-3"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {controls.map((control) => (
              <tr 
                key={control.id} 
                className="hover:bg-blue-50/30 cursor-pointer transition-colors"
                onClick={() => setSelectedControl(control)}
              >
                <td className="px-6 py-4 whitespace-nowrap text-xs font-mono text-gray-500">
                  {control.code}
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm font-medium text-gray-900">{control.name}</div>
                  <div className="text-xs text-gray-500 truncate max-w-md">{control.description}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                   <div className="flex flex-col text-xs text-gray-500">
                     <span>{control.type}</span>
                     <span className="text-gray-400">{control.frequency}</span>
                   </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {getEffectivenessBadge(control.effectiveness)}
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="p-2 text-gray-400 hover:text-brand-blue rounded-full hover:bg-blue-50 w-fit ml-auto">
                    <ArrowRight size={16} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedControl && (
        <ControlDetail 
          control={selectedControl} 
          onClose={() => setSelectedControl(null)} 
        />
      )}
    </div>
  );
};
