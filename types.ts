
export enum UserRole {
  ADMIN = 'ADMIN',
  GRC_MANAGER = 'GRC_MANAGER',
  AUDITOR = 'AUDITOR',
  RISK_OWNER = 'RISK_OWNER',
  CONTROL_OWNER = 'CONTROL_OWNER',
  EXECUTIVE_VIEW = 'EXECUTIVE_VIEW',
}

export enum RiskLevel {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
  CRITICAL = 'CRITICAL',
}

export enum RiskStatus {
  DRAFT = 'DRAFT',
  ACTIVE = 'ACTIVE',
  MITIGATED = 'MITIGATED',
  RETIRED = 'RETIRED',
}

export enum ControlType {
  PREVENTIVE = 'PREVENTIVO',
  DETECTIVE = 'DETECTIVO',
  CORRECTIVE = 'CORRETIVO',
}

export enum ControlFrequency {
  DAILY = 'DIÁRIO',
  WEEKLY = 'SEMANAL',
  MONTHLY = 'MENSAL',
  QUARTERLY = 'TRIMESTRAL',
  ANNUAL = 'ANUAL',
}

export enum ControlEffectiveness {
  EFFECTIVE = 'EFICIENTE', // 100% of design mitigation applied
  PARTIALLY_EFFECTIVE = 'PARCIALMENTE_EFICIENTE', // 50% applied
  INEFFECTIVE = 'INEFICIENTE', // 0% applied
  NOT_TESTED = 'NÃO_TESTADO', // Assumes 100% (benefit of doubt) or 0% depending on policy. We'll use 100% for design.
}

export enum ActionPlanStatus {
  OPEN = 'ABERTO',
  IN_PROGRESS = 'EM_ANDAMENTO',
  DELAYED = 'VENCIDO',
  DONE = 'CONCLUÍDO',
  VALIDATED = 'VALIDADO' // Validated by auditor
}

export enum ActionPlanPriority {
  LOW = 'BAIXA',
  MEDIUM = 'MÉDIA',
  HIGH = 'ALTA',
  CRITICAL = 'CRÍTICA'
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  tenantId: string;
}

export interface Area {
  id: string;
  name: string;
}

export interface Process {
  id: string;
  code: string;
  name: string;
  areaId: string;
  description: string;
}

export interface Control {
  id: string;
  code: string;
  name: string;
  description: string;
  type: ControlType;
  frequency: ControlFrequency;
  status: 'ACTIVE' | 'DRAFT' | 'DEPRECATED';
  processIds: string[]; // Linked Processes
  
  // Audit/Assessment Result
  lastAssessmentDate?: string;
  effectiveness: ControlEffectiveness;
}

export interface RiskControlLink {
  controlId: string;
  riskId: string;
  designMitigationPercent: number; // How much it mitigates if working perfectly (0-100)
}

export interface Risk {
  id: string;
  code: string;
  title: string;
  description: string;
  category: string;
  status: RiskStatus;
  
  // Relationships
  processIds: string[]; // A risk can affect multiple processes
  areaId: string; // Owner area
  ownerId: string;
  controls: string[]; // Control IDs via Link table
  
  // Assessment (Inherent)
  inherentProbability: number; // 1-5
  inherentImpact: number; // 1-5
  inherentScore: number;
  inherentLevel: RiskLevel;

  // Residual (Calculated)
  residualProbability: number;
  residualImpact: number;
  residualScore: number;
  residualLevel: RiskLevel;
  
  // Calculation Metadata
  totalMitigationPercent: number;
}

export interface ActionPlan {
  id: string;
  code: string;
  title: string;
  description: string;
  status: ActionPlanStatus;
  priority: ActionPlanPriority;
  ownerId: string;
  dueDate: string;
  createdAt: string;
  
  // Links (Polymorphic usually, but simplified here)
  controlId?: string; // Linked to a failing control
  riskId?: string;    // Linked to a high risk
}