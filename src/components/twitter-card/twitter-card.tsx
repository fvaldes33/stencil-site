import { Component, Prop, h } from '@stencil/core';

@Component({
  tag: 'twitter-card',
  styleUrl: 'twitter-card.css'
})
export class TwitterCard {

  @Prop() tweet: any;

  render() {
    const { tweet } = this;
    const { user } = tweet;
    const tweetUrl = `https://twitter.com/${user.screen_name}/status/${tweet.id_str}?s=20`;

    return (
      <article class="twitter-card">
        <header class="twitter-card-header">
          <div class="twitter-card-avatar">
            <img src={user.profile_image_url_https} />
          </div>
          <div class="twitter-card-handle">
            <h1>{user.name}</h1>
            <p>@{user.screen_name}</p>
          </div>
          <div class="twitter-card-link">
            <a rel="noopener" target="_blank" href={tweetUrl} aria-label="Twitter">
              <app-icon name="twitter"></app-icon>
            </a>
          </div>
        </header>
        <p class="twitter-card-content" innerHTML={`<a rel="noopener" target="_blank" href="${tweetUrl}">${tweet.text}</a>`}></p>
        <footer class="twitter-card-footer">
          <ul class="twitter-card-icons">
            <li>
              <a rel="noopener" target="_blank" href={tweetUrl} aria-label="Twitter">
                <svg width="16" height="16" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M352.92 80C288 80 256 144 256 144C256 144 224 80 159.08 80C106.32 80 64.54 124.14 64 176.81C62.9 286.14 150.73 363.89 247 429.23C249.654 431.036 252.79 432.001 256 432.001C259.21 432.001 262.346 431.036 265 429.23C361.26 363.89 449.09 286.14 448 176.81C447.46 124.14 405.68 80 352.92 80Z"
                    stroke-width="32" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
                <span>{tweet.favorite_count}</span>
              </a>
            </li>
            <li>
              <a rel="noopener" target="_blank" href={tweetUrl} aria-label="Twitter">
                <time class="twitter-card-time">
                  {(new Date(tweet.created_at)).toLocaleTimeString('default', { hour: 'numeric', minute: 'numeric' })} - {(new Date(tweet.created_at)).toLocaleDateString('default', { month: 'long', day: 'numeric', year: 'numeric' })}
                </time>
              </a>
            </li>
            <li>
              <a rel="noopener" target="_blank" href={tweetUrl} aria-label="Twitter">
                <svg width="16" height="16" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M248 64C146.39 64 64 146.39 64 248C64 349.61 146.39 432 248 432C349.61 432 432 349.61 432 248C432 146.39 349.61 64 248 64Z" stroke-width="32" stroke-miterlimit="10" />
                  <path d="M220 220H252V336" stroke-width="32" stroke-linecap="round" stroke-linejoin="round" />
                  <path d="M208 340H296" stroke-width="32" stroke-miterlimit="10" stroke-linecap="round" />
                  <path d="M248 130C242.858 130 237.831 131.525 233.555 134.382C229.28 137.239 225.947 141.299 223.979 146.05C222.011 150.801 221.496 156.029 222.5 161.072C223.503 166.116 225.979 170.749 229.615 174.385C233.251 178.021 237.884 180.497 242.928 181.5C247.971 182.504 253.199 181.989 257.95 180.021C262.701 178.053 266.761 174.721 269.618 170.445C272.475 166.169 274 161.142 274 156C274 149.104 271.261 142.491 266.385 137.615C261.509 132.739 254.896 130 248 130V130Z" fill="black" />
                </svg>
              </a>
            </li>
          </ul>
        </footer>
      </article>
    );
  }
}
