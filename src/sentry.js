
const checkInId = Sentry.captureCheckIn(
  {
    monitorSlug: '<monitor-slug>',
    status: 'in_progress',
  },
  {
    schedule: { // Specify your schedule options here
      type: 'crontab',
      value: '* * * * *',
    },
    checkinMargin: 1,
    maxRuntime: 1,
    timezone: 'America/Los_Angeles',
  });

Sentry.captureCheckIn({
    checkInId,
    monitorSlug: '<monitor-slug>',
    status: 'ok',
  });
  