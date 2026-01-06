export const apiRoutes = {
  feeds: {
    list: "/api/v1/feeds",
    my: "/api/v1/feeds/my",
    detail: (feedId: number) => `/api/v1/feeds/${feedId}`,
    update: (feedId: number) => `/api/v1/feeds/${feedId}`,
    delete: (feedId: number) => `/api/v1/feeds/${feedId}`,
  },
  search: {
    history: "/api/v1/recent-search-keywords",
    register: (keyword: string) => `/api/v1/recent-search-keywords/${keyword}`,
    delete: (keyword: string) => `/api/v1/recent-search-keywords/${keyword}`,
    deleteAll: "/api/v1/recent-search-keywords",
  },
  comments: {
    list: (feedId: number) => `/api/v1/comments/${feedId}`,
    create: (feedId: number) => `/api/v1/comments/${feedId}`,
    detail: (commentId: number) => `/api/v1/comments/detail/${commentId}`,
    delete: (commentId: number) => `/api/v1/comments/${commentId}`,
    update: (commentId: number) => `/api/v1/comments/${commentId}`,
    count: (feedId: number) => `/api/v1/comments/qty/${feedId}`,
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
    my: "/api/v1/crews/my",
    detail: (crewId: number) => `/api/v1/crews/${crewId}`,
    members: (crewId: number) => `/api/v1/crews/${crewId}/members`,
    kickMember: (crewId: number, userId: number) => `/api/v1/crews/${crewId}/members/${userId}`,
    update: (crewId: number) => `/api/v1/crews/${crewId}`,
    rankings: "/api/v1/crews/rankings",
    memberRankings: "/api/v1/crews/member-rankings",
  },
  users: {
    refresh: "/api/v1/users/refresh",
  },
  marathons: {
    list: "/api/v1/marathons",
    detail: (marathonId: number) => `/api/v1/marathons/${marathonId}`,
    bookmark: (marathonId: number) => `/api/v1/marathons/bookmark/${marathonId}`,
  },
  activities: {
    list: "/api/v1/activities",
    crew: (crewId: number) => `/api/v1/activities/crew/${crewId}`,
    detail: (activityId: number) => `/api/v1/activities/${activityId}`,
    participants: (activityId: number) =>
      `/api/v1/activities/participation/${activityId}`,
    join: (activityId: number) =>
      `/api/v1/activities/participation/${activityId}`,
    cancel: (activityId: number) =>
      `/api/v1/activities/participation-cancel/${activityId}`,
    delete: (activityId: number) => `/api/v1/activities/${activityId}`,
    open: (activityId: number) => `/api/v1/activities/open/${activityId}`,
    attendance: (activityId: number) => `/api/v1/activities/attendance/${activityId}`,
    myParticipations: "/api/v1/activities/participation/my",
    availableForAttendance: "/api/v1/activities/participation/my/available-for-attendance",
  },
  feedbacks: {
    create: "/api/v1/feedbacks",
  },
};

export const pageRoutes = {
  feeds: {
    list: "/",
    write: "/write",
    detail: (feedId: number) => `/feeds/${feedId}`,
    edit: (feedId: number) => `/feeds/${feedId}/edit`,
    commentDetail: (feedId: number, commentId: number) =>
      `/feeds/${feedId}/comments/${commentId}`,
  },
  running: {
    list: "/running",
    marathons: {
      detail: (marathonId: number) => `/running/marathons/${marathonId}`,
    },
    activities: {
      list: "/running/activities",
      new: "/running/activities/new",
      detail: (activityId: number) => `/running/activities/${activityId}`,
      edit: (activityId: number) => `/running/activities/${activityId}/edit`,
      attendance: (activityId: number) => `/running/activities/${activityId}/attendance`,
    },
  },
  crews: {
    list: "/crew",
    detail: (crewId: number) => `/crew/${crewId}`,
    settings: (crewId: number) => `/crew/${crewId}/settings`,
  },
  myPage: {
    main: "/my-page",
    profile: "/my-page/profile",
    notifications: "/my-page/notifications",
    participationHistory: "/my-page/participation-history",
    feeds: "/my-page/feeds",
    ranking: "/my-page/ranking",
    contact: "/my-page/contact",
    crew: "/my-page/crew",
  },
  auth: {
    login: "/oauth2/authorization",
    signup: "/signup",
  },
};
