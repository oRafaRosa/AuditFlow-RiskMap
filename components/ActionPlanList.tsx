import React from 'react';
import { api } from '../services/mockDb';
import { ActionPlanStatus, ActionPlanPriority } from '../types';
import { CheckSquare, Clock, AlertCircle, User, ArrowRight, Shield, AlertTriangle } from 'lucide-react';

export const ActionPlanList: React.FC = () => {
  const plans = api.getActionPlans();
  const users = api.getUsers();
  const controls = api.getControls();

  const getStatusColor = (status: ActionPlanStatus) => {
    switch (status) {
      case ActionPlanStatus.OPEN: return 'bg-blue-100 text-blue-700 border-blue-200';
      case ActionPlanStatus.IN_PROGRESS: return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case ActionPlanStatus.DELAYED: return 'bg-red-100 text-red-700 border-red-200';
      case ActionPlanStatus.DONE: return 'bg-green-100 text-green-700 border-green-200';
      case ActionPlanStatus.VALIDATED: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getPriorityIcon = (priority: ActionPlanPriority) => {
    switch(priority) {
        case ActionPlanPriority.CRITICAL: return <AlertTriangle size={14} className="text-red-600" />;
        case ActionPlanPriority.HIGH: return <AlertCircle size={14} className="text-orange-500" />;
        default: return <div className="w-3 h-3 rounded-full bg-blue-400"></div>;
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Planos de Ação</h2>
          <p className="text-sm text-gray-500">Gestão de remediação de falhas de controle e tratamento de riscos.</p>
        </div>
        <button className="px-4 py-2 bg-brand-blue text-white rounded-lg hover:bg-blue-800 shadow-sm font-medium flex items-center gap-2">
            + Novo Plano
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {plans.map(plan => {
          const owner = users.find(u => u.id === plan.ownerId);
          const control = plan.controlId ? controls.find(c => c.id === plan.controlId) : null;

          return (
            <div key={plan.id} className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all flex flex-col md:flex-row gap-4 items-start md:items-center">
                
                {/* Status Stripe */}
                <div className={`hidden md:block w-1.5 self-stretch rounded-full ${getStatusColor(plan.status).replace('text', 'bg').split(' ')[0]}`}></div>

                <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-3">
                        <span className="text-xs font-mono text-gray-400">{plan.code}</span>
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${getStatusColor(plan.status)}`}>
                            {plan.status.replace('_', ' ')}
                        </span>
                        {plan.priority === ActionPlanPriority.CRITICAL && (
                             <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-red-50 text-red-600 border border-red-100 flex items-center gap-1">
                                CRÍTICO
                             </span>
                        )}
                    </div>
                    <h3 className="text-lg font-bold text-gray-800">{plan.title}</h3>
                    <p className="text-sm text-gray-500">{plan.description}</p>
                    
                    {/* Linked Entity Badge */}
                    {control && (
                        <div className="inline-flex items-center gap-1.5 px-2 py-1 bg-gray-50 border border-gray-100 rounded text-xs text-gray-600 mt-2">
                            <Shield size={12} />
                            <span>Controle: {control.code} - {control.name}</span>
                        </div>
                    )}
                </div>

                {/* Meta Data */}
                <div className="flex flex-row md:flex-col gap-4 md:gap-2 min-w-[200px] border-t md:border-t-0 border-gray-100 pt-4 md:pt-0 md:border-l md:pl-6">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                        <User size={14} className="text-gray-400"/>
                        <span className="font-medium">{owner?.name || 'N/A'}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                        <Clock size={14} className={plan.status === ActionPlanStatus.DELAYED ? 'text-red-500' : 'text-gray-400'}/>
                        <span className={plan.status === ActionPlanStatus.DELAYED ? 'text-red-600 font-bold' : 'text-gray-600'}>
                            Vence: {new Date(plan.dueDate).toLocaleDateString('pt-BR')}
                        </span>
                    </div>
                    <button className="text-xs text-brand-blue font-semibold hover:underline flex items-center gap-1 mt-1">
                        Ver Detalhes <ArrowRight size={12}/>
                    </button>
                </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
