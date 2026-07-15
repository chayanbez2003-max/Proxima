import api from "./axiosInstance.js";

export const saveCareerReportService = async ({
  analysisId,
  targetRole,
  reportData,
}) => {
  const response = await api.post("/career-reports", {
    analysisId,
    targetRole,
    reportData,
  });

  return response.data;
};

export const getUserCareerReportsService = async () => {
  const response = await api.get("/career-reports");
  return response.data;
};

export const getCareerReportByIdService = async (reportId) => {
  const response = await api.get(`/career-reports/${reportId}`);
  return response.data;
};

export const deleteCareerReportService = async (reportId) => {
  const response = await api.delete(`/career-reports/${reportId}`);
  return response.data;
};