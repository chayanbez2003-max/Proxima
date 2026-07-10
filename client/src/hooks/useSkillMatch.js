import { useState, useEffect, useCallback } from "react";
import { getJobRolesService, matchSkillsService } from "../services/analysisService.js";

/**
 * useSkillMatch
 *
 * Manages the entire M3 career intelligence flow:
 *  - Fetching available job roles for the dropdown
 *  - Triggering the skill gap analysis
 *  - Exposing loading / result / error state
 *
 * @param {string|null} analysisId - The analysis ID from a completed upload
 */
const useSkillMatch = (analysisId) => {
  const [jobRoles,     setJobRoles]     = useState([]);
  const [selectedRole, setSelectedRole] = useState("");
  const [isMatching,   setIsMatching]   = useState(false);
  const [matchResult,  setMatchResult]  = useState(null);
  const [matchError,   setMatchError]   = useState(null);

  // Fetch job roles once on mount
  useEffect(() => {
    let cancelled = false;

    const loadRoles = async () => {
      try {
        const roles = await getJobRolesService();
        if (!cancelled) setJobRoles(roles);
      } catch {
        // Fail silently — roles not loading won't break the upload flow
      }
    };

    loadRoles();
    return () => { cancelled = true; };
  }, []);

  /**
   * handleMatch
   * Calls the Career Intelligence Engine and stores the result.
   */
  const handleMatch = useCallback(async () => {
    if (!analysisId) {
      setMatchError("Please upload and parse a resume first.");
      return;
    }
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

  /** Reset only the match state (not the upload result) */
  const resetMatch = useCallback(() => {
    setMatchResult(null);
    setMatchError(null);
    setSelectedRole("");
  }, []);

  return {
    jobRoles,
    selectedRole,
    setSelectedRole,
    isMatching,
    matchResult,
    matchError,
    handleMatch,
    resetMatch,
  };
};

export { useSkillMatch };
