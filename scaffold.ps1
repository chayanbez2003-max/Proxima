
# ============================================================
# PROXIMA - AI RESUME ANALYZER
# Full Project Scaffold Script
# ============================================================

Set-Location "c:\Proxima"

# ──────────────────────────────────────────────
# HELPER
# ──────────────────────────────────────────────
function Touch($path) {
  New-Item -ItemType File -Force -Path $path | Out-Null
}
function MkDir($path) {
  New-Item -ItemType Directory -Force -Path $path | Out-Null
}

# ──────────────────────────────────────────────
# BACKEND — server/
# ──────────────────────────────────────────────
$serverDirs = @(
  "server\config",
  "server\controllers",
  "server\routes",
  "server\middleware",
  "server\models",
  "server\services\parser",
  "server\services\matcher",
  "server\services\recommendation",
  "server\services\analysis",
  "server\services\ai",
  "server\database",
  "server\utils",
  "server\uploads\temp",
  "server\logs"
)
foreach ($d in $serverDirs) { MkDir $d }

$serverFiles = @(
  # Entry points
  "server\server.js",
  "server\app.js",

  # Config
  "server\config\db.js",
  "server\config\corsOptions.js",
  "server\config\multerConfig.js",
  "server\config\constants.js",

  # Controllers
  "server\controllers\resume.controller.js",
  "server\controllers\analysis.controller.js",
  "server\controllers\user.controller.js",

  # Routes
  "server\routes\index.js",
  "server\routes\resume.routes.js",
  "server\routes\analysis.routes.js",
  "server\routes\user.routes.js",

  # Middleware
  "server\middleware\upload.middleware.js",
  "server\middleware\error.middleware.js",
  "server\middleware\auth.middleware.js",
  "server\middleware\validate.middleware.js",
  "server\middleware\rateLimiter.middleware.js",

  # Models
  "server\models\Resume.model.js",
  "server\models\User.model.js",
  "server\models\Analysis.model.js",
  "server\models\JobRole.model.js",

  # Services — Parser
  "server\services\parser\resumeParser.service.js",
  "server\services\parser\pdfExtractor.service.js",

  # Services — Matcher
  "server\services\matcher\skillMatcher.service.js",
  "server\services\matcher\jobRoleMatcher.service.js",

  # Services — Recommendation
  "server\services\recommendation\recommendation.service.js",
  "server\services\recommendation\learningPath.service.js",

  # Services — Analysis
  "server\services\analysis\analysis.service.js",
  "server\services\analysis\gapDetector.service.js",

  # Services — AI (Gemini)
  "server\services\ai\gemini.service.js",
  "server\services\ai\aiPrompt.service.js",

  # Database
  "server\database\db.js",
  "server\database\seed.js",

  # Utils
  "server\utils\logger.js",
  "server\utils\asyncHandler.js",
  "server\utils\ApiResponse.js",
  "server\utils\ApiError.js",
  "server\utils\fileHelper.js",
  "server\utils\validators.js",

  # Keep placeholders for empty dirs
  "server\logs\.gitkeep",
  "server\uploads\temp\.gitkeep"
)
foreach ($f in $serverFiles) { Touch $f }

Write-Host "✔ Backend scaffold complete."

# ──────────────────────────────────────────────
# FRONTEND — client/src/
# ──────────────────────────────────────────────
$clientDirs = @(
  "client\src\assets\images",
  "client\src\assets\icons",
  "client\src\components\common",
  "client\src\components\layout",
  "client\src\components\upload",
  "client\src\components\dashboard",
  "client\src\components\analysis",
  "client\src\components\recommendation",
  "client\src\components\ui",
  "client\src\pages\Landing",
  "client\src\pages\Upload",
  "client\src\pages\Dashboard",
  "client\src\pages\Analysis",
  "client\src\pages\NotFound",
  "client\src\hooks",
  "client\src\services",
  "client\src\api",
  "client\src\utils",
  "client\src\constants",
  "client\src\context",
  "client\src\routes",
  "client\src\styles",
  "client\src\lib"
)
foreach ($d in $clientDirs) { MkDir $d }

$clientFiles = @(
  # Pages
  "client\src\pages\Landing\LandingPage.jsx",
  "client\src\pages\Landing\index.js",
  "client\src\pages\Upload\UploadPage.jsx",
  "client\src\pages\Upload\index.js",
  "client\src\pages\Dashboard\DashboardPage.jsx",
  "client\src\pages\Dashboard\index.js",
  "client\src\pages\Analysis\AnalysisPage.jsx",
  "client\src\pages\Analysis\index.js",
  "client\src\pages\NotFound\NotFoundPage.jsx",
  "client\src\pages\NotFound\index.js",

  # Layout components
  "client\src\components\layout\Navbar.jsx",
  "client\src\components\layout\Footer.jsx",
  "client\src\components\layout\Sidebar.jsx",
  "client\src\components\layout\MainLayout.jsx",
  "client\src\components\layout\PageWrapper.jsx",

  # Common components
  "client\src\components\common\Button.jsx",
  "client\src\components\common\Card.jsx",
  "client\src\components\common\Badge.jsx",
  "client\src\components\common\Spinner.jsx",
  "client\src\components\common\ProgressBar.jsx",
  "client\src\components\common\Modal.jsx",
  "client\src\components\common\EmptyState.jsx",
  "client\src\components\common\ErrorBoundary.jsx",

  # Upload components
  "client\src\components\upload\DropZone.jsx",
  "client\src\components\upload\FilePreview.jsx",
  "client\src\components\upload\UploadProgress.jsx",

  # Dashboard components
  "client\src\components\dashboard\SkillChart.jsx",
  "client\src\components\dashboard\GapSummary.jsx",
  "client\src\components\dashboard\ScoreCard.jsx",
  "client\src\components\dashboard\JobRoleSelector.jsx",

  # Analysis components
  "client\src\components\analysis\SkillList.jsx",
  "client\src\components\analysis\GapList.jsx",
  "client\src\components\analysis\AnalysisSummary.jsx",
  "client\src\components\analysis\SkillMatchBar.jsx",

  # Recommendation components
  "client\src\components\recommendation\RecommendationCard.jsx",
  "client\src\components\recommendation\LearningPath.jsx",
  "client\src\components\recommendation\ResourceLink.jsx",

  # UI primitives / Shadcn re-exports
  "client\src\components\ui\index.js",

  # Custom Hooks
  "client\src\hooks\useResumeUpload.js",
  "client\src\hooks\useAnalysis.js",
  "client\src\hooks\useRecommendations.js",
  "client\src\hooks\useAuth.js",
  "client\src\hooks\useLocalStorage.js",

  # Frontend Services (business orchestration)
  "client\src\services\resumeService.js",
  "client\src\services\analysisService.js",
  "client\src\services\recommendationService.js",
  "client\src\services\userService.js",

  # API layer (raw HTTP calls via Axios)
  "client\src\api\axiosInstance.js",
  "client\src\api\resume.api.js",
  "client\src\api\analysis.api.js",
  "client\src\api\recommendation.api.js",
  "client\src\api\user.api.js",

  # Utils
  "client\src\utils\formatters.js",
  "client\src\utils\validators.js",
  "client\src\utils\helpers.js",
  "client\src\utils\errorHandler.js",

  # Constants
  "client\src\constants\routes.js",
  "client\src\constants\api.js",
  "client\src\constants\appConfig.js",
  "client\src\constants\jobRoles.js",

  # Context / State
  "client\src\context\ResumeContext.jsx",
  "client\src\context\AuthContext.jsx",
  "client\src\context\AnalysisContext.jsx",
  "client\src\context\ThemeContext.jsx",

  # Routing
  "client\src\routes\AppRoutes.jsx",
  "client\src\routes\ProtectedRoute.jsx",

  # Styles
  "client\src\styles\globals.css",
  "client\src\styles\animations.css",
  "client\src\styles\variables.css",

  # Lib helpers
  "client\src\lib\utils.js",
  "client\src\lib\cn.js"
)
foreach ($f in $clientFiles) { Touch $f }

Write-Host "✔ Frontend scaffold complete."
Write-Host ""
Write-Host "✔ Proxima scaffold DONE. All folders and placeholder files created."
