import { RiskLevel } from "./types";

export const RISK_LEVEL_COLORS = {
  [RiskLevel.LOW]: "bg-green-400 text-green-900",
  [RiskLevel.MEDIUM]: "bg-yellow-300 text-yellow-900",
  [RiskLevel.HIGH]: "bg-orange-400 text-orange-900",
  [RiskLevel.CRITICAL]: "bg-[#E71A3B] text-white",
};

export const RISK_MATRIX_SIZE = 5;

// Calculates Score and Level based on Prob * Impact
export const calculateRiskLevel = (score: number): RiskLevel => {
  if (score >= 17) return RiskLevel.CRITICAL;
  if (score >= 10) return RiskLevel.HIGH;
  if (score >= 5) return RiskLevel.MEDIUM;
  return RiskLevel.LOW;
};

export const formatCurrency = (val: number) => 
  new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val);
