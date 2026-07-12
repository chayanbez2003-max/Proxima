import api from "./axiosInstance.js";

export const getLearningProgressService = async (reportId) => {
  const response = await api.get(`/learning-progress/${reportId}`);
  return response.data;
};

export const updateLearningSkillStatusService = async ({
  reportId,
  skill,
  status,
}) => {
  const response = await api.patch(`/learning-progress/${reportId}/skills`, {
    skill,
    status,
  });

  return response.data;
};