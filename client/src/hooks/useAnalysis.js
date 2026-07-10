import { useState, useEffect, useCallback } from "react";
import { useLocation } from "react-router-dom";
import {
  getAnalysisService,
  getJobRolesService,
  matchSkillsService,
} from "../services/analysisService.js";

/**
 * useAnalysis
 *
 * Manages all state for the AnalysisPage (/analysis/:id).
 *
 * Hydration strategy:
 *  1. If router `location.state.parsedData` exists (coming straight from Upload),
 *     use it immediately — no API round-trip needed.
 *  2. Otherwise (direct URL, page refresh, shared link), fetch from GET /api/analysis/:id.
 *
 * @param {string} analysisId - MongoDB ObjectId from useParams()
 */
const useAnalysis = (analysisId) => {
  const location   = useLocation();
  const passedData = location.state?.parsedData ?? null;

  // ── Resume / parse data ────────────────────────────────────────────────────
  const [parsedData, setParsedData] = useState(passedData);
  const [isFetching, setIsFetching] = useState(!passedData);
  const [fetchError, setFetchError] = useState(null);

  // ── Job roles dropdown ──────────────────────────────────────────────────────
  const [jobRoles,    setJobRoles]    = useState([]);
  const [rolesError,  setRolesError]  = useState(null);
  const [isFetchingRoles, setIsFetchingRoles] = useState(false);

  // ── Skill match state ───────────────────────────────────────────────────────
  const [selectedRole, setSelectedRole] = useState("");
  const [isMatching,   setIsMatching]   = useState(false);
  const [matchResult,  setMatchResult]  = useState(null);
  const [matchError,   setMatchError]   = useState(null);

  // ── Effect 1: Hydrate parsedData ────────────────────────────────────────────
  useEffect(() => {
    // Already have data from router state — nothing to fetch.
    if (passedData) {
      setIsFetching(false);
      return;
    }

    let cancelled = false;

    const load = async () => {
      setIsFetching(true);
      setFetchError(null);

      try {
        const data = await getAnalysisService(analysisId);

        if (!cancelled) {
          setParsedData(data);

          // If this analysis was previously matched, restore the match result
          // so the page feels stateful even after a refresh.
          if (data.matchPercentage !== null && data.selectedRole) {
            const matched = Object.values(data.matchedSkills ?? {}).flat();
            const missing = Object.values(data.missingSkills ?? {}).flat();

            setMatchResult({
              selectedRole:    data.selectedRole,
              matchPercentage: data.matchPercentage,
              matchedSkills:   data.matchedSkills ?? {},
              missingSkills:   data.missingSkills ?? {},
              extraSkills:     data.extraSkills   ?? {},
              totalMatched:    matched.length,
              totalMissing:    missing.length,
              totalRequired:   matched.length + missing.length,
            });
            setSelectedRole(data.selectedRole);
          }
        }
      } catch (err) {
        if (!cancelled) {
          setFetchError(err.message || "Failed to load analysis. Please try again.");
        }
      } finally {
        if (!cancelled) setIsFetching(false);
      }
    };

    load();
    return () => { cancelled = true; };
  }, [analysisId, passedData]);

  // ── Effect 2: Load job roles for the dropdown ───────────────────────────────
  //
  // Previously this catch block was empty (`catch { /* fail silently */ }`).
  // That caused the RoleSelector to never render when the fetch failed,
  // with no visible error for the user. Now we surface the error properly.
  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      setIsFetchingRoles(true);
      setRolesError(null);

      try {
        const roles = await getJobRolesService();

        if (!cancelled) {
          if (!Array.isArray(roles) || roles.length === 0) {
            // API returned an empty list — treat as an error so the UI explains it.
            setRolesError("No job roles found. The database may not be seeded yet.");
          } else {
            setJobRoles(roles);
          }
        }
      } catch (err) {
        if (!cancelled) {
          setRolesError(
            err.message || "Could not load job roles. Check your server connection."
          );
        }
      } finally {
        if (!cancelled) setIsFetchingRoles(false);
      }
    };

    load();
    return () => { cancelled = true; };
  }, []); // runs once on mount

  // ── Effect 3: Run skill gap analysis ───────────────────────────────────────
  const handleMatch = useCallback(async () => {
    if (!selectedRole) {
      setMatchError("Please select a target job role.");
      return;
    }

    setIsMatching(true);
    setMatchError(null);
    setMatchResult(null);

    try {
      const data = await matchSkillsService(analysisId, selectedRole);
      setMatchResult(data);
    } catch (err) {
      setMatchError(err.message || "Skill gap analysis failed. Please try again.");
    } finally {
      setIsMatching(false);
    }
  }, [analysisId, selectedRole]);

  const resetMatch = useCallback(() => {
    setMatchResult(null);
    setMatchError(null);
    // Do NOT reset selectedRole — user should be able to re-run without
    // having to re-select the same role.
  }, []);

  const retryRoles = useCallback(() => {
    setJobRoles([]);
    setRolesError(null);
    setIsFetchingRoles(true);

    getJobRolesService()
      .then((roles) => {
        if (!Array.isArray(roles) || roles.length === 0) {
          setRolesError("No job roles found. The database may not be seeded yet.");
        } else {
          setJobRoles(roles);
        }
      })
      .catch((err) => {
        setRolesError(err.message || "Could not load job roles. Check your server connection.");
      })
      .finally(() => setIsFetchingRoles(false));
  }, []);

  return {
    // Resume data
    parsedData,
    isFetching,
    fetchError,
    // Job roles
    jobRoles,
    rolesError,
    isFetchingRoles,
    retryRoles,
    // Role selection + matching
    selectedRole,
    setSelectedRole,
    isMatching,
    matchResult,
    matchError,
    handleMatch,
    resetMatch,
  };
};

export { useAnalysis };
