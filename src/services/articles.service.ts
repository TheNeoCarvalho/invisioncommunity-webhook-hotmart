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

export { createUser };
