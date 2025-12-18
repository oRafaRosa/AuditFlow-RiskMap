import React, { useState } from 'react';
import { api } from '../services/mockDb';
import { PieChart, Pie, Cell, Tooltip, BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Legend } from 'recharts';
import { RiskLevel, ActionPlanStatus, Risk, Control, ActionPlan } from '../types';
import { AlertCircle, CheckCircle, ShieldAlert, Activity, ClipboardList, MousePointerClick } from 'lucide-react';
import { DrillDownModal, DrillDownType } from './DrillDownModal';
import { RiskDetail } from './RiskDetail';
import { ControlDetail } from './ControlDetail';

export const Dashboard: React.FC = () => {
  const risks = api.getRisks();
  const controls = api.getControls();
  const plans = api.getActionPlans();
  const areas = api.getAreas();

  // State for DrillDown
  const [modalOpen, setModalOpen] = useState(false);
  const [modalConfig, setModalConfig] = useState<{
    title: string;
    type: DrillDownType;
    items: (Risk | Control | ActionPlan)[];
  } | null>(null);

  // State for Details from DrillDown
  const [selectedDrillRisk, setSelectedDrillRisk] = useState<Risk | null>(null);
  const [selectedDrillControl, setSelectedDrillControl] = useState<Control | null>(null);

  const openModal = (title: string, type: DrillDownType, items: any[]) => {
    setModalConfig({ title, type, items });
    setModalOpen(true);
  };
  
  // Stats
  const totalRisks = risks.length;
  const criticalRisks = risks.filter(r => r.residualLevel === RiskLevel.CRITICAL);
  const activeControls = controls.filter(c => c.status === 'ACTIVE');
  const openPlans = plans.filter(p => p.status === ActionPlanStatus.OPEN || p.status === ActionPlanStatus.IN_PROGRESS);
  const delayedPlans = plans.filter(p => p.status === ActionPlanStatus.DELAYED);

  // Chart Data: Risk by Level
  const levelData = [
    { name: 'Baixo', key: RiskLevel.LOW, value: risks.filter(r => r.residualLevel === RiskLevel.LOW).length, color: '#4ade80' },
    { name: 'Médio', key: RiskLevel.MEDIUM, value: risks.filter(r => r.residualLevel === RiskLevel.MEDIUM).length, color: '#fde047' },
    { name: 'Alto', key: RiskLevel.HIGH, value: risks.filter(r => r.residualLevel === RiskLevel.HIGH).length, color: '#fb923c' },
    { name: 'Crítico', key: RiskLevel.CRITICAL, value: risks.filter(r => r.residualLevel === RiskLevel.CRITICAL).length, color: '#E71A3B' },
  ].filter(d => d.value > 0);

  // Chart Data: Risks by Area
  // Logic: Map area name to risk count, but we need to keep track of Area ID to filter later
  const areaDataMap: Record<string, { count: number, areaId: string }> = {};
  risks.forEach(r => {
    const area = areas.find(a => a.id === r.areaId);
    const areaName = area?.name || 'Outros';
    const areaId = area?.id || 'unknown';
    
    if (!areaDataMap[areaName]) {
        areaDataMap[areaName] = { count: 0, areaId };
    }
    areaDataMap[areaName].count += 1;
  });

  const areaData = Object.keys(areaDataMap).map(k => ({ 
      name: k, 
      risks: areaDataMap[k].count,
      areaId: areaDataMap[k].areaId 
  }));

  // Handlers
  const handlePieClick = (data: any) => {
    if (!data) return;
    const level = data.key as RiskLevel;
    const filteredRisks = risks.filter(r => r.residualLevel === level);
    openModal(`Riscos - Nível ${data.name}`, 'RISK', filteredRisks);
  };

  const handleBarClick = (data: any) => {
      if (!data) return;
      const filteredRisks = risks.filter(r => r.areaId === data.areaId);
      openModal(`Riscos - Área: ${data.name}`, 'RISK', filteredRisks);
  };

  const handleDrillItemClick = (item: any) => {
    if (modalConfig?.type === 'RISK') {
      setSelectedDrillRisk(item as Risk);
    } else if (modalConfig?.type === 'CONTROL') {
      setSelectedDrillControl(item as Control);
    }
    // Action Plan Detail not implemented yet, could be added here
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-10">
      <h2 className="text-2xl font-bold text-gray-800">Dashboard Executivo</h2>
      
      {/* Cards - Clickable */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        
        <div 
            onClick={() => openModal('Total de Riscos', 'RISK', risks)}
            className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center space-x-4 cursor-pointer hover:shadow-md hover:border-blue-200 transition-all group"
        >
          <div className="p-3 bg-blue-50 rounded-full text-brand-blue group-hover:bg-brand-blue group-hover:text-white transition-colors">
            <Activity size={24} />
          </div>
          <div>
            <p className="text-sm text-gray-500">Total de Riscos</p>
            <p className="text-2xl font-bold">{totalRisks}</p>
          </div>
        </div>

        <div 
            onClick={() => openModal('Riscos Críticos', 'RISK', criticalRisks)}
            className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center space-x-4 cursor-pointer hover:shadow-md hover:border-red-200 transition-all group"
        >
          <div className="p-3 bg-red-50 rounded-full text-brand-red group-hover:bg-brand-red group-hover:text-white transition-colors">
            <AlertCircle size={24} />
          </div>
          <div>
            <p className="text-sm text-gray-500">Riscos Críticos</p>
            <p className="text-2xl font-bold">{criticalRisks.length}</p>
          </div>
        </div>

        <div 
            onClick={() => openModal('Controles Ativos', 'CONTROL', activeControls)}
            className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center space-x-4 cursor-pointer hover:shadow-md hover:border-green-200 transition-all group"
        >
          <div className="p-3 bg-green-50 rounded-full text-green-600 group-hover:bg-green-600 group-hover:text-white transition-colors">
            <ShieldAlert size={24} />
          </div>
          <div>
            <p className="text-sm text-gray-500">Controles Ativos</p>
            <p className="text-2xl font-bold">{activeControls.length}</p>
          </div>
        </div>

        <div 
            onClick={() => openModal('Planos de Ação Pendentes', 'PLAN', openPlans)}
            className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center space-x-4 cursor-pointer hover:shadow-md hover:border-orange-200 transition-all group"
        >
          <div className="p-3 bg-orange-50 rounded-full text-orange-600 group-hover:bg-orange-600 group-hover:text-white transition-colors">
            <ClipboardList size={24} />
          </div>
          <div>
            <p className="text-sm text-gray-500">Planos de Ação</p>
            <div className="flex items-baseline gap-2">
                <p className="text-2xl font-bold">{openPlans.length}</p>
                {delayedPlans.length > 0 && <span className="text-xs text-red-600 font-bold">({delayedPlans.length} vencidos)</span>}
            </div>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pie Chart */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 min-h-[350px] relative group flex flex-col">
          <div className="flex justify-between items-start mb-4">
             <h3 className="font-semibold text-gray-700">Riscos por Nível (Residual)</h3>
             <MousePointerClick size={16} className="text-gray-300 group-hover:text-brand-blue transition-colors animate-pulse" />
          </div>
          <div className="flex-1">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={levelData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                  onClick={handlePieClick}
                  className="cursor-pointer outline-none"
                >
                  {levelData.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={entry.color} 
                      className="hover:opacity-80 transition-opacity outline-none"
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend verticalAlign="bottom" height={36}/>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Bar Chart */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 min-h-[350px] relative group flex flex-col">
          <div className="flex justify-between items-start mb-4">
             <h3 className="font-semibold text-gray-700">Riscos por Área</h3>
             <MousePointerClick size={16} className="text-gray-300 group-hover:text-brand-blue transition-colors animate-pulse" />
          </div>
          <div className="flex-1">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={areaData} margin={{ top: 10, right: 30, left: 0, bottom: 20 }}>
                <XAxis 
                    dataKey="name" 
                    fontSize={11} 
                    tickLine={false} 
                    axisLine={false} 
                    interval={0} // Force show all labels
                    height={60} // Reserve more space for labels
                    tick={{ dy: 10, width: 100 }} // Push labels down slightly
                />
                <YAxis fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip cursor={{fill: '#f4f4f5'}} />
                <Bar 
                  dataKey="risks" 
                  fill="#0033C6" 
                  radius={[4, 4, 0, 0]} 
                  onClick={handleBarClick}
                  className="cursor-pointer hover:opacity-80 transition-opacity"
                  barSize={50}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Drill Down Modal */}
      {modalOpen && modalConfig && (
        <DrillDownModal 
            title={modalConfig.title}
            type={modalConfig.type}
            items={modalConfig.items}
            onClose={() => setModalOpen(false)}
            onItemClick={handleDrillItemClick}
        />
      )}

      {/* Details Modals (Over DrillDown) */}
      {selectedDrillRisk && (
        <RiskDetail 
          risk={selectedDrillRisk}
          onClose={() => setSelectedDrillRisk(null)}
        />
      )}

      {selectedDrillControl && (
        <ControlDetail
          control={selectedDrillControl}
          onClose={() => setSelectedDrillControl(null)}
        />
      )}
    </div>
  );
};