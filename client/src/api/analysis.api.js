import axiosInstance from "./axiosInstance.js";

/**
 * uploadResumeApi
 *
 * Raw HTTP call — sends a multipart/form-data POST to the backend.
 * Returns the raw Axios response; the service layer extracts .data.
 *
 * @param {File}     file          - The PDF File object from the input / dropzone
 * @param {string}   [selectedRole] - Optional job role string selected by the user
 * @param {Function} [onProgress]  - Optional upload progress callback (0–100)
 * @returns {Promise<import("axios").AxiosResponse>}
 */
const uploadResumeApi = (file, selectedRole = null, onProgress = null) => {
  const formData = new FormData();
  formData.append("resume", file);

  if (selectedRole) {
    formData.append("selectedRole", selectedRole);
  }

  return axiosInstance.post("/analysis/resume", formData, {
    headers: { "Content-Type": "multipart/form-data" },
    onUploadProgress: onProgress
      ? (progressEvent) => {
          const percent = Math.round(
            (progressEvent.loaded * 100) / (progressEvent.total || 1)
          );
          onProgress(percent);
        }
      : undefined,
  });
};

/**
 * getAnalysisApi
 *
 * Fetch a single analysis by ID.
 * [ Placeholder — used fully in Milestone 2+ ]
 *
 * @param {string} analysisId
 */
const getAnalysisApi = (analysisId) =>
  axiosInstance.get(`/analysis/${analysisId}`);

/**
 * getJobRolesApi
 * Fetches all available job roles for the dropdown.
 */
const getJobRolesApi = () => axiosInstance.get("/job-roles");

/**
 * matchSkillsApi
 * POST /api/analysis/match
 * Runs the Career Intelligence Engine.
 *
 * @param {string} analysisId
 * @param {string} selectedRole
 */
const matchSkillsApi = (analysisId, selectedRole) =>
  axiosInstance.post("/analysis/match", { analysisId, selectedRole });

export { uploadResumeApi, getAnalysisApi, getJobRolesApi, matchSkillsApi };

export const deleteAnalysisService = async (analysisId) => {
  const response = await axiosInstance.delete(`/analysis/${analysisId}`);
  return response.data;
};