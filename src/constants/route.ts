export const apiRoutes = {
  feeds: {
    list: "/api/v1/feeds",
  },
  auth: {
    withdraw: "/api/v1/users",
  },
  crews: {
    list: "/api/v1/crews",
  },
};

export const pageRoutes = {
  feeds: {
    list: "/",
    write: "/write",
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
