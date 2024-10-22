const createCustomButtons = (calendarRef) => {
  return {
    customBack: {
      text: "Back",
      click: () => {
        const calendarApi = calendarRef.current.getApi();
        calendarApi.prev();
      },
    },
    customNext: {
      text: "Next",
      click: () => {
        const calendarApi = calendarRef.current.getApi();
        calendarApi.next();
      },
    },
    customToday: {
      text: "Today",
      click: () => {
        const calendarApi = calendarRef.current.getApi();
        calendarApi.today();
      },
    },
  };
};

export default createCustomButtons;
