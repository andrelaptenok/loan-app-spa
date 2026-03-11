# Loan Application SPA

A single-page React + TypeScript application that implements a three-step loan application flow with validation and a
final confirmation modal:

1. Personal details
2. Address and employment
3. Loan parameters + application submission

After a successful API call, a confirmation modal is shown.

---

## Tech stack

- **React + TypeScript** – core UI and type safety.
- **Vite** – dev server and build tooling.
- **React Router** – routing between steps (`/loan/:step`).
- **react-hook-form** – form state management and validation wiring.
- **Zod** – schema-based validation for form data.
- **Zustand** – global state for multi-step form data.
- **react-imask** – phone input masking.
- **Bootstrap 5** – basic styling and layout.
- **classnames** – conditional CSS class composition.

---

## How to run

### Prerequisites

- Node.js `>= 18` (tested with Node 18/20)
- npm (or yarn/pnpm; commands below use npm)

### Install dependencies

```bash
npm install
```

### Start development server

```bash
npm run dev
```

By default the app will be available at `http://localhost:5173`.

### Build and preview production bundle

```bash
npm run build
npm run preview
```

---

## Features by step

### Step 1: Personal details

**Fields:**

- **Phone** – `input type="tel"` with mask `0 XXX XXX XXX`, required.
- **First name** – `input type="text"`, required.
- **Last name** – `input type="text"`, required.
- **Gender** – `select` with options `Male` / `Female`, required.

**Button:**

- **Next** – goes to step 2.  
  Navigation is only allowed when validation passes; otherwise, validation errors are shown.

### Step 2: Address and employment

**Fields:**

- **Workplace** – `select`, required.  
  Options are loaded from `GET https://dummyjson.com/products/category-list`.  
  The result is cached in the module and reused on subsequent calls.
- **Residential address** – `input type="text"`, required.

**Buttons:**

- **Back** – returns to step 1 while preserving entered data.
- **Next** – goes to step 3 when validation passes.

There is basic UX around loading and errors for workplace options:

- While loading – placeholder text “Loading workplaces…”, select is disabled.
- On error – placeholder “Failed to load workplaces” and a warning alert; select is disabled.

### Step 3: Loan parameters

**Fields:**

- **Loan amount** – `input type="range"`, from `$200` to `$1000`, step `100`.
- **Loan term** – `input type="range"`, from `10` to `30` days, step `1`.

**Buttons:**

- **Back** – returns to step 2 while preserving data.
- **Submit application** – sends data to the test API:

    - `POST https://dummyjson.com/products/add`
    - Body: `{ "title": "<firstName> <lastName>" }`

On a successful response, a confirmation modal is displayed.

---

## Final confirmation modal

After a successful submission, a modal is displayed with text like:

```text
Congratulations, <LastName> <FirstName>. You are approved for $<amount> for <term> days.
```

All values (`lastName`, `firstName`, `amount`, `term`) are taken from the centralized application state so that the user
always sees the data they have entered.

---

## State management and navigation

- All form data is stored in a **Zustand** store (`entities/loan`), persisted to `localStorage`.
- When navigating back and forth between steps, the data is preserved and prefilled in the forms.
- Direct navigation to later steps is guarded:
    - If step 1 is incomplete, the user is redirected to step 1.
    - If step 2 is incomplete (for step 3), the user is redirected to step 2.

---

## Why these libraries?

### React Router

- Used for step-based navigation (`/loan/:step`) instead of manually tracking the current step in component state.
- Makes the flow explicit and easy to extend (e.g., adding new steps or pages).

### react-hook-form + Zod

- **react-hook-form**
    - Efficient form state management with minimal re-renders.
    - Good integration with both controlled and uncontrolled inputs, and with custom components like the masked phone
      input.
- **Zod**
    - Validation rules are described as schemas close to the domain data.
    - `z.infer` keeps TypeScript types in sync with schemas without duplication.

These libraries were chosen to get strong, declarative validation and clean error handling with minimal boilerplate.

### Zustand

- Centralizes data from all three steps in a small, focused store.
- Compared to Redux or React Context, Zustand is lighter and has:
    - A tiny API,
    - Simple selectors,
    - Built-in `persist` middleware for saving form state across refreshes.
- This fits a small SPA like this while still looking like a “real” multi-step form architecture.

### react-imask

- Handles the `0 XXX XXX XXX` phone mask at the input level.
- Removes the need to reimplement masking/formatting logic manually.
- Integrates cleanly with `react-hook-form` via `Controller`.

### Bootstrap 5 + classnames

- **Bootstrap 5**
    - Provides basic layout (grid, spacing) and form styling out of the box.
    - Allows focusing on application logic rather than custom styling for this test task.
- **classnames**
    - Simplifies building conditional `className` strings (e.g., error/disabled/open states).
    - Keeps JSX readable instead of nesting multiple ternaries.

---

## Time spent

- Analyzing the task and planning: ~0.5 hours
- Setting up project structure (routing, layers, state): ~1.5 hours
- Implementing forms, validation and API calls: ~2 hours
- UX polish (phone mask, errors, loading states, modal): ~1 hour
- Refactoring, typing, README and code review passes: ~1 hour

**Total:** ~6 hours

---

## Possible improvements

- Improve the residential address input by integrating an address autocomplete using a maps API  
  (for example, Google Maps Places API or a similar geocoding/places service), in order to:
    - reduce manual input and typos,
    - suggest real addresses as the user types,
    - optionally store structured address parts (city, street, house number) instead of a single free-text field.
