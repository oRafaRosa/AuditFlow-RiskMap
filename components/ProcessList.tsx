import React from 'react';
import { api } from '../services/mockDb';
import { ChevronRight, Layers } from 'lucide-react';

export const ProcessList: React.FC = () => {
  const processes = api.getProcesses();
  const risks = api.getRisks();
  const controls = api.getControls();
  const areas = api.getAreas();

  // Group by Area
  const processesByArea = areas.map(area => {
    return {
      area,
      processes: processes.filter(p => p.areaId === area.id)
    };
  }).filter(group => group.processes.length > 0);

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Cadeia de Valor e Processos</h2>
          <p className="text-sm text-gray-500">Mapeamento de processos, riscos associados e cobertura de controles.</p>
        </div>
      </div>

      {processesByArea.map(group => (
        <div key={group.area.id} className="space-y-3">
          <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider pl-1 border-l-4 border-brand-blue/50">
            {group.area.name}
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {group.processes.map(process => {
              const processRisks = risks.filter(r => r.processIds?.includes(process.id));
              const processControls = controls.filter(c => c.processIds?.includes(process.id));
              
              // Count critical risks
              const criticalCount = processRisks.filter(r => r.residualLevel === 'CRITICAL').length;
              const highCount = processRisks.filter(r => r.residualLevel === 'HIGH').length;

              return (
                <div key={process.id} className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-all hover:border-brand-blue/30 group cursor-pointer">
                  <div className="flex justify-between items-start mb-3">
                    <div className="p-2 bg-gray-50 rounded-lg text-brand-blue group-hover:bg-blue-50 transition-colors">
                       <Layers size={20} />
                    </div>
                    <span className="text-xs font-mono text-gray-400">{process.code}</span>
                  </div>
                  
                  <h4 className="font-bold text-gray-800 mb-1">{process.name}</h4>
                  <p className="text-xs text-gray-500 line-clamp-2 mb-4 h-8">{process.description}</p>
                  
                  <div className="flex items-center gap-2 mb-4">
                    {criticalCount > 0 && (
                      <span className="px-2 py-0.5 bg-red-100 text-red-700 text-[10px] font-bold rounded-full">
                        {criticalCount} Críticos
                      </span>
                    )}
                    {highCount > 0 && (
                      <span className="px-2 py-0.5 bg-orange-100 text-orange-700 text-[10px] font-bold rounded-full">
                        {highCount} Altos
                      </span>
                    )}
                    {criticalCount === 0 && highCount === 0 && (
                      <span className="px-2 py-0.5 bg-green-100 text-green-700 text-[10px] font-bold rounded-full">
                        Risco Controlado
                      </span>
                    )}
                  </div>

                  <div className="grid grid-cols-2 border-t border-gray-100 pt-3 text-center">
                    <div>
                      <span className="block text-xl font-bold text-gray-700">{processRisks.length}</span>
                      <span className="text-[10px] text-gray-400 uppercase">Riscos</span>
                    </div>
                    <div className="border-l border-gray-100">
                      <span className="block text-xl font-bold text-gray-700">{processControls.length}</span>
                      <span className="text-[10px] text-gray-400 uppercase">Controles</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};
