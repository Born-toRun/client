export const apiRoutes = {
  feeds: {
    list: "/api/v1/feeds",
    detail: (feedId: number) => `/api/v1/feeds/${feedId}`,
    update: (feedId: number) => `/api/v1/feeds/${feedId}`,
    delete: (feedId: number) => `/api/v1/feeds/${feedId}`,
  },
  comments: {
    list: (feedId: number) => `/api/v1/comments/${feedId}`,
    create: (feedId: number) => `/api/v1/comments/${feedId}`,
  },
  recommendations: {
    create: (recommendationType: string, contentId: number) =>
      `/api/v1/recommendations/${recommendationType}/${contentId}`,
    delete: (recommendationType: string, contentId: number) =>
      `/api/v1/recommendations/${recommendationType}/${contentId}`,
  },
  auth: {
    withdraw: "/api/v1/users",
    signup: "/api/v1/users/sign-up",
  },
  crews: {
    list: "/api/v1/crews",
  },
};

export const pageRoutes = {
  feeds: {
    list: "/",
    write: "/write",
    detail: (feedId: number) => `/feeds/${feedId}`,
  },
  running: {
    list: "/running",
  },
  crews: {
    list: "/crew",
  },
  myPage: "/my-page",
  auth: {
    login: "/oauth2/authorization",
    signup: "/signup",
  },
};
