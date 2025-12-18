import React from 'react';
import { Risk, Control, ActionPlan, RiskLevel } from '../types';
import { RISK_LEVEL_COLORS } from '../constants';
import { X, ArrowRight, Shield, AlertTriangle, CheckCircle, ClipboardList } from 'lucide-react';

export type DrillDownType = 'RISK' | 'CONTROL' | 'PLAN';

interface DrillDownModalProps {
  title: string;
  type: DrillDownType;
  items: (Risk | Control | ActionPlan)[];
  onClose: () => void;
  onItemClick?: (item: any) => void;
}

export const DrillDownModal: React.FC<DrillDownModalProps> = ({ title, type, items, onClose, onItemClick }) => {
  
  const renderRiskItem = (risk: Risk) => (
    <div 
        key={risk.id} 
        onClick={() => onItemClick && onItemClick(risk)}
        className="p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors flex justify-between items-center group cursor-pointer"
    >
      <div>
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xs font-mono text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded">{risk.code}</span>
          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${RISK_LEVEL_COLORS[risk.residualLevel]}`}>
            {risk.residualLevel}
          </span>
        </div>
        <h4 className="font-semibold text-gray-800 text-sm group-hover:text-brand-blue">{risk.title}</h4>
      </div>
      <div className="text-right">
        <div className="text-xs text-gray-500">Score Residual</div>
        <div className="font-bold text-gray-800">{risk.residualScore}</div>
      </div>
    </div>
  );

  const renderControlItem = (control: Control) => (
    <div 
        key={control.id} 
        onClick={() => onItemClick && onItemClick(control)}
        className="p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors flex justify-between items-center group cursor-pointer"
    >
      <div>
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xs font-mono text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded">{control.code}</span>
          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${control.effectiveness === 'EFICIENTE' ? 'bg-green-50 text-green-700 border-green-200' : 'bg-red-50 text-red-700 border-red-200'}`}>
            {control.effectiveness}
          </span>
        </div>
        <h4 className="font-semibold text-gray-800 text-sm group-hover:text-brand-blue">{control.name}</h4>
      </div>
      <div className="text-right">
        <div className="text-xs text-gray-500">{control.frequency}</div>
        <div className="font-bold text-gray-800 text-xs">{control.type}</div>
      </div>
    </div>
  );

  const renderPlanItem = (plan: ActionPlan) => (
    <div 
        key={plan.id} 
        onClick={() => onItemClick && onItemClick(plan)}
        className="p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors flex justify-between items-center group cursor-pointer"
    >
      <div>
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xs font-mono text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded">{plan.code}</span>
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-100">
            {plan.status}
          </span>
        </div>
        <h4 className="font-semibold text-gray-800 text-sm group-hover:text-brand-blue">{plan.title}</h4>
      </div>
      <div className="text-right">
        <div className="text-xs text-gray-500">Vencimento</div>
        <div className="font-bold text-gray-800 text-xs">{new Date(plan.dueDate).toLocaleDateString('pt-BR')}</div>
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex justify-center items-center backdrop-blur-sm animate-in fade-in duration-200 p-4">
      <div className="bg-white w-full max-w-2xl rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh] animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="p-5 border-b border-gray-100 flex justify-between items-center bg-gray-50">
          <div>
            <h3 className="text-lg font-bold text-gray-800">{title}</h3>
            <p className="text-xs text-gray-500 mt-1">{items.length} registros encontrados</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-200 rounded-full transition-colors text-gray-500">
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto flex-1">
          {items.length === 0 ? (
            <div className="p-10 text-center text-gray-400">
              Nenhum registro encontrado para este filtro.
            </div>
          ) : (
            <div>
              {type === 'RISK' && items.map((i) => renderRiskItem(i as Risk))}
              {type === 'CONTROL' && items.map((i) => renderControlItem(i as Control))}
              {type === 'PLAN' && items.map((i) => renderPlanItem(i as ActionPlan))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-gray-50 border-t border-gray-100 text-right">
          <button onClick={onClose} className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};
