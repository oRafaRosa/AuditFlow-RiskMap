import React from 'react';
import { Clock, Calculator, ExternalLink, ArrowRight } from 'lucide-react';

export const AppsHub: React.FC = () => {
  const apps = [
    {
      name: 'AuditFlow Timesheet',
      description: 'Gestão de horas, alocação de recursos e controle de produtividade da equipe de auditoria.',
      url: 'https://orafarosa.github.io/AuditFlowTimesheet/',
      icon: Clock,
      color: 'bg-blue-50 text-blue-600',
      borderColor: 'group-hover:border-blue-200'
    },
    {
      name: 'AuditFlow Sampling',
      description: 'Calculadora estatística para determinação de tamanho de amostra e extrapolação de erros.',
      url: 'https://orafarosa.github.io/AuditFlowSampling/',
      icon: Calculator,
      color: 'bg-purple-50 text-purple-600',
      borderColor: 'group-hover:border-purple-200'
    }
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div>
        <h2 className="text-2xl font-bold text-gray-800">Nossos Apps</h2>
        <p className="text-sm text-gray-500">Ecossistema de ferramentas integradas da Auditoria Interna.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {apps.map((app) => (
          <a
            key={app.name}
            href={app.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`bg-white p-6 rounded-xl border border-gray-200 shadow-sm transition-all hover:shadow-lg hover:-translate-y-1 group ${app.borderColor}`}
          >
            <div className="flex justify-between items-start mb-4">
              <div className={`p-3 rounded-xl ${app.color} transition-transform group-hover:scale-110`}>
                <app.icon size={24} />
              </div>
              <ExternalLink size={16} className="text-gray-300 group-hover:text-gray-500" />
            </div>

            <h3 className="text-lg font-bold text-gray-800 mb-2 group-hover:text-brand-blue transition-colors">
              {app.name}
            </h3>
            <p className="text-sm text-gray-500 mb-6 leading-relaxed">
              {app.description}
            </p>

            <div className="flex items-center gap-2 text-sm font-semibold text-brand-blue group-hover:underline">
              Acessar Ferramenta <ArrowRight size={14} />
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};
