import React, { useState } from 'react';
import { Risk, RiskLevel } from '../types';
import { RISK_LEVEL_COLORS, RISK_MATRIX_SIZE, calculateRiskLevel } from '../constants';
import { X, ArrowRight, Info, ExternalLink } from 'lucide-react';

interface RiskMatrixProps {
  risks: Risk[];
  viewMode: 'INHERENT' | 'RESIDUAL' | 'MOVEMENT';
  onRiskClick: (risk: Risk) => void;
}

export const RiskMatrix: React.FC<RiskMatrixProps> = ({ risks, viewMode, onRiskClick }) => {
  const [selectedCell, setSelectedCell] = useState<{p: number, i: number} | null>(null);
  const [hoveredRiskId, setHoveredRiskId] = useState<string | null>(null);
  const [hoverPos, setHoverPos] = useState<{x: number, y: number} | null>(null);

  const getCellData = (p: number, i: number) => {
    return risks.filter(r => {
      if (viewMode === 'INHERENT') {
        return Math.round(r.inherentProbability) === p && Math.round(r.inherentImpact) === i;
      } else if (viewMode === 'RESIDUAL') {
        return Math.round(r.residualProbability) === p && Math.round(r.residualImpact) === i;
      }
      // In Movement mode, clicking a cell shows residual risks in that cell
      return Math.round(r.residualProbability) === p && Math.round(r.residualImpact) === i;
    });
  };

  const renderCell = (p: number, i: number) => {
    const cellRisks = getCellData(p, i);
    const score = p * i;
    const level = calculateRiskLevel(score);
    const bgClass = RISK_LEVEL_COLORS[level];
    
    const isSelected = selectedCell?.p === p && selectedCell?.i === i;
    
    // In movement mode, we dim the background cells significantly to focus on vectors
    const opacityClass = viewMode === 'MOVEMENT' ? 'opacity-10' : 'hover:brightness-95 hover:scale-[1.02]';

    return (
      <div
        key={`${p}-${i}`}
        onClick={() => setSelectedCell({ p, i })}
        className={`
          relative border border-white/50 cursor-pointer transition-all duration-200
          ${bgClass} ${opacityClass}
          ${isSelected ? 'ring-4 ring-brand-blue z-10 scale-105 shadow-xl opacity-100' : ''}
          h-24 w-full flex flex-col items-center justify-center rounded-sm
        `}
      >
        {viewMode !== 'MOVEMENT' && (
          <>
            <span className="font-bold text-lg">{cellRisks.length}</span>
            {cellRisks.length > 0 && <span className="text-xs opacity-80">Riscos</span>}
          </>
        )}
      </div>
    );
  };

  // Generate 5 rows (5 to 1) and 5 cols (1 to 5)
  const rows = [];
  for (let p = RISK_MATRIX_SIZE; p >= 1; p--) {
    const cols = [];
    for (let i = 1; i <= RISK_MATRIX_SIZE; i++) {
      cols.push(renderCell(p, i));
    }
    rows.push(
      <div key={p} className="contents">
        <div className="flex items-center justify-center font-bold text-gray-500 w-8">{p}</div>
        {cols}
      </div>
    );
  }

  // Helper to convert Matrix Coordinates (1-5) to SVG Percentages (0-100%)
  const getCoord = (val: number, isY: boolean) => {
    const center = (val - 0.5) * 20;
    if (isY) return (RISK_MATRIX_SIZE - val + 0.5) * 20; 
    return center;
  };

  const getColorHex = (level: RiskLevel) => {
      switch(level) {
          case RiskLevel.LOW: return '#4ade80';
          case RiskLevel.MEDIUM: return '#fde047';
          case RiskLevel.HIGH: return '#fb923c';
          case RiskLevel.CRITICAL: return '#E71A3B';
      }
  };

  return (
    <div className="flex flex-col md:flex-row gap-6 h-full">
      {/* Matrix Container */}
      <div className="flex-1 bg-white p-6 rounded-xl shadow-sm border border-gray-100 relative group/matrix">
        
        <div className="flex justify-between items-start mb-4">
            <h3 className="text-lg font-bold text-brand-blue flex justify-between items-center">
            Matriz de Riscos ({viewMode === 'MOVEMENT' ? 'Movimentação' : viewMode === 'INHERENT' ? 'Inerente' : 'Residual'})
            </h3>

            {/* Legend for Movement */}
            {viewMode === 'MOVEMENT' && (
                <div className="flex flex-wrap items-center gap-4 text-xs bg-gray-50 border border-gray-200 px-3 py-1.5 rounded-lg shadow-sm">
                    <div className="flex items-center gap-1.5">
                        <div className="w-3 h-3 rounded-full bg-gray-300 border border-gray-400"></div>
                        <span className="text-gray-600 font-medium">Inerente</span>
                    </div>
                    <ArrowRight size={12} className="text-gray-400" />
                    <div className="flex items-center gap-1.5">
                        <div className="w-3 h-3 rounded-full bg-brand-blue border border-white shadow-sm"></div>
                        <span className="text-gray-600 font-medium">Residual</span>
                    </div>
                    <div className="h-4 w-px bg-gray-300 mx-1"></div>
                    <div className="flex items-center gap-1 text-gray-500">
                        <Info size={12} />
                        <span>Passe o mouse para ver detalhes</span>
                    </div>
                </div>
            )}
        </div>
        
        <div className="relative">
          {/* Y Axis Label */}
          <div className="absolute -left-8 top-1/2 -translate-y-1/2 -rotate-90 text-sm font-semibold text-gray-400">
            PROBABILIDADE
          </div>
          
          <div className="grid grid-cols-[auto_repeat(5,1fr)] gap-1 relative z-0">
            {rows}
            {/* X Axis Labels */}
            <div className="col-span-1"></div> {/* Spacer for Y axis numbers */}
            {[1, 2, 3, 4, 5].map(i => (
              <div key={`x-${i}`} className="flex justify-center font-bold text-gray-500 h-8 items-center">
                {i}
              </div>
            ))}
          </div>
          
          {/* Movement Overlay Layer */}
          {viewMode === 'MOVEMENT' && (
            <div className="absolute inset-0 z-10 ml-8 mb-8 mt-10">
                <svg className="w-full h-full" style={{overflow: 'visible'}}>
                    <defs>
                        <marker id="arrowhead" markerWidth="6" markerHeight="4" refX="5" refY="2" orient="auto">
                            <polygon points="0 0, 6 2, 0 4" fill="#64748b" />
                        </marker>
                    </defs>
                    {risks.map(r => {
                        const startX = getCoord(r.inherentImpact, false);
                        const startY = getCoord(r.inherentProbability, true);
                        const endX = getCoord(r.residualImpact, false);
                        const endY = getCoord(r.residualProbability, true);
                        
                        const hasMovement = startX !== endX || startY !== endY;
                        
                        // Interaction Logic
                        const isHovered = hoveredRiskId === r.id;
                        const isDimmed = hoveredRiskId !== null && !isHovered;
                        
                        // Z-Index simulation via ordering: Hovered comes last (on top)
                        if (isDimmed) return null; // We render dimmed ones in a separate pass below if needed, or just let them stay early in DOM
                        
                        return (
                            <g 
                                key={r.id} 
                                className="transition-all duration-300 cursor-pointer"
                                style={{ opacity: isDimmed ? 0.1 : 1, filter: isHovered ? 'drop-shadow(0px 2px 4px rgba(0,0,0,0.2))' : 'none' }}
                                onMouseEnter={(e) => {
                                    setHoveredRiskId(r.id);
                                    setHoverPos({ x: e.clientX, y: e.clientY });
                                }}
                                onMouseLeave={() => {
                                    setHoveredRiskId(null);
                                    setHoverPos(null);
                                }}
                            >
                                {hasMovement && (
                                    <>
                                        {/* Path Line */}
                                        <line 
                                            x1={`${startX}%`} y1={`${startY}%`} 
                                            x2={`${endX}%`} y2={`${endY}%`} 
                                            stroke="#64748b" strokeWidth={isHovered ? "3" : "1.5"}
                                            strokeDasharray="4"
                                            markerEnd="url(#arrowhead)"
                                        />
                                        {/* Start Dot (Ghost) */}
                                        <circle cx={`${startX}%`} cy={`${startY}%`} r="5" fill="#e2e8f0" stroke="#94a3b8" strokeWidth="1" />
                                    </>
                                )}
                                
                                {/* End Dot (Solid) */}
                                <circle 
                                    cx={`${endX}%`} cy={`${endY}%`} r={isHovered ? 16 : 12} 
                                    fill={getColorHex(r.residualLevel)} 
                                    stroke="white" strokeWidth="2"
                                />
                                <text 
                                    x={`${endX}%`} y={`${endY}%`} 
                                    dy="4" textAnchor="middle" 
                                    className={`text-[10px] font-bold fill-gray-800 pointer-events-none ${isHovered ? 'text-xs' : ''}`}
                                >
                                    {r.code}
                                </text>
                            </g>
                        );
                    })}
                    {/* Render dimmed items behind */}
                    {hoveredRiskId && risks.filter(r => r.id !== hoveredRiskId).map(r => {
                         const startX = getCoord(r.inherentImpact, false);
                         const startY = getCoord(r.inherentProbability, true);
                         const endX = getCoord(r.residualImpact, false);
                         const endY = getCoord(r.residualProbability, true);
                         const hasMovement = startX !== endX || startY !== endY;
                         return (
                            <g key={`dim-${r.id}`} style={{ opacity: 0.1 }}>
                                {hasMovement && (
                                     <line x1={`${startX}%`} y1={`${startY}%`} x2={`${endX}%`} y2={`${endY}%`} stroke="#64748b" strokeWidth="1" strokeDasharray="4"/>
                                )}
                                <circle cx={`${endX}%`} cy={`${endY}%`} r="12" fill={getColorHex(r.residualLevel)} stroke="white" strokeWidth="2"/>
                            </g>
                         );
                    })}
                </svg>
            </div>
          )}

           {/* Floating Tooltip */}
           {viewMode === 'MOVEMENT' && hoveredRiskId && hoverPos && (
               <div 
                 className="fixed z-50 bg-gray-900 text-white p-3 rounded-lg shadow-xl pointer-events-none text-xs w-64 animate-in fade-in zoom-in-95 duration-200"
                 style={{ left: hoverPos.x + 15, top: hoverPos.y - 10 }}
               >
                   {(() => {
                       const r = risks.find(x => x.id === hoveredRiskId)!;
                       const reduction = Math.round(r.totalMitigationPercent);
                       return (
                           <div className="space-y-1.5">
                               <div className="flex justify-between items-center border-b border-gray-700 pb-1 mb-1">
                                   <span className="font-bold text-brand-blue-light">{r.code}</span>
                                   <span className="text-gray-400 truncate max-w-[150px]">{r.title}</span>
                               </div>
                               <div className="grid grid-cols-2 gap-2 text-center">
                                   <div className="bg-gray-800 rounded p-1">
                                       <span className="block text-gray-500 text-[10px]">Inerente</span>
                                       <span className="font-mono font-bold">{r.inherentProbability} x {r.inherentImpact}</span>
                                       <span className="block text-[10px] text-gray-400">Score: {r.inherentScore}</span>
                                   </div>
                                   <div className="bg-gray-800 rounded p-1">
                                       <span className="block text-brand-blue text-[10px]">Residual</span>
                                       <span className="font-mono font-bold text-white">{r.residualProbability} x {r.residualImpact}</span>
                                       <span className="block text-[10px] text-gray-400">Score: {r.residualScore}</span>
                                   </div>
                               </div>
                               <div className="mt-1 pt-1 border-t border-gray-700 flex items-center justify-between">
                                   <span className="text-gray-400">Mitigação</span>
                                   <span className="font-bold text-green-400">{reduction}%</span>
                               </div>
                           </div>
                       )
                   })()}
               </div>
           )}
          
          {/* X Axis Label */}
          <div className="text-center mt-2 text-sm font-semibold text-gray-400">
            IMPACTO
          </div>
        </div>
      </div>

      {/* Side Panel / Drawer */}
      {selectedCell && (
        <div className="w-full md:w-96 bg-white border-l border-gray-200 shadow-xl fixed right-0 top-0 bottom-0 z-50 p-6 overflow-y-auto animate-in slide-in-from-right duration-300">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h4 className="font-bold text-xl text-brand-blue">Quadrante {selectedCell.p}x{selectedCell.i}</h4>
              <p className="text-sm text-gray-500">
                Prob: {selectedCell.p} • Imp: {selectedCell.i}
              </p>
            </div>
            <button onClick={() => setSelectedCell(null)} className="p-2 hover:bg-gray-100 rounded-full">
              <X size={20} className="text-gray-500" />
            </button>
          </div>

          <div className="space-y-4">
            {getCellData(selectedCell.p, selectedCell.i).length === 0 ? (
              <div className="text-center py-10 text-gray-400">
                Nenhum risco neste quadrante (Visão {viewMode === 'MOVEMENT' ? 'Residual' : viewMode === 'INHERENT' ? 'Inerente' : 'Residual'}).
              </div>
            ) : (
              getCellData(selectedCell.p, selectedCell.i).map(risk => (
                <div 
                  key={risk.id} 
                  onClick={() => onRiskClick(risk)}
                  className="p-4 border border-gray-100 rounded-lg hover:shadow-md hover:border-brand-blue/30 transition-all bg-brand-bg/30 cursor-pointer group"
                >
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-xs font-mono bg-blue-100 text-brand-blue px-2 py-0.5 rounded group-hover:bg-brand-blue group-hover:text-white transition-colors">
                      {risk.code}
                    </span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${RISK_LEVEL_COLORS[viewMode === 'INHERENT' ? risk.inherentLevel : risk.residualLevel]}`}>
                      {viewMode === 'INHERENT' ? risk.inherentLevel : risk.residualLevel}
                    </span>
                  </div>
                  <h5 className="font-semibold text-gray-800 leading-tight mb-2 group-hover:text-brand-blue">{risk.title}</h5>
                  <div className="text-xs text-gray-500 grid grid-cols-2 gap-2">
                    <div>
                      <span className="block text-gray-400">Inerente</span>
                      <span className="font-medium">{risk.inherentScore}</span>
                    </div>
                    <div>
                      <span className="block text-gray-400">Residual</span>
                      <span className="font-medium">{risk.residualScore}</span>
                    </div>
                  </div>
                  <div className="mt-3 text-right">
                    <span className="text-xs text-brand-blue font-medium flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        Ver Detalhes <ExternalLink size={10} />
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};
