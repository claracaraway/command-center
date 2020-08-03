async function getEvents(username) {
  const events = [];
  let page = 1;

  do {
    const url = `https://api.github.com/users/${username}/received_events?page=${page}`;
    var body = await fetch(url).then((res) => res.json());
    page++;
    events.push(...body);
  } while (!body.length);

  return events;
}

(async () => {
  const usernames = [
    "yesthisiskendra",
    "aaroncaraway",
    "claracaraway",
    "danielcaraway",
  ];
  for (let username of usernames) {
    const events = await getEvents(username);
    const pushEvents = events.filter((event) => {
      return event.type === "PushEvent";
    });
    console.log(username, pushEvents[0].created_at);
  }
})();

// const myEvents = getEvents("yesthisiskendra");
