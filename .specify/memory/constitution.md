<!--
Version: 2.0.0
Created: 2025-12-29
Phase: II - Full Stack Web Application
Previous Phase: Phase I (Python CLI In-Memory) v1.1.0
Breaking Changes:
  - Architecture shift: CLI → Web (Frontend + Backend + Database)
  - Storage shift: In-Memory → PostgreSQL (Neon)
  - Added: Authentication layer (Better Auth)
  - Added: Multi-user support
  - Technology stack: Node.js/TypeScript ecosystem (vs Python)
Rationale:
  - Phase 2 is a complete architectural pivot requiring new constitution
  - Maintains feature parity while adding persistence, auth, and web UI
  - All Phase 1 principles (simplicity, modularity, clean code) carry forward
  - New sections: Backend API design, Frontend UX, Authentication, Database schema
-->

# Phase II Full-Stack Web Todo Application Constitution

## Purpose

This constitution defines the non-negotiable principles, rules, and decision framework for all specifications, plans, and implementations of the Phase II Full-Stack Web Todo Application.

**All future specs, plans, and code MUST comply with this document.**

## Project Overview

This project transforms the Phase I CLI Todo application into a production-ready full-stack web application with persistence, authentication, and a responsive UI. It demonstrates spec-driven development with Claude Code and Spec-Kit Plus while implementing industry-standard web architecture patterns.

**Phase II Scope:**
- Full-stack web application (Frontend + Backend + Database)
- Persistent storage using **Neon Serverless PostgreSQL**
- User authentication and authorization using **Better Auth**
- Multi-user support (each user sees only their own tasks)
- RESTful API architecture
- Responsive web interface
- Complete feature parity with Phase I (Basic, Intermediate, Advanced levels)

**Out of Scope for Phase II:**
- Real-time collaboration features
- Mobile native applications
- Third-party integrations (calendar sync, email notifications, etc.)
- Cloud deployment configuration (infrastructure as code)
- Advanced analytics or reporting

## Feature Parity with Phase I

All features from Phase I MUST be fully implemented in the web application:

### Basic Level - Core Essentials
1. **Add Task** - Create new tasks with title and optional description
2. **Delete Task** - Remove tasks by ID
3. **Update Task** - Modify task title/description
4. **View Task List** - Display all tasks with status
5. **Mark Complete/Incomplete** - Toggle task completion status

### Intermediate Level - Organization & Usability
1. **Priorities** - Assign low/medium/high priority to tasks
2. **Tags/Categories** - Organize tasks by custom tags or categories
3. **Search & Filter** - Find tasks by title, description, tags, or priority
4. **Sort** - Order tasks by due date, priority, creation date, or alphabetically

### Advanced Level - Intelligent Features
1. **Recurring Tasks** - Support daily, weekly, monthly recurrence patterns
2. **Due Dates** - Assign due dates to tasks with validation
3. **Time Reminders** - Notify users before tasks are due (browser-based notifications)

## Core Principles

### I. Simplicity and Readability First (Carried from Phase I)

Code MUST be immediately understandable to any full-stack developer. Avoid clever tricks, over-engineering, or premature optimization.

**Non-Negotiable Rules:**
- No complex abstractions unless absolutely necessary
- Prefer explicit, verbose code over concise but obscure patterns
- No performance optimizations unless there's a measured bottleneck
- Code reviews must verify that any developer can understand the logic in under 2 minutes
- Component and API naming MUST be self-documenting

**Rationale:** Phase II builds on Phase I foundation. Clarity enables future developers to extend the system confidently across frontend, backend, and database layers.

### II. Clean Code Principles (Expanded for Web)

Follow language-specific best practices strictly. Use meaningful variable, function, component, and API names. Keep functions/components focused on a single responsibility.

**Non-Negotiable Rules:**
- **Backend (Node.js/TypeScript):** ESLint + Prettier enforced
- **Frontend:** Component-based architecture, single responsibility per component
- Function/method length MUST NOT exceed 50 lines unless justified
- Variable/parameter names MUST be descriptive (no single-letter names except loop iterators)
- Each function/component MUST do one thing only
- API endpoint names MUST follow RESTful conventions

**Rationale:** Multi-layer architecture requires consistent style across codebase. Clean separation between frontend, backend, and data layers prevents coupling.

### III. Modularity and Extensibility (Critical for Full Stack)

Design decisions MUST support future phases. Adding new features MUST NOT require major refactoring. Business logic MUST be decoupled from presentation and persistence layers.

**Non-Negotiable Rules:**
- **Backend:** Business logic MUST NOT contain HTTP/database implementation details
- **Frontend:** UI components MUST NOT contain business logic or direct API calls
- **Database:** Schema design MUST support future extensions without breaking changes
- All dependencies MUST flow inward (UI → API → Business Logic → Data Layer)
- Authentication/authorization MUST be middleware-based (not embedded in route handlers)

**Rationale:** Full-stack applications have multiple refactoring pain points. Clean separation ensures each layer can evolve independently.

### IV. Security First (New for Phase II)

Security is non-negotiable. All user data MUST be protected. Authentication and authorization MUST be enforced at every layer.

**Non-Negotiable Rules:**
- **Never store plaintext passwords** (Better Auth handles hashing)
- **All API endpoints MUST require authentication** (except signup/signin)
- **Input validation MUST occur on both client and server**
- **SQL injection prevention:** Use parameterized queries ONLY
- **XSS prevention:** Sanitize all user input displayed in UI
- **CSRF protection:** Implement CSRF tokens for state-changing operations
- **Environment secrets:** NEVER commit `.env` files or credentials to version control
- **User data isolation:** Users MUST ONLY access their own tasks (enforced at database query level)

**Rationale:** Web applications face significantly more security threats than CLI tools. Defense-in-depth approach prevents common vulnerabilities.

### V. API-First Design (New for Phase II)

The backend API is the contract between frontend and backend. It MUST be stable, well-documented, and versioned.

**Non-Negotiable Rules:**
- **RESTful conventions REQUIRED:** `GET /tasks`, `POST /tasks`, `PUT /tasks/:id`, `DELETE /tasks/:id`
- **Consistent response format:**
  ```json
  {
    "success": true,
    "data": { ... },
    "error": null
  }
  ```
- **HTTP status codes MUST be semantically correct:**
  - `200 OK` - Successful GET/PUT
  - `201 Created` - Successful POST
  - `204 No Content` - Successful DELETE
  - `400 Bad Request` - Validation errors
  - `401 Unauthorized` - Missing/invalid auth
  - `403 Forbidden` - Authenticated but not authorized
  - `404 Not Found` - Resource doesn't exist
  - `500 Internal Server Error` - Server failures
- **Error responses MUST include actionable messages:**
  ```json
  {
    "success": false,
    "data": null,
    "error": {
      "code": "VALIDATION_ERROR",
      "message": "Title is required and must be between 1-200 characters",
      "field": "title"
    }
  }
  ```
- **API versioning:** Routes MUST be prefixed with `/api/v1/`

**Rationale:** Frontend and backend may evolve independently. A stable, well-designed API contract prevents integration issues.

## Technical Stack

### Backend
- **Runtime:** Node.js 20+ LTS
- **Language:** TypeScript 5+
- **Framework:** Express.js or Fastify (TBD in spec)
- **Authentication:** Better Auth
- **Database ORM:** Prisma or Drizzle (TBD in spec)
- **Database:** Neon Serverless PostgreSQL
- **Validation:** Zod or Joi (TBD in spec)

### Frontend
- **Framework:** React 18+ or Next.js 14+ (TBD in spec)
- **Language:** TypeScript 5+
- **Styling:** Tailwind CSS or shadcn/ui (TBD in spec)
- **State Management:** React Context or Zustand (if needed, TBD in spec)
- **HTTP Client:** Fetch API or Axios (TBD in spec)
- **Form Handling:** React Hook Form (if needed, TBD in spec)

### Development Tools
- **Package Manager:** pnpm or npm (TBD in spec)
- **Linting:** ESLint with TypeScript plugin
- **Formatting:** Prettier
- **Type Checking:** TypeScript strict mode REQUIRED

**Rationale:** Modern, widely-adopted tools with strong community support. TypeScript everywhere ensures type safety across the stack.

## Database Schema Requirements

### Core Entities

#### Users Table
```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

**Rules:**
- Better Auth will manage password hashing and session storage
- Email MUST be unique and validated
- Soft deletes NOT required for Phase II

#### Tasks Table
```sql
CREATE TABLE tasks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  title VARCHAR(200) NOT NULL,
  description TEXT,
  completed BOOLEAN DEFAULT FALSE,
  priority VARCHAR(20) DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high')),
  tags TEXT[], -- PostgreSQL array type
  category VARCHAR(100),
  due_date TIMESTAMP,
  recurrence_pattern VARCHAR(50), -- 'daily', 'weekly', 'monthly', or NULL
  reminder_enabled BOOLEAN DEFAULT FALSE,
  reminder_offset_minutes INT, -- Minutes before due_date to remind
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_tasks_user_id ON tasks(user_id);
CREATE INDEX idx_tasks_due_date ON tasks(due_date);
CREATE INDEX idx_tasks_completed ON tasks(completed);
```

**Rules:**
- UUIDs REQUIRED for all primary keys (better for distributed systems than auto-increment)
- `user_id` foreign key MUST enforce CASCADE DELETE
- All queries MUST filter by `user_id` to enforce data isolation
- `tags` stored as PostgreSQL array for efficient querying
- `recurrence_pattern` stored as string for simplicity (Phase II does not require complex RRULE)

**Rationale:** Schema supports all Phase I features while enabling future extensions. UUIDs prevent enumeration attacks. Proper indexing ensures fast queries.

## Backend Architecture

### Required Layers

```
┌─────────────────────────────────────┐
│  HTTP Layer (Express/Fastify)       │
│  - Route handlers                   │
│  - Request/response formatting      │
└────────────┬────────────────────────┘
             │
┌────────────▼────────────────────────┐
│  Middleware Layer                   │
│  - Authentication (Better Auth)     │
│  - Validation (Zod/Joi)             │
│  - Error handling                   │
└────────────┬────────────────────────┘
             │
┌────────────▼────────────────────────┐
│  Business Logic Layer (Services)    │
│  - Task operations                  │
│  - Recurrence logic                 │
│  - Reminder scheduling              │
└────────────┬────────────────────────┘
             │
┌────────────▼────────────────────────┐
│  Data Access Layer (Repositories)   │
│  - Database queries (Prisma/Drizzle)│
│  - User isolation enforcement       │
└─────────────────────────────────────┘
```

**Non-Negotiable Rules:**
- **HTTP Layer:** MUST NOT contain business logic (only route mapping and serialization)
- **Middleware:** MUST be composable and reusable
- **Business Logic:** MUST be testable without HTTP context
- **Data Access:** MUST use ORM (no raw SQL except for complex queries)
- **User Isolation:** MUST be enforced in data access layer (ALL queries filter by `user_id`)

**File Structure Example:**
```
backend/
├── src/
│   ├── routes/           # API route definitions
│   │   ├── auth.routes.ts
│   │   └── tasks.routes.ts
│   ├── middleware/       # Auth, validation, error handling
│   │   ├── auth.middleware.ts
│   │   └── validate.middleware.ts
│   ├── services/         # Business logic
│   │   ├── task.service.ts
│   │   └── recurrence.service.ts
│   ├── repositories/     # Database access
│   │   └── task.repository.ts
│   ├── models/           # TypeScript types/interfaces
│   │   └── task.model.ts
│   ├── config/           # Configuration (DB, Auth)
│   │   └── database.config.ts
│   └── index.ts          # App entry point
├── prisma/ (or drizzle/)
│   └── schema.prisma
├── .env.example
└── package.json
```

**Rationale:** Layered architecture enforces separation of concerns and makes testing straightforward.

## Authentication & Authorization

### Better Auth Integration

**Requirements:**
- Use Better Auth for all authentication flows
- Session-based authentication (stateful sessions stored in database)
- CSRF protection enabled
- Secure cookie configuration (httpOnly, secure, sameSite)

**Auth Flows:**

1. **Signup:**
   - `POST /api/v1/auth/signup`
   - Validate email format and password strength
   - Create user record
   - Return session token

2. **Signin:**
   - `POST /api/v1/auth/signin`
   - Validate credentials
   - Create session
   - Return session token

3. **Signout:**
   - `POST /api/v1/auth/signout`
   - Invalidate session
   - Clear cookies

4. **Session Validation:**
   - Middleware checks session on every protected route
   - Attach `user` object to request context

**Authorization Rules:**
- All `/api/v1/tasks/*` endpoints REQUIRE authentication
- Users can ONLY access their own tasks
- Database queries MUST include `WHERE user_id = $authenticatedUserId`

**Rationale:** Better Auth provides battle-tested security primitives. Session-based auth is simpler than JWT for single-server applications.

## Frontend Architecture

### Component Structure

**Required Patterns:**
- **Container/Presentational Pattern:**
  - Container components handle data fetching and state
  - Presentational components receive props and render UI
- **Single Responsibility:** Each component does ONE thing
- **Prop Validation:** Use TypeScript interfaces for all props

**Component Hierarchy Example:**
```
App
├── AuthProvider (wraps entire app)
├── Routes
│   ├── SignupPage
│   ├── SigninPage
│   └── DashboardPage
│       ├── TaskListContainer (fetches tasks, handles state)
│       │   ├── TaskList (presentational)
│       │   │   ├── TaskItem (presentational)
│       │   │   └── TaskFilters (presentational)
│       │   └── AddTaskForm (container + presentational)
│       └── Sidebar (navigation)
```

**File Structure Example:**
```
frontend/
├── src/
│   ├── components/       # Reusable presentational components
│   │   ├── TaskItem.tsx
│   │   ├── TaskList.tsx
│   │   └── Button.tsx
│   ├── containers/       # Container components (data + state)
│   │   ├── TaskListContainer.tsx
│   │   └── AddTaskFormContainer.tsx
│   ├── pages/            # Page-level components
│   │   ├── SignupPage.tsx
│   │   ├── SigninPage.tsx
│   │   └── DashboardPage.tsx
│   ├── hooks/            # Custom React hooks
│   │   ├── useTasks.ts
│   │   └── useAuth.ts
│   ├── services/         # API client functions
│   │   ├── api.ts
│   │   └── tasks.api.ts
│   ├── types/            # TypeScript types/interfaces
│   │   └── task.types.ts
│   ├── utils/            # Helper functions
│   │   └── dateFormatter.ts
│   └── App.tsx
├── public/
└── package.json
```

**Rationale:** Clear separation between data/logic and presentation makes components reusable and testable.

### State Management Rules

**Non-Negotiable Rules:**
- **Server state (tasks):** Fetch from API, cache in component state or context
- **Client state (UI):** Use React's `useState` for local component state
- **Avoid prop drilling:** Use React Context for deeply nested shared state
- **No global mutable state:** All state changes MUST be explicit (setState, context updates)

**Rationale:** React's built-in state management is sufficient for Phase II. Adding Redux/MobX would be over-engineering.

### API Integration

**Required Patterns:**
- Centralized API client (`services/api.ts`) with:
  - Base URL configuration
  - Authentication headers injection
  - Error handling and retry logic
- Per-resource API modules (`tasks.api.ts`, `auth.api.ts`)

**Example API Client:**
```typescript
// services/api.ts
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api/v1';

export async function apiRequest<T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    credentials: 'include', // Include cookies for session auth
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Request failed');
  }

  return response.json();
}

// tasks.api.ts
export async function fetchTasks(): Promise<Task[]> {
  const response = await apiRequest<{ success: boolean; data: Task[] }>('/tasks');
  return response.data;
}
```

**Rationale:** Centralized API logic prevents duplicated error handling and auth logic across components.

## UI/UX Requirements

### Responsive Design
- MUST support desktop (1024px+), tablet (768px-1023px), and mobile (320px-767px)
- Use mobile-first approach (start with mobile styles, add breakpoints for larger screens)
- Touch-friendly tap targets (minimum 44x44px)

### Accessibility
- Semantic HTML (use `<button>`, `<form>`, `<nav>`, etc. correctly)
- ARIA labels for icon-only buttons
- Keyboard navigation support (tab order, focus states)
- Color contrast ratio MUST meet WCAG AA standards (4.5:1 for normal text)

### Visual Design Principles
- **Consistent spacing:** Use 4px/8px grid system
- **Typography hierarchy:** Clear heading levels (h1, h2, h3)
- **Status indicators:**
  - Completed tasks: Green checkmark + strikethrough text
  - Incomplete tasks: Empty checkbox
  - Overdue tasks: Red highlight
- **Priority colors:**
  - High: Red (`#EF4444` or equivalent)
  - Medium: Yellow (`#F59E0B` or equivalent)
  - Low: Gray (`#6B7280` or equivalent)
- **Loading states:** Skeleton loaders or spinners for async operations
- **Empty states:** Helpful messages when no tasks exist ("No tasks yet. Add your first task!")

**Rationale:** Consistent, accessible UI improves user experience and reduces support burden.

## Error Handling

### Backend Error Handling

**Required Middleware:**
```typescript
// middleware/errorHandler.ts
export function errorHandler(err: Error, req: Request, res: Response, next: NextFunction) {
  console.error(err.stack);

  // Known validation errors
  if (err instanceof ValidationError) {
    return res.status(400).json({
      success: false,
      data: null,
      error: {
        code: 'VALIDATION_ERROR',
        message: err.message,
        field: err.field,
      },
    });
  }

  // Unauthorized errors
  if (err instanceof UnauthorizedError) {
    return res.status(401).json({
      success: false,
      data: null,
      error: { code: 'UNAUTHORIZED', message: 'Authentication required' },
    });
  }

  // Generic server errors
  res.status(500).json({
    success: false,
    data: null,
    error: { code: 'INTERNAL_ERROR', message: 'An unexpected error occurred' },
  });
}
```

**Rules:**
- NEVER expose stack traces in production
- Log all errors server-side for debugging
- Return user-friendly error messages
- Use appropriate HTTP status codes

### Frontend Error Handling

**Required Patterns:**
- Toast notifications for transient errors (network failures)
- Inline validation errors for forms
- Graceful degradation (show cached data if API fails)
- Retry mechanisms for network errors

**Example:**
```typescript
async function handleAddTask(task: CreateTaskInput) {
  try {
    const newTask = await createTask(task);
    setTasks([...tasks, newTask]);
    showToast('Task added successfully', 'success');
  } catch (error) {
    console.error('Failed to add task:', error);
    showToast('Failed to add task. Please try again.', 'error');
  }
}
```

**Rationale:** Users should never see cryptic error messages or be left wondering what went wrong.

## Testing Strategy

### Backend Testing
- **Unit Tests:** Business logic (services) MUST have >80% coverage
- **Integration Tests:** API routes with real database (test database)
- **Tools:** Jest or Vitest + Supertest

**Example:**
```typescript
// task.service.test.ts
describe('TaskService', () => {
  it('should create a task for authenticated user', async () => {
    const userId = 'test-user-id';
    const taskData = { title: 'Test Task', description: 'Test' };
    const task = await taskService.createTask(userId, taskData);
    expect(task.title).toBe('Test Task');
    expect(task.userId).toBe(userId);
  });

  it('should not allow user to access another user\'s tasks', async () => {
    const user1 = 'user-1';
    const user2 = 'user-2';
    await taskService.createTask(user1, { title: 'User 1 Task' });
    const user2Tasks = await taskService.getTasks(user2);
    expect(user2Tasks).toHaveLength(0);
  });
});
```

### Frontend Testing
- **Component Tests:** React Testing Library for UI components
- **Integration Tests:** User flows (signup → signin → add task → complete task)
- **Tools:** Vitest + React Testing Library

**Rationale:** Tests provide safety net for refactoring and catch regressions early.

## Environment Configuration

### Required Environment Variables

**Backend (.env):**
```
# Database
DATABASE_URL=postgresql://user:password@host:5432/dbname

# Better Auth
AUTH_SECRET=<random-secret-key>
AUTH_COOKIE_NAME=session
AUTH_COOKIE_SECURE=true (production) / false (development)

# Server
PORT=3000
NODE_ENV=development | production
```

**Frontend (.env):**
```
VITE_API_BASE_URL=http://localhost:3000/api/v1
```

**Rules:**
- `.env` files MUST be in `.gitignore`
- `.env.example` MUST be committed with dummy values
- Secrets MUST be generated securely (`openssl rand -base64 32`)
- Production secrets MUST be managed via environment (Vercel/Render env vars, not files)

**Rationale:** Hardcoded secrets are security vulnerabilities. Environment-based config enables different settings per environment.

## Deployment Readiness (Out of Scope but Prepared For)

While deployment is out of scope for Phase II, code MUST be deployment-ready:

**Required Preparation:**
- Environment variable configuration (no hardcoded values)
- Database migrations (Prisma/Drizzle migration files)
- Production build scripts (`npm run build`)
- Health check endpoint (`GET /api/v1/health`)

**Rationale:** Code that can't be deployed is not production-ready, even if actual deployment is deferred.

## Documentation Requirements

### README.md (Required)

MUST include:
- **Project Overview:** What the application does, key features
- **Tech Stack:** List all major technologies (React, Node.js, PostgreSQL, Better Auth, etc.)
- **Prerequisites:** Node.js 20+, pnpm, PostgreSQL (or Neon account)
- **Setup Instructions:**
  1. Clone repository
  2. Install dependencies (`pnpm install`)
  3. Set up environment variables (`.env` files)
  4. Run database migrations
  5. Start backend (`pnpm run dev:backend`)
  6. Start frontend (`pnpm run dev:frontend`)
- **Project Structure:** High-level directory overview
- **API Documentation:** Link to API endpoint reference (or inline summary)
- **Testing:** How to run tests (`pnpm test`)
- **Contributing Guidelines:** If applicable

### API Documentation (Required)

MUST include for each endpoint:
- HTTP method and path
- Request body schema (with examples)
- Response schema (with examples)
- Error codes and meanings
- Authentication requirements

**Format:** Markdown file (`API.md`) or inline code comments (JSDoc)

**Example:**
```markdown
### Create Task
**POST** `/api/v1/tasks`

**Auth Required:** Yes

**Request Body:**
```json
{
  "title": "Complete project",
  "description": "Finish Phase II implementation",
  "priority": "high",
  "due_date": "2025-12-31T23:59:59Z"
}
```

**Success Response (201 Created):**
```json
{
  "success": true,
  "data": {
    "id": "uuid-here",
    "title": "Complete project",
    ...
  },
  "error": null
}
```

**Error Response (400 Bad Request):**
```json
{
  "success": false,
  "data": null,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Title is required",
    "field": "title"
  }
}
```
```

**Rationale:** Good documentation reduces onboarding friction and prevents API misuse.

## Governance

### Amendment Procedure

1. Amendments MUST be proposed with rationale and impact analysis
2. Amendments MUST be approved before implementation begins
3. Version MUST be incremented according to semantic versioning:
   - **MAJOR (2.x.0 → 3.0.0):** Backward-incompatible changes (e.g., removing required principles)
   - **MINOR (2.0.x → 2.1.0):** New principles/sections added or materially expanded
   - **PATCH (2.0.0 → 2.0.1):** Clarifications, wording fixes, non-semantic refinements
4. All dependent templates and documentation MUST be updated to reflect changes

### Versioning Policy

- Constitution version follows semantic versioning (MAJOR.MINOR.PATCH)
- All specs, plans, and code reviews MUST reference the constitution version they comply with

### Compliance Review

- All PRs and design reviews MUST verify compliance with this constitution
- Security violations MUST block merges (no exceptions)
- Deviations require explicit approval and ADR (Architecture Decision Record)

**Enforcement:** Non-compliance blocks merges. No exceptions.

## Progressive Implementation Strategy

### Phase Enforcement Rules

1. **Authentication MUST be implemented first**
   - Signup/Signin flows functional
   - Session management working
   - Protected routes enforcing auth

2. **Basic Level MUST be fully implemented before Intermediate**
   - All CRUD operations functional
   - Database persistence working
   - User isolation enforced
   - Frontend UI polished

3. **Intermediate Level MUST be fully implemented before Advanced**
   - Priority, tags, search, filter, and sort working
   - API endpoints complete
   - Frontend components integrated

4. **Advanced Level requires robust foundation**
   - Due dates and recurrence patterns validated
   - Reminder system designed (browser notifications)
   - Backward compatibility maintained

**Rationale:** Progressive implementation ensures each level is production-ready before adding complexity.

### Backward Compatibility Rules

- New features MUST NOT break existing API contracts
- Database migrations MUST be non-destructive (additive only)
- Frontend MUST handle tasks created in earlier levels without errors
- Default values MUST be sensible for all optional fields

**Example:** A task created with only title/description (Basic Level) MUST display correctly when viewed after Intermediate Level features are added.

---

**Version**: 2.0.0 | **Created**: 2025-12-29 | **Ratified**: 2025-12-29 | **Phase**: II (Full Stack Web)
