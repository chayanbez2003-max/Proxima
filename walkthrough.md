# Proxima — Milestone 1 Walkthrough
## Resume Upload Module (MVP Foundation)

---

## What Was Built

### Backend (`server/`)

| File | Purpose |
|---|---|
| [server.js](file:///c:/Proxima/server/server.js) | Entry point — loads env, connects MongoDB, starts HTTP server |
| [app.js](file:///c:/Proxima/server/app.js) | Express factory — CORS, JSON parsing, morgan, routes, error handler |
| [config/db.js](file:///c:/Proxima/server/config/db.js) | Mongoose connection (exits process on failure) |
| [config/corsOptions.js](file:///c:/Proxima/server/config/corsOptions.js) | CORS policy — reads CLIENT_URL from `.env` |
| [config/multerConfig.js](file:///c:/Proxima/server/config/multerConfig.js) | Disk storage → `uploads/temp/`, collision-safe names, PDF-only filter |
| [config/constants.js](file:///c:/Proxima/server/config/constants.js) | `ANALYSIS_STATUS`, `PROCESSING_STATUS`, `ALLOWED_MIME_TYPES` |
| [models/Analysis.model.js](file:///c:/Proxima/server/models/Analysis.model.js) | Future-ready schema — M1 fields active, M2–M4 fields as nullable placeholders |
| [middleware/upload.middleware.js](file:///c:/Proxima/server/middleware/upload.middleware.js) | Two-layer validation: Multer fileFilter + explicit MIME check |
| [middleware/error.middleware.js](file:///c:/Proxima/server/middleware/error.middleware.js) | Global error handler — handles ApiError, Mongoose, and unexpected errors |
| [services/analysis/analysis.service.js](file:///c:/Proxima/server/services/analysis/analysis.service.js) | Creates Analysis doc, leaves M2 parsing TODO, cleans temp file |
| [controllers/analysis.controller.js](file:///c:/Proxima/server/controllers/analysis.controller.js) | Thin handler — validates file presence, calls service, returns ApiResponse |
| [routes/analysis.routes.js](file:///c:/Proxima/server/routes/analysis.routes.js) | `POST /resume` + `GET /:id` placeholder |
| [routes/index.js](file:///c:/Proxima/server/routes/index.js) | Root router — mounts all sub-routers under `/api` |
| [utils/ApiResponse.js](file:///c:/Proxima/server/utils/ApiResponse.js) | Standard success shape used by all controllers |
| [utils/ApiError.js](file:///c:/Proxima/server/utils/ApiError.js) | Custom error class with HTTP status code |
| [utils/asyncHandler.js](file:///c:/Proxima/server/utils/asyncHandler.js) | Wraps async controllers — no try/catch boilerplate needed |
| [utils/fileHelper.js](file:///c:/Proxima/server/utils/fileHelper.js) | `deleteFile()` — non-throwing async file cleanup |

### Frontend (`client/src/`)

| File | Purpose |
|---|---|
| [api/axiosInstance.js](file:///c:/Proxima/client/src/api/axiosInstance.js) | Pre-configured Axios with base URL, 30s timeout, error interceptor |
| [api/analysis.api.js](file:///c:/Proxima/client/src/api/analysis.api.js) | `uploadResumeApi()` — FormData POST with progress callback |
| [services/analysisService.js](file:///c:/Proxima/client/src/services/analysisService.js) | Client-side validation + calls API + extracts response payload |
| [hooks/useResumeUpload.js](file:///c:/Proxima/client/src/hooks/useResumeUpload.js) | State machine: file, progress, isUploading, result, error |
| [components/layout/Navbar.jsx](file:///c:/Proxima/client/src/components/layout/Navbar.jsx) | Glass-morphism fixed top bar |
| [components/layout/MainLayout.jsx](file:///c:/Proxima/client/src/components/layout/MainLayout.jsx) | Page shell — dark background + navbar offset |
| [components/upload/DropZone.jsx](file:///c:/Proxima/client/src/components/upload/DropZone.jsx) | 3-state animated drag-and-drop (idle / dragging / file-selected) |
| [components/upload/UploadProgress.jsx](file:///c:/Proxima/client/src/components/upload/UploadProgress.jsx) | Framer Motion animated progress bar |
| [pages/Landing/LandingPage.jsx](file:///c:/Proxima/client/src/pages/Landing/LandingPage.jsx) | Hero page — gradient headline, CTA, feature pills |
| [pages/Upload/UploadPage.jsx](file:///c:/Proxima/client/src/pages/Upload/UploadPage.jsx) | Upload card wiring all components via the hook |
| [pages/NotFound/NotFoundPage.jsx](file:///c:/Proxima/client/src/pages/NotFound/NotFoundPage.jsx) | 404 fallback |
| [routes/AppRoutes.jsx](file:///c:/Proxima/client/src/routes/AppRoutes.jsx) | Central route registry |
| [App.jsx](file:///c:/Proxima/client/src/App.jsx) | BrowserRouter wrapper |
| [constants/routes.js](file:///c:/Proxima/client/src/constants/routes.js) | Route path constants |
| [constants/appConfig.js](file:///c:/Proxima/client/src/constants/appConfig.js) | App name, file limits |
| [vite.config.js](file:///c:/Proxima/client/vite.config.js) | Dev proxy `/api → :5000` to eliminate CORS in local dev |
| [client/.env](file:///c:/Proxima/client/.env) | `VITE_API_BASE_URL` for Axios |

---

## Request Flow — Upload

```
User drops PDF onto DropZone
    │
    ▼
useResumeUpload.handleUpload()
    │
    ▼
analysisService.uploadResumeService()   ← client-side validation
    │
    ▼
analysis.api.uploadResumeApi()          ← FormData POST with progress
    │  HTTP POST /api/analysis/resume
    ▼
upload.middleware.js                    ← Multer save → uploads/temp/
    │
    ▼
analysis.controller.uploadResume()      ← thin, calls service
    │
    ▼
analysis.service.uploadResumeService()  ← creates Analysis doc in MongoDB
    │                                      [TODO M2: call PDF parser here]
    ├── deleteFile(tempPath)             ← cleans up temp PDF
    ▼
Analysis.create() → MongoDB
    │
    ▼
ApiResponse(201, { analysisId, status })
    │  JSON response
    ▼
useResumeUpload → result state → toast + success card on UI
```

---

## Verified Results

| Test | Result |
|---|---|
| `GET http://localhost:5000/health` | `{ "status": "OK", "environment": "development" }` ✅ |
| MongoDB connection | Connected to Atlas cluster ✅ |
| Server startup | No crashes, morgan logging active ✅ |

---

## Analysis Schema — Field Milestone Map

| Field | Active In |
|---|---|
| `originalFileName`, `status`, `processingStatus`, `selectedRole` | ✅ M1 |
| `extractedText`, `candidateName`, `email`, `phone` | 🔜 M2 (Parsing) |
| `extractedSkills`, `matchScore`, `careerReadiness` | 🔜 M3 (Skill Analysis) |
| `recommendations` | 🔜 M4 (Recommendations) |

---

## How to Run

```bash
# Terminal 1 — Backend
cd c:\Proxima\server
npm run dev          # uses node --watch

# Terminal 2 — Frontend
cd c:\Proxima\client
npm run dev          # Vite on :5173, proxies /api → :5000
```

---

## Next Milestone (M2) — Resume Parsing

The insertion point is already marked in [analysis.service.js](file:///c:/Proxima/server/services/analysis/analysis.service.js#L33-L38):

```js
// ── Step 2: [ MILESTONE 2 PLACEHOLDER ] ────────────────
// TODO (M2): Call resumeParser.service.js here to extract text from the PDF.
//            Update analysis.extractedText, candidateName, email, phone.
//            Update analysis.status → ANALYSIS_STATUS.PARSED
```

M2 will implement:
- `services/parser/pdfExtractor.service.js` — `pdf-parse` integration
- `services/parser/resumeParser.service.js` — structured data extraction
- Update `analysis.status` → `parsed` after extraction
- Return richer data to the frontend
