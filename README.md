# Forma AI

AI-augmented dynamic forms for complex, branching workflows. Users can describe a situation in natural language, review AI-assisted field values, and complete only the questions relevant to them.

## Day 1 deliverable

- MERN workspace structure with separated frontend and backend
- API endpoint that serves a versioned Vehicle Insurance Claim schema
- React + React Hook Form renderer for text, select, radio, checkbox, textarea, date, and section fields
- Schema-driven conditional questions and required-field validation
- A 25-day delivery plan in [`docs/ROADMAP.md`](docs/ROADMAP.md)

## Run locally

1. In `backend`, run `npm install` and `npm run dev`.
2. In `frontend`, run `npm install` and `npm run dev`.
3. Open the URL printed by Vite (normally `http://localhost:5173`).

The frontend falls back to the included demo schema if the API is not running, so the Day 1 form can still be explored.

## Current API

`GET /health` returns service health.

`GET /api/forms/vehicle-insurance-claim` returns the published demo form schema.

## Stack

React, Vite, React Hook Form, Node.js, Express, MongoDB/Mongoose (MongoDB integration begins in Day 2).
