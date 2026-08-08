export const state = {
  currentTab: 'stopwatch',

  stopwatch: {
    running: false,
    startTime: 0,
    elapsed: 0,
    intervalId: null,
  },
};
