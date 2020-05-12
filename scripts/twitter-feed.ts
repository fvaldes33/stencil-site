import base64 from 'base-64';
import fetch from 'node-fetch';
import dotenv from 'dotenv';
import path from 'path';
import { writeFile } from 'fs-extra';

dotenv.config();

const TWITTER_API_KEY = process.env.TWITTER_API_KEY;
const TWITTER_SECRET_KEY = process.env.TWITTER_SECRET_KEY;
const DESTINATION_DIR = './src/assets';

function createAuthToken() {
  return base64.encode(`${TWITTER_API_KEY}:${TWITTER_SECRET_KEY}`);
}

async function getTwitterToken() {
  try {
    const res = await fetch('https://api.twitter.com/oauth2/token', {
      method: 'post',
      headers: {
        Authorization: `Basic ${createAuthToken()}`,
        'content-type': 'application/x-www-form-urlencoded'
      },
      body: "grant_type=client_credentials"
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.log('error', error)
  }
}

async function getTwitterFeed(token: { token_type: string, access_token: string }) {
  try {
    const res = await fetch('https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name=stenciljs&count=10', {
      method: "GET",
      headers: {
        authorization: `${token.token_type} ${token.access_token}`
      }
    });
    const data = await res.json();
    return data;
  } catch (error) {

  }
}

(async function () {
  if (!TWITTER_API_KEY || !TWITTER_SECRET_KEY) {
    return;
  }

  const destinationFileName = path.join(
    DESTINATION_DIR,
    'twitter-feed.json'
  );

  // fetch token
  const token = await getTwitterToken();

  // fetch feed
  const feed = await getTwitterFeed(token);

  // write to file
  await writeFile(destinationFileName, JSON.stringify(feed), {
    encoding: 'utf8'
  });
})();
