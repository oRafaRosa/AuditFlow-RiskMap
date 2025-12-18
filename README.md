# AuditFlow - RiskMap

Enterprise GRC Application module for Risk Management and Heatmaps.

## Features
- **5x5 Risk Matrix**: Dynamic filtering and drill-down.
- **Residual Risk Logic**: Automatic calculation based on Control mitigation %.
- **Dashboard**: Executive view with Recharts.
- **Responsive**: Mobile-first design using Tailwind CSS.
- **Mock Service**: Includes realistic seed data for immediate demo.

## Setup (Frontend)

1. **Install Dependencies**:
   ```bash
   npm install react react-dom lucide-react recharts clsx tailwind-merge
   # Dev dependencies
   npm install -D vite @vitejs/plugin-react tailwindcss postcss autoprefixer
   ```

2. **Run**:
   ```bash
   npm run dev
   ```

## Setup (Backend - Optional)
The frontend currently runs with a `mockDb` service to demonstrate functionality immediately without DB setup.
To switch to the real backend:

1. **Database**:
   Run a Postgres container:
   ```yaml
   # docker-compose.yml
   version: '3.8'
   services:
     db:
       image: postgres:15
       environment:
         POSTGRES_PASSWORD: password
         POSTGRES_DB: auditflow
       ports:
         - "5432:5432"
   ```

2. **Prisma**:
   ```bash
   npx prisma migrate dev --name init
   ```

3. **Run Server**:
   ```bash
   ts-node backend/server.ts
   ```

## Architecture
- **Frontend**: React, Tailwind, ShadCN-like aesthetics.
- **Logic**: Proportional mitigation strategy (Option C).
- **Colors**: Brand Blue (#0033C6) and Critical Red (#E71A3B).

**Enjoy AuditFlow!**
