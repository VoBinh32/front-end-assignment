// Create or get user for accessing
export const doSomething = (body: any) => {
  return fetch("/api/endpoint", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(body),
  }).then((response) => response.json());
};

//Get Data
export const getDate = (startDate: Date, endDate: Date) => {
  return fetch(
    `https://api.giosg.com/api/reporting/v1/rooms/84e0fefa-5675-11e7-a349-00163efdd8db/chat-stats/daily/?start_date=${startDate}&end_date=${endDate}`,
    {
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
    }
  ).then((response) => response.json());
};
