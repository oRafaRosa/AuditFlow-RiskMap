import React, { useState } from 'react';
import { Layout } from './components/Layout';
import { Dashboard } from './components/Dashboard';
import { RiskMatrix } from './components/RiskMatrix';
import { RiskList } from './components/RiskList';
import { ProcessList } from './components/ProcessList';
import { ControlList } from './components/ControlList';
import { ActionPlanList } from './components/ActionPlanList';
import { RiskDetail } from './components/RiskDetail';
import { About } from './components/About';
import { AppsHub } from './components/AppsHub';
import { api } from './services/mockDb';
import { User, Risk } from './types';

// Mock Auth
const CURRENT_USER: User = { 
  id: 'u1', 
  name: 'MICHELLY BUSON', 
  email: 'michelly.buson@auditflow.com', 
  role: 'GRC_MANAGER' as any, 
  tenantId: 't1' 
};

export default function App() {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [matrixView, setMatrixView] = useState<'INHERENT' | 'RESIDUAL' | 'MOVEMENT'>('RESIDUAL');
  const [selectedRisk, setSelectedRisk] = useState<Risk | null>(null);

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard />;
      case 'matrix':
        return (
          <div className="space-y-4">
             <div className="flex justify-between items-center bg-white p-3 rounded-xl shadow-sm border border-gray-100">
               <h2 className="text-lg font-bold text-gray-800 px-2">Mapa de Calor (Heatmap)</h2>
               <div className="flex gap-2">
                 <button 
                   onClick={() => setMatrixView('INHERENT')}
                   className={`px-4 py-1.5 text-sm font-medium rounded-lg transition-all ${matrixView === 'INHERENT' ? 'bg-gray-800 text-white shadow-md' : 'text-gray-600 hover:bg-gray-100'}`}
                 >
                   Inerente
                 </button>
                 <button 
                   onClick={() => setMatrixView('RESIDUAL')}
                   className={`px-4 py-1.5 text-sm font-medium rounded-lg transition-all ${matrixView === 'RESIDUAL' ? 'bg-brand-blue text-white shadow-md' : 'text-gray-600 hover:bg-gray-100'}`}
                 >
                   Residual
                 </button>
                 <button 
                   onClick={() => setMatrixView('MOVEMENT')}
                   className={`px-4 py-1.5 text-sm font-medium rounded-lg transition-all ${matrixView === 'MOVEMENT' ? 'bg-purple-600 text-white shadow-md' : 'text-gray-600 hover:bg-gray-100'}`}
                 >
                   Movimentação
                 </button>
               </div>
             </div>
             <RiskMatrix 
                risks={api.getRisks()} 
                viewMode={matrixView} 
                onRiskClick={setSelectedRisk}
             />
          </div>
        );
      case 'processes':
        return <ProcessList />;
      case 'risks':
        return <RiskList onRiskClick={setSelectedRisk} />;
      case 'controls':
        return <ControlList />;
      case 'action-plans':
        return <ActionPlanList />;
      case 'apps':
        return <AppsHub />;
      case 'about':
        return <About />;
      default:
        return <div className="p-10 text-center text-gray-500">Página em Construção</div>;
    }
  };

  return (
    <Layout 
      user={CURRENT_USER} 
      onNavigate={setCurrentPage} 
      currentPage={currentPage}
    >
      {renderPage()}
      
      {/* Global Risk Detail Modal */}
      {selectedRisk && (
        <RiskDetail 
          risk={selectedRisk} 
          onClose={() => setSelectedRisk(null)} 
        />
      )}
    </Layout>
  );
}
