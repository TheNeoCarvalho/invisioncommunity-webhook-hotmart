import { Request } from "express";

import { Article } from "../../types/articles";
import { ServiceAPIResponse } from "../../types/service-response";

const createUser = async (): Promise<ServiceAPIResponse<Article[]>> => {
  /* fetch data here */
  return {
    statusCode: 200,
    body: [
      {
        title: "Article title",
      },
    ],
  };
};

const getAll = async (): Promise<ServiceAPIResponse<Article[]>> => {
  /* fetch data here */
  return {
    statusCode: 200,
    body: [
      {
        title: "Article title",
      },
    ],
  };
};

const getById = async (req: Request): Promise<ServiceAPIResponse<Article>> => {
  /* fetch data here */
  /* id: req.params?.id */
  return {
    statusCode: 200,
    body: {
      title: `Article title ${req.params?.id}`,
    },
  };
};

export { createUser, getAll, getById };
