const { getLatestGitCommitHash } = require('../../config/utils');

const getBuildInfo = () => {
  //const latestGitCommitHash = getLatestGitCommitHash('long'); TODO
  const latestGitCommitHash = '9999';
  const now = new Date();
  const timeZone = 'UTC';
  const buildTime = new Intl.DateTimeFormat('en-US', {
    dateStyle: 'full',
    timeStyle: 'short',
    timeZone,
  }).format(now);
  return {
    // Can't use timeZoneName option together with dateStyle, so interpolate manually
    time: {
      year: now.getFullYear(),
      raw: now.toISOString(),
      formatted: `${buildTime} ${timeZone}`,
    },
    hash: latestGitCommitHash,
  };
};

module.exports = getBuildInfo;
