# AtomQuest Goal Portal

A modern enterprise **Goal Setting & Tracking Portal** built for a hackathon, focused on role-based goal lifecycle management, quarterly execution tracking, and governance visibility.

## Overview

AtomQuest Goal Portal is a frontend-first dashboard application that simulates how organizations define, review, track, and audit employee goals across business functions. The project is designed to demonstrate production-style UX, strong workflow validation, and scalable module architecture using mock data without backend dependencies.

## Hackathon Context

This project was built as a hackathon submission to showcase:
- Enterprise-grade dashboard design and UX polish
- Role-based workflows for Employees, Managers, and Admins
- Data-driven progress monitoring and compliance visibility
- Fast prototyping using modern React tooling with reusable components

## Features

- Dark professional enterprise UI
- Responsive sidebar + dashboard layout
- Premium KPI cards and analytics sections
- Reusable components for headers, cards, tables, and badges
- Polished data tables with loading skeleton support
- Role switcher (`Employee`, `Manager`, `Admin`)
- CSV export support in Admin dashboard
- Recharts-based visual analytics (bar + pie charts)

## Role-Based Workflows

### Employee Workflow

- Create goals with title, target, weightage, and status
- Submit goals for manager approval
- View manager comments
- Automatic edit lock when plan is approved

### Manager Workflow

- View submitted employee goals
- Inline edit target and weightage
- Add manager comments per goal
- Approve or reject goal submissions

### Admin Workflow

- Monitor KPI and completion analytics
- Review pending approvals snapshot
- View goal completion distribution charts
- Access shared goal management panel
- Review audit logs and export operational CSV

## Validation Rules

Employee goal creation enforces:
- Maximum `8` goals per cycle
- Minimum `10%` weightage per goal
- Total combined weightage must equal exactly `100%` before submission

Manager approval enforces:
- Each goal weightage >= `10%`
- Total weightage = `100%` before approval

## Tech Stack

- **Frontend:** React 19 + Vite
- **Styling:** Tailwind CSS v4
- **Routing:** React Router
- **Charts:** Recharts
- **Icons:** Lucide React
- **State:** Local React state (mock workflow/state simulation)

## Architecture Summary

The app follows a modular component-first architecture:

- `src/components`: Reusable UI primitives (`DataTable`, `KpiCard`, `PageHeader`, `StatusBadge`)
- `src/layout`: Shell layout (`Sidebar`, `Topbar`)
- `src/pages`: Feature modules (Dashboard, Goals, Check-ins, Reports, Audit Logs)
- `src/data`: Mock domain datasets and role metadata
- `src/App.jsx`: Route composition + shared workflow state wiring

Design and business logic are intentionally separated so backend integration can be added later with minimal UI refactor.

## Local Setup

### Prerequisites

- Node.js 18+
- npm 9+

### Run Locally

```bash
npm install
npm run dev
```

Open the local URL shown in terminal (typically `http://localhost:5173`).

### Production Build

```bash
npm run build
npm run preview
```

## Live Demo

- **Demo URL:** `https://atomquest-goal-portal-sepia.vercel.app/`

## Repository

- **GitHub:** https://github.com/venox-2007/atomquest-goal-portal

## Future Enhancements

- Backend APIs and persistent storage
- Authentication + organization-aware access control
- Real-time notifications and workflow events
- Historical analytics with downloadable reports
- CI/CD and environment-based deployment pipelines
