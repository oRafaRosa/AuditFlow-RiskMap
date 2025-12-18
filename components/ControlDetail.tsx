import React from 'react';
import { api } from '../services/mockDb';
import { Control, ControlEffectiveness } from '../types';
import { RISK_LEVEL_COLORS } from '../constants';
import { Shield, ArrowRight, Calendar, ClipboardList, Clock, GitFork, FileCheck, CheckCircle, AlertTriangle, XCircle } from 'lucide-react';

interface ControlDetailProps {
  control: Control;
  onClose: () => void;
}

export const ControlDetail: React.FC<ControlDetailProps> = ({ control, onClose }) => {
  const linkedRisks = api.getRisksByControlId(control.id);
  const processes = api.getProcesses();
  const linkedProcesses = processes.filter(p => control.processIds.includes(p.id));
  const actionPlans = api.getActionPlansByControlId(control.id);

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
    <div className="fixed inset-0 bg-black/50 z-[60] flex justify-end backdrop-blur-sm">
      <div className="w-full max-w-2xl bg-white h-full shadow-2xl overflow-y-auto animate-in slide-in-from-right duration-300 flex flex-col">
        
        {/* Header */}
        <div className="p-6 border-b border-gray-100 bg-white sticky top-0 z-10">
          <div className="flex justify-between items-start mb-4">
            <div>
              <span className="text-xs font-mono text-gray-400 bg-gray-50 px-2 py-1 rounded border border-gray-100">{control.code}</span>
              <h2 className="text-2xl font-bold text-gray-900 mt-2">{control.name}</h2>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <ArrowRight size={20} className="text-gray-400" />
            </button>
          </div>
          
          <div className="flex flex-wrap gap-3 items-center">
            {getEffectivenessBadge(control.effectiveness)}
            <span className="text-xs text-gray-500 flex items-center gap-1">
              <Calendar size={12} /> Última avaliação: {control.lastAssessmentDate ? new Date(control.lastAssessmentDate).toLocaleDateString('pt-BR') : 'N/A'}
            </span>
            <span className="text-xs text-gray-500 px-2 py-0.5 bg-gray-100 rounded-full border border-gray-200">
              {control.type}
            </span>
            <span className="text-xs text-gray-500 px-2 py-0.5 bg-gray-100 rounded-full border border-gray-200">
              {control.frequency}
            </span>
          </div>
        </div>

        <div className="p-6 space-y-8 flex-1">
          
          {/* Description */}
          <div>
            <h3 className="text-sm font-bold text-gray-900 mb-2">Descrição do Controle</h3>
            <p className="text-sm text-gray-600 leading-relaxed bg-gray-50 p-4 rounded-lg border border-gray-100">
              {control.description}
            </p>
          </div>

          {/* Action Plans */}
          {actionPlans.length > 0 && (
            <div className="bg-orange-50/50 rounded-lg p-4 border border-orange-100">
              <h3 className="text-sm font-bold text-orange-800 mb-3 flex items-center gap-2">
                  <ClipboardList size={16} /> Planos de Ação ({actionPlans.length})
              </h3>
              <div className="space-y-2">
                  {actionPlans.map(plan => (
                      <div key={plan.id} className="bg-white p-3 rounded border border-orange-200 shadow-sm flex justify-between items-start">
                          <div>
                              <p className="text-sm font-bold text-gray-800">{plan.title}</p>
                              <p className="text-xs text-gray-500">{plan.code} • {plan.status}</p>
                          </div>
                          <div className="flex items-center gap-1 text-xs text-orange-600 font-medium bg-orange-50 px-2 py-1 rounded">
                              <Clock size={12} />
                              {new Date(plan.dueDate).toLocaleDateString('pt-BR')}
                          </div>
                      </div>
                  ))}
              </div>
            </div>
          )}
          {control.effectiveness === 'INEFICIENTE' && actionPlans.length === 0 && (
              <div className="bg-red-50 p-4 rounded-lg border border-red-100 flex justify-between items-center">
                  <div>
                      <h4 className="text-sm font-bold text-red-800">Controle Ineficiente</h4>
                      <p className="text-xs text-red-600">Requer criação de Plano de Ação imediata.</p>
                  </div>
                  <button className="px-3 py-1.5 bg-white border border-red-200 text-red-700 text-xs font-bold rounded shadow-sm hover:bg-red-50">
                      + Criar Plano
                  </button>
              </div>
          )}


          {/* Linked Risks Section */}
          <div>
            <div className="flex justify-between items-center mb-4">
               <h3 className="text-sm font-bold text-gray-900 flex items-center gap-2">
                 <Shield size={16} className="text-brand-blue" />
                 Riscos Mitigados ({linkedRisks.length})
               </h3>
               <span className="text-xs text-gray-400">Impacto no Residual</span>
            </div>
            
            <div className="space-y-3">
              {linkedRisks.map(risk => (
                <div key={risk.id} className="p-4 border border-gray-200 rounded-lg hover:border-brand-blue/30 transition-colors group bg-white">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] font-mono text-gray-400">{risk.code}</span>
                        <span className={`text-[10px] px-1.5 rounded-full font-bold ${RISK_LEVEL_COLORS[risk.residualLevel]}`}>
                          {risk.residualLevel}
                        </span>
                      </div>
                      <h4 className="text-sm font-semibold text-gray-800 group-hover:text-brand-blue transition-colors">{risk.title}</h4>
                    </div>
                    
                    {/* Mitigation Calculation Visualization */}
                    <div className="flex flex-col items-end gap-1 ml-4">
                      <div className="flex items-center text-xs gap-2">
                         <span className="text-gray-400">Desenho:</span>
                         <span className="font-medium text-gray-700">{risk.linkContext.designMitigation}%</span>
                      </div>
                      <div className="flex items-center text-xs gap-2">
                         <span className="text-gray-400">Efetivo:</span>
                         <span className={`font-bold ${risk.linkContext.effectiveMitigation > 0 ? 'text-brand-blue' : 'text-red-500'}`}>
                           {risk.linkContext.effectiveMitigation.toFixed(0)}%
                         </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              {linkedRisks.length === 0 && (
                <div className="text-center py-6 border border-dashed border-gray-200 rounded-lg text-gray-400 text-sm">
                  Este controle não está vinculado a nenhum risco ativo.
                </div>
              )}
            </div>
          </div>

          {/* Linked Processes */}
          <div>
             <h3 className="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
               <GitFork size={16} className="text-gray-500" />
               Processos Afetados
             </h3>
             <div className="flex flex-wrap gap-2">
               {linkedProcesses.map(p => (
                 <div key={p.id} className="px-3 py-1.5 bg-white border border-gray-200 rounded-md text-xs text-gray-600 shadow-sm flex items-center gap-2">
                   <span className="w-1.5 h-1.5 rounded-full bg-brand-blue"></span>
                   <span className="font-mono text-gray-400">{p.code}</span>
                   <span className="font-medium">{p.name}</span>
                 </div>
               ))}
             </div>
          </div>

          {/* Assessment History (Mock) */}
          <div>
             <h3 className="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
               <FileCheck size={16} className="text-gray-500" />
               Histórico de Testes
             </h3>
             <div className="border-l-2 border-gray-100 pl-4 space-y-4">
                <div className="relative">
                  <div className="absolute -left-[21px] top-1 w-3 h-3 rounded-full bg-gray-200 border-2 border-white"></div>
                  <p className="text-xs text-gray-500 mb-1">
                    {control.lastAssessmentDate ? new Date(control.lastAssessmentDate).toLocaleDateString('pt-BR') : 'N/A'} • Auditor Interno
                  </p>
                  <p className="text-sm font-medium text-gray-800">Teste de Desenho e Operação</p>
                  <p className="text-xs text-gray-600 mt-1">
                    Resultado: <span className="font-semibold">{control.effectiveness}</span>. 
                    {control.effectiveness === 'INEFICIENTE' 
                      ? ' Falha identificada na amostra testada. Plano de ação aberto.' 
                      : ' Controle operando conforme desenhado.'}
                  </p>
                </div>
             </div>
          </div>

        </div>
      </div>
    </div>
  );
};
