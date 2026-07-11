import { PutObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";
import { s3Client, S3_BUCKET_NAME } from "../config/s3.js";

const streamToString = async (stream) => {
  const chunks = [];

  for await (const chunk of stream) {
    chunks.push(chunk);
  }

  return Buffer.concat(chunks).toString("utf-8");
};

export const uploadCareerReportToS3 = async ({ userId, reportId, reportData }) => {
  if (!S3_BUCKET_NAME) {
    throw new Error("AWS_S3_BUCKET_NAME is missing in environment variables");
  }

  const key = `career-reports/${userId}/${reportId}.json`;

  const command = new PutObjectCommand({
    Bucket: S3_BUCKET_NAME,
    Key: key,
    Body: JSON.stringify(reportData, null, 2),
    ContentType: "application/json",
  });

  await s3Client.send(command);

  return {
    bucket: S3_BUCKET_NAME,
    key,
  };
};

export const getCareerReportFromS3 = async (key) => {
  if (!S3_BUCKET_NAME) {
    throw new Error("AWS_S3_BUCKET_NAME is missing in environment variables");
  }

  const command = new GetObjectCommand({
    Bucket: S3_BUCKET_NAME,
    Key: key,
  });

  const response = await s3Client.send(command);
  const body = await streamToString(response.Body);

  return JSON.parse(body);
};