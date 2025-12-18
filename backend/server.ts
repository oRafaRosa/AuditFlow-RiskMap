import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const app = express();
app.use(cors());
app.use(express.json());

// Middleware: Tenant Isolation
app.use((req, res, next) => {
  const tenantId = req.headers['x-tenant-id'];
  if (!tenantId) return res.status(400).json({ error: 'Tenant ID required' });
  // In real app, verify JWT and extract tenantId from token
  (req as any).tenantId = tenantId;
  next();
});

// GET Risks
app.get('/api/risks', async (req, res) => {
  const tenantId = (req as any).tenantId;
  const risks = await prisma.risk.findMany({
    where: { tenantId: tenantId as string },
    include: { 
      controls: {
        include: { control: true }
      }
    }
  });
  
  // Backend Logic: Calculate Residual dynamically
  const enrichedRisks = risks.map(risk => {
    const totalMitigation = risk.controls.reduce((acc, c) => acc + c.mitigationPercent, 0);
    const cappedMitigation = Math.min(totalMitigation, 100);
    const iScore = risk.inherentProb * risk.inherentImp;
    const rScore = iScore * (1 - (cappedMitigation/100));
    
    return {
      ...risk,
      inherentScore: iScore,
      residualScore: Math.round(rScore * 10) / 10,
      mitigationTotal: cappedMitigation
    };
  });

  res.json(enrichedRisks);
});

// START
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`AuditFlow Backend running on port ${PORT}`);
});
