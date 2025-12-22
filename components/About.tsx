import React, { useState } from 'react';
import { Shield, Code, Users, Award, Heart, BookOpen, Calculator, Activity, CheckCircle, AlertTriangle, Info, Zap, ExternalLink } from 'lucide-react';
import { RISK_LEVEL_COLORS } from '../constants';

export const About: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'ABOUT' | 'MANUAL'>('MANUAL');

  const renderAbout = () => (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-[#0033C6] to-[#002288] rounded-2xl shadow-xl overflow-hidden text-white relative">
        <div className="absolute top-0 right-0 p-10 opacity-10">
          <Shield size={300} />
        </div>
        <div className="p-12 relative z-10 text-center md:text-left">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold tracking-wider mb-4 border border-white/20">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
            V 1.0.0 • PROD
          </div>
          <h1 className="text-3xl md:text-5xl font-bold mb-4">AuditFlow <span className="font-light opacity-80">RiskMap</span></h1>
          <p className="text-blue-100 text-lg max-w-2xl leading-relaxed">
            Plataforma corporativa de Governança, Riscos e Compliance (GRC) projetada para modernizar e agilizar os processos de auditoria interna.
          </p>
        </div>
      </div>

      {/* Main Statement Card */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-10 text-center relative overflow-hidden group hover:border-brand-blue/30 transition-colors">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-blue via-blue-400 to-brand-blue"></div>
        
        <div className="flex justify-center mb-6">
          <div className="p-4 bg-blue-50 rounded-full text-brand-blue group-hover:scale-110 transition-transform duration-300">
            <Code size={40} strokeWidth={1.5} />
          </div>
        </div>

        <h2 className="text-2xl font-bold text-gray-800 mb-4">Desenvolvimento Interno</h2>
        <p className="text-xl text-gray-600 font-medium max-w-3xl mx-auto leading-relaxed">
          Este aplicativo foi <span className="text-brand-blue font-bold">100% desenvolvido</span> pela equipe de <span className="text-gray-900">Auditoria Interna do Grupo Casas Bahia</span>.
        </p>

        <div className="mt-8 flex justify-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-gray-100 rounded-full text-xs font-semibold text-gray-600">
                <Users size={12} />
                Feito por Auditores
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-gray-100 rounded-full text-xs font-semibold text-gray-600">
                <Heart size={12} className="text-red-500" />
                Para o Negócio
            </span>
        </div>
      </div>

      {/* Grid Features */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
          <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center text-brand-blue mb-4">
            <Shield size={20} />
          </div>
          <h3 className="font-bold text-gray-800 mb-2">Segurança & Controle</h3>
          <p className="text-sm text-gray-500">
            Focado na identificação precisa de riscos residuais e na eficácia dos controles internos.
          </p>
        </div>
        
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
          <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center text-brand-blue mb-4">
            <Award size={20} />
          </div>
          <h3 className="font-bold text-gray-800 mb-2">Excelência Técnica</h3>
          <p className="text-sm text-gray-500">
            Utilizando stack tecnológica moderna (React, TypeScript) para alta performance e usabilidade.
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
          <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center text-brand-blue mb-4">
            <Users size={20} />
          </div>
          <h3 className="font-bold text-gray-800 mb-2">Colaborativo</h3>
          <p className="text-sm text-gray-500">
            Ferramenta integrada que conecta gestores de risco, auditores e executivos em uma única visão.
          </p>
        </div>
      </div>
    </div>
  );

  const renderManual = () => (
    <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
      
      {/* Section 1: Introduction */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
        <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-blue-50 text-brand-blue rounded-lg">
                <BookOpen size={24} />
            </div>
            <h2 className="text-xl font-bold text-gray-800">Manual Metodológico</h2>
        </div>
        <p className="text-gray-600 leading-relaxed">
            Este módulo tem como objetivo padronizar a avaliação de riscos e controles, fornecendo uma visão clara da exposição residual da companhia.
            O sistema utiliza um modelo quantitativo para cálculo de score, permitindo a priorização automática baseada na eficácia dos controles testados.
        </p>
      </div>

      {/* Section 2: Calculation Logic */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
            <div className="flex items-center gap-2 mb-4">
                <Activity size={20} className="text-gray-400" />
                <h3 className="font-bold text-gray-800">1. Risco Inerente</h3>
            </div>
            <p className="text-sm text-gray-500 mb-4 text-justify">
                Representa o risco intrínseco à atividade, sem considerar controles. É calculado multiplicando a Probabilidade pelo Impacto.
            </p>
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-100 text-center font-mono text-sm text-gray-700">
                Score Inerente = Probabilidade (1-5) × Impacto (1-5)
            </div>
            <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
                <div className="p-2 bg-green-50 text-green-800 rounded">Score 1-4: Baixo</div>
                <div className="p-2 bg-yellow-50 text-yellow-800 rounded">Score 5-9: Médio</div>
                <div className="p-2 bg-orange-50 text-orange-800 rounded">Score 10-16: Alto</div>
                <div className="p-2 bg-red-50 text-red-800 rounded">Score 17-25: Crítico</div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
            <div className="flex items-center gap-2 mb-4">
                <Calculator size={20} className="text-gray-400" />
                <h3 className="font-bold text-gray-800">2. Risco Residual (Cálculo)</h3>
            </div>
            <p className="text-sm text-gray-500 mb-4 text-justify">
                É o risco que permanece após a aplicação dos controles. O sistema desconta do score inerente a "Força de Mitigação" dos controles vinculados.
            </p>
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 text-center font-mono text-sm text-brand-blue">
                Residual = Inerente × (1 - % Mitigação Total)
            </div>
            <div className="mt-4 flex items-start gap-2 text-xs text-gray-500 bg-gray-50 p-2 rounded">
                <Info size={14} className="mt-0.5 shrink-0" />
                <p>Se a mitigação for 100%, o risco residual será mínimo (Score 1). Se for 0%, o residual é igual ao inerente.</p>
            </div>
          </div>
      </div>

      {/* Section 3: Controls Logic */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
         <div className="p-6 border-b border-gray-100 bg-gray-50">
             <div className="flex items-center gap-2">
                 <Zap size={20} className="text-yellow-500" />
                 <h3 className="font-bold text-gray-800">3. Eficácia dos Controles e Mitigação</h3>
             </div>
             <p className="text-sm text-gray-600 mt-1">
                 O fator crucial para a redução do risco é a avaliação do auditor sobre o controle.
             </p>
         </div>
         <div className="p-6">
            <div className="relative overflow-x-auto">
                <table className="w-full text-sm text-left">
                    <thead className="text-xs text-gray-900 font-bold uppercase bg-gray-100 border-b border-gray-200">
                        <tr>
                            <th className="px-6 py-3">Avaliação do Auditor</th>
                            <th className="px-6 py-3">Peso na Mitigação</th>
                            <th className="px-6 py-3">Impacto no Risco</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        <tr className="bg-white">
                            <td className="px-6 py-4 font-medium text-green-700 flex items-center gap-2">
                                <CheckCircle size={14} /> EFICIENTE
                            </td>
                            <td className="px-6 py-4 font-semibold text-gray-700">100%</td>
                            <td className="px-6 py-4 text-gray-600">
                                O controle mitiga o risco conforme planejado no desenho.
                                <br/><span className="text-xs text-gray-400">(Ex: Se o desenho prevê 50% de mitigação, aplica-se 50%).</span>
                            </td>
                        </tr>
                        <tr className="bg-white">
                            <td className="px-6 py-4 font-medium text-yellow-600 flex items-center gap-2">
                                <AlertTriangle size={14} /> PARCIALMENTE EFICIENTE
                            </td>
                            <td className="px-6 py-4 font-semibold text-gray-700">50%</td>
                            <td className="px-6 py-4 text-gray-600">
                                Falhas pontuais detectadas. A força do controle é reduzida pela metade.
                                <br/><span className="text-xs text-gray-400">(Ex: Se o desenho prevê 50%, aplica-se apenas 25%).</span>
                            </td>
                        </tr>
                        <tr className="bg-white">
                            <td className="px-6 py-4 font-medium text-red-600 flex items-center gap-2">
                                <AlertTriangle size={14} /> INEFICIENTE
                            </td>
                            <td className="px-6 py-4 font-semibold text-gray-700">0%</td>
                            <td className="px-6 py-4 text-gray-600">
                                O controle não funciona. Sua capacidade de mitigação é zerada no cálculo do risco residual.
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
         </div>
      </div>

      {/* Section 4: Rules & Workflow */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
          <h3 className="font-bold text-gray-800 mb-6">4. Regras de Negócio e Ciclo de Vida</h3>
          
          <div className="space-y-6">
            <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-blue-100 text-brand-blue flex items-center justify-center font-bold shrink-0">A</div>
                <div>
                    <h4 className="font-bold text-gray-800 text-sm">Atualização em Tempo Real (Snapshot)</h4>
                    <p className="text-sm text-gray-600 mt-1">
                        O Mapa de Riscos reflete sempre a <strong>última avaliação</strong> disponível do controle. 
                        Embora o histórico de auditorias passadas seja armazenado no banco de dados para fins de compliance, 
                        o dashboard e os cálculos de risco residual consideram apenas o estado atual (Snapshot).
                        Ao alterar o status de um controle de "Ineficiente" para "Eficiente", o risco residual vinculado é recalculado imediatamente.
                    </p>
                </div>
            </div>

            <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-blue-100 text-brand-blue flex items-center justify-center font-bold shrink-0">B</div>
                <div>
                    <h4 className="font-bold text-gray-800 text-sm">Planos de Ação</h4>
                    <p className="text-sm text-gray-600 mt-1">
                        Sempre que um controle for avaliado como <strong>Ineficiente</strong> ou <strong>Parcialmente Eficiente</strong>, 
                        é mandatório a criação de um Plano de Ação. Planos concluídos não alteram automaticamente o status do controle; 
                        é necessário uma nova rodada de testes (Reteste) para validar a eficácia e atualizar o sistema.
                    </p>
                </div>
            </div>

            <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-blue-100 text-brand-blue flex items-center justify-center font-bold shrink-0">C</div>
                <div>
                    <h4 className="font-bold text-gray-800 text-sm">Mitigação Combinada</h4>
                    <p className="text-sm text-gray-600 mt-1">
                        Um risco pode ser mitigado por múltiplos controles. O sistema soma a mitigação efetiva de todos os controles vinculados.
                        O teto máximo de mitigação é 99% (o risco nunca é zero absoluto).
                    </p>
                </div>
            </div>
          </div>
      </div>

      {/* Section 5: Matrix Legend */}
      <div className="bg-gray-900 text-white rounded-xl shadow-lg p-8">
          <h3 className="font-bold mb-4">Legenda Visual da Matriz</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="flex flex-col items-center p-4 bg-gray-800 rounded-lg border border-gray-700">
                  <span className={`w-4 h-4 rounded-full ${RISK_LEVEL_COLORS['LOW'].replace('text-green-900', '')} mb-2`}></span>
                  <span className="font-bold text-sm">Baixo</span>
                  <span className="text-xs text-gray-400">Monitorar</span>
              </div>
              <div className="flex flex-col items-center p-4 bg-gray-800 rounded-lg border border-gray-700">
                  <span className={`w-4 h-4 rounded-full ${RISK_LEVEL_COLORS['MEDIUM'].replace('text-yellow-900', '')} mb-2`}></span>
                  <span className="font-bold text-sm">Médio</span>
                  <span className="text-xs text-gray-400">Gerenciar</span>
              </div>
              <div className="flex flex-col items-center p-4 bg-gray-800 rounded-lg border border-gray-700">
                  <span className={`w-4 h-4 rounded-full ${RISK_LEVEL_COLORS['HIGH'].replace('text-orange-900', '')} mb-2`}></span>
                  <span className="font-bold text-sm">Alto</span>
                  <span className="text-xs text-gray-400">Plano Obrigatório</span>
              </div>
              <div className="flex flex-col items-center p-4 bg-gray-800 rounded-lg border border-gray-700">
                  <span className={`w-4 h-4 rounded-full ${RISK_LEVEL_COLORS['CRITICAL'].replace('text-white', '')} mb-2`}></span>
                  <span className="font-bold text-sm">Crítico</span>
                  <span className="text-xs text-gray-400">Ação Imediata</span>
              </div>
          </div>
      </div>

      {/* Section 6: Methodology Reference */}
      <div className="bg-blue-50 border border-blue-100 rounded-xl p-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
              <h3 className="font-bold text-brand-blue flex items-center gap-2">
                  <BookOpen size={18} />
                  Referências e Padrões
              </h3>
              <p className="text-sm text-blue-800 mt-1">
                  Esta metodologia foi desenvolvida com base nas diretrizes do <strong>COSO ERM</strong> (Enterprise Risk Management) e <strong>ISO 31000</strong>.
              </p>
          </div>
          <a 
            href="https://www.coso.org/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="whitespace-nowrap flex items-center gap-2 px-5 py-2.5 bg-white text-brand-blue font-semibold rounded-lg shadow-sm hover:bg-blue-50 transition-colors text-sm border border-blue-200"
          >
              Ver Referência COSO <ExternalLink size={14} />
          </a>
      </div>

    </div>
  );

  return (
    <div className="max-w-4xl mx-auto space-y-6">
        
        {/* Tabs */}
        <div className="flex justify-center mb-6">
            <div className="bg-white p-1 rounded-lg border border-gray-200 inline-flex shadow-sm">
                <button 
                    onClick={() => setActiveTab('MANUAL')}
                    className={`px-6 py-2 rounded-md text-sm font-medium transition-all ${
                        activeTab === 'MANUAL' 
                        ? 'bg-brand-blue text-white shadow-sm' 
                        : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'
                    }`}
                >
                    Manual Metodológico
                </button>
                <button 
                    onClick={() => setActiveTab('ABOUT')}
                    className={`px-6 py-2 rounded-md text-sm font-medium transition-all ${
                        activeTab === 'ABOUT' 
                        ? 'bg-brand-blue text-white shadow-sm' 
                        : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'
                    }`}
                >
                    Institucional
                </button>
            </div>
        </div>

        {activeTab === 'MANUAL' ? renderManual() : renderAbout()}

        {/* Footer Branding */}
        <div className="text-center pt-8 pb-4 opacity-50">
            <p className="text-xs uppercase tracking-widest font-semibold text-gray-400">Grupo Casas Bahia © {new Date().getFullYear()}</p>
            <p className="text-[10px] text-gray-400 mt-1">Dedicação total ao cliente</p>
        </div>
    </div>
  );
};