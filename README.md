# AgriSync

AgriSync is a modern agricultural logistics platform designed to connect farmers, drivers, and buyers in a trusted, transparent, and efficient supply chain. The platform helps farmers move produce quickly, supports drivers with route-based jobs and earnings visibility, and gives buyers access to fresh, verified produce with delivery tracking and secure payments.

## Project Goal

The core mission of AgriSync is to simplify the movement of agricultural produce from farms to markets and homes by reducing delays, improving trust, and creating a digital coordination layer between key participants in the value chain.

## Current Product Direction

The application is being built as a landing-page-first experience, with a strong focus on:
- clear value communication for farmers, drivers, and buyers
- trustworthy logistics flows
- production visibility and tracking
- simple, premium user experience for mobile and desktop
- scalable architecture for future onboarding, marketplace, and order flows

## Technology Stack

The project currently uses the following core technologies:

- Next.js 16 with App Router
- TypeScript
- React
- Tailwind CSS
- Framer Motion
- Lucide React icons
- pnpm as the package manager

### Frontend Architecture

The app follows a component-driven structure using the App Router pattern from Next.js. Design and layout are built with reusable UI sections and shared components, with emphasis on:
- reusable card layouts
- shared button primitives
- modular landing-page sections
- a centralized design system using CSS variables and theme tokens

## Current Project Structure

- app/ — application pages and route-level layouts
- component/ — reusable UI and section components
- component/shared/header/ — header and navigation components
- component/ui/ — shared design-system primitives such as buttons
- constants/ — app configuration and navigation data
- hooks/ — shared custom hooks
- lib/ — utility logic and helper functions
- services/ — future API/service layer abstraction
- tests/ — app testing area for future UI and integration coverage

## Architecture Plan

The long-term architecture for AgriSync will likely evolve in the following direction:

### 1. Frontend
- Next.js App Router for page structure and routing
- Reusable UI blocks for landing pages, dashboards, and marketplace flows
- Strong separation between layout components, feature modules, and domain-specific logic

### 2. State and Data Layer
- React state management for local UI workflows
- API service layer for backend integration
- Centralized fetch logic and typed data contracts

### 3. Business Domain Modules
- Farmers: listings, route requests, earnings, verification
- Drivers: job discovery, trip tracking, route optimization, earnings
- Buyers: marketplace browsing, orders, payments, delivery tracking
- Admin/Operations: monitoring and activity visibility

### 4. Authentication and Access Control
- role-based access for farmer, driver, buyer, and admin users
- secure session handling and protected routes
- account verification and user identity flows

### 5. Logistics and Tracking
- delivery status updates
- pickup and dropoff event tracking
- route and trip workflow visibility
- supply chain traceability for produce movement

### 6. Payments and Trust
- escrow or protected payment handling
- transaction history and settlement data
- trust and rating systems between users

## Development Notes

This README will continue to evolve as the application grows. Future updates will document:
- completed feature modules
- deployment setup
- environment configuration
- API contracts
- testing strategy
- database and backend architecture decisions
- project milestones and roadmap

## Getting Started

To run the project locally:

```bash
pnpm install
pnpm dev
```

Then open http://localhost:3000 in your browser.

## Roadmap

Planned milestones include:
- landing page completion and polish
- reusable core component system
- authentication and user roles
- marketplace and order flows
- tracking and logistics features
- payments and settlement logic
- analytics and operations dashboards

## Notes

This project is currently in active product and UI development. The architecture and documentation will be expanded over time as features are implemented and system boundaries become clearer.
