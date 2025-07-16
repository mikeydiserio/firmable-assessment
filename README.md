# Firmable Assessment

A modern monorepo workspace using Nx, Next.js, and TypeScript.

## Overview

This repository contains a monorepo setup with Nx, focusing on building scalable web applications with Next.js. It includes robust testing, CI/CD integration, and cloud-based build distribution. App can be easily scaled up if need be.

## Processing the data and uploading it to Supabase has caused me to blow past the Free tier limit for accessing the DB and so there might be an issue when querying the DB until I delete some of the data from the tables.

## Project Structure

## Technologies

- **Framework**: Next.js
- **Language**: TypeScript
- **Monorepo Tool**: Nx
- **Package Manager**: pnpm
- **Backend Integration**: Supabase
- **Testing**: Jest, Testing Library, Playwright
- **CI/CD**: GitHub Actions, Nx Cloud
- **Styling**: [Choose between CSS Modules with Sass or Styled Components]

## Prerequisites

- Node.js >= 20
- pnpm
- Nx CLI

## Getting Started

1. Clone the repository

```bash
   git clone https://github.com/your-username/firmable-assessment.git
   cd firmable-assessment
```

2. Install dependencies
```
pnpm monorepo:install
```

3.Start development server
```pnpm dev```

Other bits:

The supabase-python package was made to handle the processing and uploading of the raw data set into Supabase.

The output of processing leaves the following the 5 tables.

business_names: Business names associated with ABNs
dgr_funds: Deductible Gift Recipient funds information
entities: Main entity data with ABN as primary key
entity_types: Entity type lookup table
locations: Location data with state and postcode

Dependency Graph: Visualize project dependencies

CI/CD Pipeline
This project uses GitHub Actions for CI/CD and Nx Cloud for distributed task execution. The pipeline automatically runs linting, testing, and building on affected projects.

Supabase Integration
The project includes Supabase integration for backend services with server-side rendering support.


SPECIAL PLACE IN HELL..

Bundle Analysis
To analyze bundle size:

License
