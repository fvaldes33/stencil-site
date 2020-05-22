import { NowRequest, NowResponse } from '@now/node'
import base64 from 'base-64';
import fetch from 'node-fetch';
import dotenv from 'dotenv';

dotenv.config();

const TWITTER_API_KEY = process.env.TWITTER_API_KEY;
const TWITTER_SECRET_KEY = process.env.TWITTER_SECRET_KEY;

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

export default async (_: NowRequest, response: NowResponse) => {
  // fetch token
  const token = await getTwitterToken();

  // fetch feed
  const feed = await getTwitterFeed(token);

  // return json
  response.status(200).json(feed);
}
