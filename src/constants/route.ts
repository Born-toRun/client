export const apiRoutes = {
  feeds: {
    list: "/api/v1/feeds",
    detail: (feedId: number) => `/api/v1/feeds/${feedId}`,
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
