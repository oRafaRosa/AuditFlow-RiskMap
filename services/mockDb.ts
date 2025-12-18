import { Area, Control, Risk, RiskControlLink, RiskLevel, RiskStatus, User, UserRole, Process, ControlType, ControlFrequency, ControlEffectiveness, ActionPlan, ActionPlanStatus, ActionPlanPriority } from "../types";
import { calculateRiskLevel } from "../constants";

// --- Seed Data ---

const MOCK_TENANT_ID = 'tenant-1';

const MOCK_USERS: User[] = [
  { id: 'u1', name: 'Admin User', email: 'admin@auditflow.com', role: UserRole.ADMIN, tenantId: MOCK_TENANT_ID },
  { id: 'u2', name: 'Executivo Chefe', email: 'ceo@auditflow.com', role: UserRole.EXECUTIVE_VIEW, tenantId: MOCK_TENANT_ID },
  { id: 'u3', name: 'Gestor de Riscos', email: 'grc@auditflow.com', role: UserRole.GRC_MANAGER, tenantId: MOCK_TENANT_ID },
  { id: 'u4', name: 'João da TI', email: 'joao.ti@auditflow.com', role: UserRole.CONTROL_OWNER, tenantId: MOCK_TENANT_ID },
  { id: 'u5', name: 'Maria do RH', email: 'maria.rh@auditflow.com', role: UserRole.CONTROL_OWNER, tenantId: MOCK_TENANT_ID },
];

const MOCK_AREAS: Area[] = [
  { id: 'a1', name: 'Financeiro' },
  { id: 'a2', name: 'Tecnologia da Informação' },
  { id: 'a3', name: 'Recursos Humanos' },
  { id: 'a4', name: 'Operações' },
  { id: 'a5', name: 'Jurídico' },
];

const MOCK_PROCESSES: Process[] = [
  { id: 'p1', code: 'FIN-01', name: 'Contas a Pagar', areaId: 'a1', description: 'Gestão de pagamentos a fornecedores.' },
  { id: 'p2', code: 'FIN-02', name: 'Tesouraria', areaId: 'a1', description: 'Gestão de fluxo de caixa e aplicações.' },
  { id: 'p3', code: 'IT-01', name: 'Gestão de Acessos', areaId: 'a2', description: 'Concessão e revogação de acessos lógicos.' },
  { id: 'p4', code: 'IT-02', name: 'Segurança da Informação', areaId: 'a2', description: 'Monitoramento de ameaças e vulnerabilidades.' },
  { id: 'p5', code: 'OPS-01', name: 'Produção', areaId: 'a4', description: 'Linha de montagem e manufatura.' },
  { id: 'p6', code: 'HR-01', name: 'Recrutamento e Seleção', areaId: 'a3', description: 'Contratação de novos colaboradores.' },
];

const MOCK_CONTROLS: Control[] = [
  { 
    id: 'c1', code: 'IT-GC-001', name: 'Revisão Trimestral de Acessos', 
    description: 'Gerente revisa acessos de todos os subordinados.', 
    type: ControlType.DETECTIVE, frequency: ControlFrequency.QUARTERLY, status: 'ACTIVE',
    processIds: ['p3'], effectiveness: ControlEffectiveness.EFFECTIVE,
    lastAssessmentDate: '2025-02-15'
  },
  { 
    id: 'c2', code: 'FIN-AP-002', name: 'Aprovação de Alçada Dupla', 
    description: 'Pagamentos acima de 5k exigem aprovação de Diretor.', 
    type: ControlType.PREVENTIVE, frequency: ControlFrequency.DAILY, status: 'ACTIVE',
    processIds: ['p1'], effectiveness: ControlEffectiveness.EFFECTIVE,
    lastAssessmentDate: '2025-02-10'
  },
  { 
    id: 'c3', code: 'HR-REC-003', name: 'Background Check Automatizado', 
    description: 'Sistema verifica antecedentes criminais via API.', 
    type: ControlType.PREVENTIVE, frequency: ControlFrequency.DAILY, status: 'ACTIVE',
    processIds: ['p6'], effectiveness: ControlEffectiveness.PARTIALLY_EFFECTIVE,
    lastAssessmentDate: '2025-01-20'
  },
  { 
    id: 'c4', code: 'OPS-MNT-004', name: 'Manutenção Preventiva Programada', 
    description: 'Parada programada mensal para revisão de óleo e filtros.', 
    type: ControlType.PREVENTIVE, frequency: ControlFrequency.MONTHLY, status: 'ACTIVE',
    processIds: ['p5'], effectiveness: ControlEffectiveness.INEFFECTIVE, // Audit failed this control
    lastAssessmentDate: '2025-02-28'
  },
  { 
    id: 'c5', code: 'LG-CMP-005', name: 'Treinamento LGPD Anual', 
    description: 'Obrigatório para todos os funcionários.', 
    type: ControlType.CORRECTIVE, frequency: ControlFrequency.ANNUAL, status: 'ACTIVE',
    processIds: ['p3', 'p4', 'p6'], effectiveness: ControlEffectiveness.EFFECTIVE,
    lastAssessmentDate: '2024-11-15'
  },
  {
    id: 'c6', code: 'LEG-CON-006', name: 'Revisão Contratual Jurídica',
    description: 'Todos contratos acima de 10k devem passar pelo jurídico.',
    type: ControlType.PREVENTIVE, frequency: ControlFrequency.DAILY, status: 'ACTIVE',
    processIds: ['p1'], effectiveness: ControlEffectiveness.EFFECTIVE,
    lastAssessmentDate: '2025-03-01'
  },
  {
    id: 'c7', code: 'IT-BKP-007', name: 'Backup Diário Imutável',
    description: 'Backup com retention lock para evitar ransomware.',
    type: ControlType.CORRECTIVE, frequency: ControlFrequency.DAILY, status: 'ACTIVE',
    processIds: ['p4'], effectiveness: ControlEffectiveness.EFFECTIVE,
    lastAssessmentDate: '2025-02-20'
  }
];

const MOCK_RISKS_SEED: Partial<Risk>[] = [
  { id: 'r1', code: 'R1', title: 'Fraude Externa em Pagamentos', areaId: 'a1', processIds: ['p1'], inherentProbability: 4, inherentImpact: 5, status: RiskStatus.ACTIVE },
  { id: 'r2', code: 'R2', title: 'Vazamento de Dados (Data Breach)', areaId: 'a2', processIds: ['p3', 'p4'], inherentProbability: 5, inherentImpact: 5, status: RiskStatus.ACTIVE },
  { id: 'r3', code: 'R3', title: 'Parada de Produção (Downtime)', areaId: 'a4', processIds: ['p5'], inherentProbability: 4, inherentImpact: 4, status: RiskStatus.ACTIVE },
  { id: 'r4', code: 'R4', title: 'Contratação de Funcionário Inadequado', areaId: 'a3', processIds: ['p6'], inherentProbability: 3, inherentImpact: 3, status: RiskStatus.ACTIVE },
  { id: 'r5', code: 'R5', title: 'Multas por não conformidade LGPD', areaId: 'a5', processIds: ['p4', 'p6'], inherentProbability: 3, inherentImpact: 5, status: RiskStatus.ACTIVE },
  { id: 'r6', code: 'R6', title: 'Acesso Não Autorizado a Sistemas', areaId: 'a2', processIds: ['p3'], inherentProbability: 4, inherentImpact: 4, status: RiskStatus.ACTIVE },
  { id: 'r7', code: 'R7', title: 'Erro de Lançamento Contábil', areaId: 'a1', processIds: ['p2'], inherentProbability: 2, inherentImpact: 4, status: RiskStatus.ACTIVE },
  // More Data
  { id: 'r8', code: 'R8', title: 'Processo Trabalhista', areaId: 'a5', processIds: ['p6'], inherentProbability: 3, inherentImpact: 4, status: RiskStatus.ACTIVE },
  { id: 'r9', code: 'R9', title: 'Perda de Backup', areaId: 'a2', processIds: ['p4'], inherentProbability: 2, inherentImpact: 5, status: RiskStatus.ACTIVE },
  { id: 'r10', code: 'R10', title: 'Falha na Cadeia de Suprimentos', areaId: 'a4', processIds: ['p5'], inherentProbability: 3, inherentImpact: 5, status: RiskStatus.ACTIVE },
  { id: 'r11', code: 'R11', title: 'Ataque de Phishing', areaId: 'a2', processIds: ['p4'], inherentProbability: 5, inherentImpact: 3, status: RiskStatus.ACTIVE },
  { id: 'r12', code: 'R12', title: 'Assédio Moral no Trabalho', areaId: 'a3', processIds: ['p6'], inherentProbability: 2, inherentImpact: 5, status: RiskStatus.ACTIVE },
];

const MOCK_LINKS: RiskControlLink[] = [
  { riskId: 'r1', controlId: 'c2', designMitigationPercent: 80 }, 
  { riskId: 'r2', controlId: 'c1', designMitigationPercent: 20 }, 
  { riskId: 'r2', controlId: 'c5', designMitigationPercent: 20 },
  { riskId: 'r2', controlId: 'c7', designMitigationPercent: 30 }, // Good mitigation for R2
  { riskId: 'r3', controlId: 'c4', designMitigationPercent: 60 }, // Will be impacted by INEFFECTIVE status
  { riskId: 'r4', controlId: 'c3', designMitigationPercent: 50 }, // PARTIAL
  { riskId: 'r5', controlId: 'c5', designMitigationPercent: 40 },
  { riskId: 'r5', controlId: 'c6', designMitigationPercent: 20 },
  { riskId: 'r6', controlId: 'c1', designMitigationPercent: 70 },
  
  // Links for new risks
  { riskId: 'r8', controlId: 'c5', designMitigationPercent: 30 }, // Weak mitigation
  { riskId: 'r9', controlId: 'c7', designMitigationPercent: 95 }, // Excellent mitigation
  { riskId: 'r11', controlId: 'c5', designMitigationPercent: 40 }, 
  { riskId: 'r11', controlId: 'c1', designMitigationPercent: 10 }, 
  { riskId: 'r12', controlId: 'c5', designMitigationPercent: 20 }, 
];

// Action Plans Seed
const MOCK_ACTION_PLANS: ActionPlan[] = [
  {
    id: 'ap1', code: 'AP-2025-001', title: 'Revisar Política de Manutenção', 
    description: 'Atualizar cronograma de manutenção para incluir máquinas novas e treinar equipe.',
    status: ActionPlanStatus.IN_PROGRESS, priority: ActionPlanPriority.HIGH,
    ownerId: 'u4', dueDate: '2025-03-15', createdAt: '2025-02-28',
    controlId: 'c4' // Linked to the ineffective control
  },
  {
    id: 'ap2', code: 'AP-2025-002', title: 'Integrar API de Antecedentes', 
    description: 'Automatizar consulta completa para eliminar checagem manual falha.',
    status: ActionPlanStatus.OPEN, priority: ActionPlanPriority.MEDIUM,
    ownerId: 'u5', dueDate: '2025-04-10', createdAt: '2025-01-25',
    controlId: 'c3' // Linked to partially effective control
  },
  {
    id: 'ap3', code: 'AP-2025-003', title: 'Plano de Continuidade (BCP)', 
    description: 'Formalizar BCP para cenário de Ransomware.',
    status: ActionPlanStatus.DELAYED, priority: ActionPlanPriority.CRITICAL,
    ownerId: 'u4', dueDate: '2025-02-01', createdAt: '2024-12-01',
    riskId: 'r2' // Linked directly to Risk
  }
];

// --- Logic Service ---

class MockBackend {
  private risks: Risk[] = [];
  private controls: Control[] = MOCK_CONTROLS;
  private links: RiskControlLink[] = MOCK_LINKS;
  private areas: Area[] = MOCK_AREAS;
  private processes: Process[] = MOCK_PROCESSES;
  private actionPlans: ActionPlan[] = MOCK_ACTION_PLANS;
  private users: User[] = MOCK_USERS;

  constructor() {
    this.initializeRisks();
  }

  private getEffectivenessMultiplier(eff: ControlEffectiveness): number {
    switch (eff) {
      case ControlEffectiveness.EFFECTIVE: return 1.0;
      case ControlEffectiveness.PARTIALLY_EFFECTIVE: return 0.5;
      case ControlEffectiveness.INEFFECTIVE: return 0.0;
      case ControlEffectiveness.NOT_TESTED: return 1.0;
      default: return 0;
    }
  }

  private initializeRisks() {
    this.risks = MOCK_RISKS_SEED.map(seed => {
      const riskLinks = this.links.filter(l => l.riskId === seed.id);
      
      let totalMitigationScore = 0;
      
      riskLinks.forEach(link => {
        const control = this.controls.find(c => c.id === link.controlId);
        if (control) {
          const multiplier = this.getEffectivenessMultiplier(control.effectiveness);
          const effectiveMitigation = link.designMitigationPercent * multiplier;
          totalMitigationScore += effectiveMitigation;
        }
      });

      const totalMitigation = Math.min(totalMitigationScore, 100);
      const iScore = (seed.inherentProbability || 1) * (seed.inherentImpact || 1);
      const rScoreRaw = iScore * (1 - (totalMitigation / 100));
      const rScore = Math.max(1, Math.round(rScoreRaw));

      const residualFactor = 1 - (totalMitigation / 100);
      let rProb = Math.max(1, Math.round(seed.inherentProbability! * Math.sqrt(residualFactor)));
      let rImpact = Math.max(1, Math.round(seed.inherentImpact! * Math.sqrt(residualFactor)));

      if (totalMitigation >= 99) {
        rProb = 1; rImpact = 1;
      }

      return {
        ...seed,
        description: `Risco associado ao processo ${this.processes.find(p => seed.processIds?.includes(p.id))?.name || 'Geral'}.`,
        category: 'Operacional', 
        ownerId: 'u3',
        controls: riskLinks.map(l => l.controlId),
        inherentScore: iScore,
        inherentLevel: calculateRiskLevel(iScore),
        residualScore: rScore,
        residualLevel: calculateRiskLevel(rScore),
        residualProbability: rProb,
        residualImpact: rImpact,
        totalMitigationPercent: totalMitigation,
        inherentProbability: seed.inherentProbability || 1,
        inherentImpact: seed.inherentImpact || 1,
      } as Risk;
    });
  }

  getRisks() { return this.risks; }
  getControls() { return this.controls; }
  getAreas() { return this.areas; }
  getProcesses() { return this.processes; }
  getActionPlans() { return this.actionPlans; }
  getUsers() { return this.users; }
  
  getRiskById(id: string) { return this.risks.find(r => r.id === id); }
  getControlById(id: string) { return this.controls.find(c => c.id === id); }
  getUserById(id: string) { return this.users.find(u => u.id === id); }
  
  getRiskControlsEnriched(riskId: string) {
    const links = this.links.filter(l => l.riskId === riskId);
    return links.map(l => {
      const c = this.controls.find(con => con.id === l.controlId);
      return { 
        ...c!, 
        designMitigation: l.designMitigationPercent,
        effectiveMitigation: l.designMitigationPercent * this.getEffectivenessMultiplier(c!.effectiveness)
      };
    });
  }

  getRisksByControlId(controlId: string) {
    const relatedRisks = this.risks.filter(r => r.controls.includes(controlId));
    return relatedRisks.map(r => {
      const link = this.links.find(l => l.riskId === r.id && l.controlId === controlId);
      const control = this.getControlById(controlId);
      const designMitigation = link?.designMitigationPercent || 0;
      const effectiveMitigation = designMitigation * this.getEffectivenessMultiplier(control?.effectiveness || ControlEffectiveness.NOT_TESTED);

      return {
        ...r,
        linkContext: {
          designMitigation,
          effectiveMitigation
        }
      };
    });
  }

  // Action Plans queries
  getActionPlansByControlId(controlId: string) {
    return this.actionPlans.filter(ap => ap.controlId === controlId);
  }
}

export const api = new MockBackend();