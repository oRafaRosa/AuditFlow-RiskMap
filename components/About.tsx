import React from 'react';
import { Shield, Code, Users, Award, Heart } from 'lucide-react';

export const About: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      
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
          "Este aplicativo foi <span className="text-brand-blue font-bold">100% desenvolvido</span> pela equipe de <span className="text-gray-900">Auditoria Interna do Grupo Casas Bahia</span>."
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

      {/* Footer Branding */}
      <div className="text-center pt-8 pb-4 opacity-50">
        <p className="text-xs uppercase tracking-widest font-semibold text-gray-400">Grupo Casas Bahia © {new Date().getFullYear()}</p>
        <p className="text-[10px] text-gray-400 mt-1">Dedicação total ao cliente</p>
      </div>

    </div>
  );
};
