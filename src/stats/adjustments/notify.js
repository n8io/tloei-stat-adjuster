import { getConfig } from 'config';
import got from 'got';
import { log } from 'utils/log';

const { NOTIFY, SLACK_WEBHOOK_URL } = getConfig();

// eslint-disable-next-line max-statements
const sendSlackMessage = async ({ text }) => {
  if (!SLACK_WEBHOOK_URL) {
    log(`⚠️ Not sending Slack messaage. SLACK_WEBHOOK_URL not set`);

    return;
  }

  try {
    const body = JSON.stringify({ text });

    log(`⬆️ Sending Slack message...`);

    const { body: responseBody } = await got.post(SLACK_WEBHOOK_URL, {
      body,
      headers: {
        'content-type': 'application/json',
      },
      returnType: 'json',
    });

    if (responseBody !== 'ok') {
      throw new Error('Failed to send slack message', responseBody);
    }

    log(`✔️ Successfully sent Slack message.`);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err);
  }
};

export const notify = async ({ url, weekId }) => {
  if (!NOTIFY) return;

  const slackMessage = `📊 <${url}|Week ${weekId} adjustments> have been "finalized".`;

  await sendSlackMessage({ text: slackMessage });
};
