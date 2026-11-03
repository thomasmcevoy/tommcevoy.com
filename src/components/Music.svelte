<script>
  import tracks from "../../data/tracks.js";

  export let albums = [...new Set(tracks.map((track) => track.album))];
  export let currentTrack = 0;
  export let currentTime = 0;
  export let duration = 0;
  export let paused = true;
  export let pristine = true;

  function format(time) {
    if (isNaN(time)) return "...";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
  }

  export function play(track) {
    if (pristine) pristine = false;
    if (!paused) paused = true;
    if (track !== undefined) currentTrack = track;
    setTimeout(() => (paused = false), 0);
  }

  export function previous() {
    if (!pristine) play(currentTrack === 0 ? 5 : currentTrack - 1);
  }

  export function next() {
    if (!pristine) play(currentTrack === 5 ? 0 : currentTrack + 1);
  }
</script>

<section id="music">
  <h2>MUSIC</h2>
  <div id="player" class:paused>
    <audio
      bind:paused
      bind:duration
      bind:currentTime
      preload="metadata"
      src={tracks[currentTrack].src}
      on:ended={() => next()}
    />
    <div id="playlist">
      {#each albums as album}
        <div class="album">
          <h3>{album.toUpperCase()}</h3>
          <div id="tracks-container">
            {#each tracks as track}
              {#if track.album === album}
                <button
                  class="track"
                  class:current={track.number === currentTrack && !pristine}
                  on:click={() => play(track.number)}
                >
                  {track.title.toUpperCase()}
                </button><span class="spacer">/</span>
              {/if}
            {/each}
          </div>
        </div>
      {/each}
    </div>
    <div id="controls">
      <button
        id="previous"
        class="controls__button controls__button--small"
        on:click={() => previous()}
      >
        <svg viewBox="0 0 213 132">
          <path
            fill="#414042"
            stroke="#bf9600"
            stroke-width="3.5"
            d="M108.418 66l99 61V5zM4 66l99.293 61V5zM108.418 66l99 61V5z"
          />
        </svg>
      </button>
      {#if paused}
        <button
          id="play"
          class="controls__button controls__button--large"
          on:click={() => play()}
        >
          <svg viewBox="0 0 105.469 131.621">
            <path
              fill="#414042"
              stroke="#bf9600"
              stroke-width="2.5"
              d="M1.25 2.255V129.37l101.858-63.49z"
            />
          </svg>
        </button>
      {:else}
        <button
          id="pause"
          class="controls__button controls__button--large"
          on:click={() => (paused = !paused)}
        >
          <svg viewBox="0 0 105.469 131.621">
            <path
              fill="#414042"
              stroke="#bf9600"
              stroke-width="2.5"
              d="M13.25 1.25h23.652V131.46H13.25zM68.132 1.25h23.652V131.46H68.132z"
            />
          </svg>
        </button>
      {/if}
      <button
        id="next"
        class="controls__button controls__button--small"
        on:click={() => next()}
      >
        <svg viewBox="0 0 213 132">
          <path
            fill="#414042"
            stroke="#bf9600"
            stroke-width="3.5"
            d="M4 5v122l99-61zM108.125 5v122l99.292-61zM4 5v122l99-61z"
          />
        </svg>
      </button>
    </div>
    <div id="progress">
      <div id="current-time">{pristine ? "" : format(currentTime)}</div>
      <div id="progress-bar">
        <div id="seek-bar" style="--progress: {currentTime / duration}%" />
      </div>
      <div id="duration">
        {pristine ? "" : duration ? format(duration) : "0:00"}
      </div>
    </div>
  </div>
</section>

<style>
  #music {
    background-color: #414042;
  }

  #music h2 {
    color: #d9d9d9;
  }

  #music h3 {
    color: #bf9600;
    margin: 2em 0 1.25em;
  }

  #player {
    font-size: 0.875em;
  }
  @media (min-width: 880px) {
    #player {
      font-size: 1.25em;
    }
  }

  .album {
    margin-bottom: 1.25em;
  }

  .album h3 {
    margin-bottom: 0.875em;
    color: #bf9600;
    font-size: inherit;
  }

   @media (max-width: 999px) {
    #tracks-container {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
  }

  .track {
    display: block;
    letter-spacing: 0.1875em;
    color: #d9d9d9;
    padding: 0.25em;
  }
  .spacer {
    display: none;
  }
  @media (min-width: 750px) {
    .track {
      padding: 0.375em;
    }
  }

  @media (min-width: 1000px) {
    .track {
      display: inline-block;
      padding: 0.375em 0.125em 0.375em 0;
    }
    .spacer {
      display: inline-block;
      color: #bf9600;
      padding: 0.375em 0.5em 0.375em 0.375em;
    }
    .spacer:last-of-type {
      display: none;
    }
  }

  .track:hover {
    color: #fff;
    cursor: pointer;
  }

  .track.current,
  .track.current:hover {
    color: #808184;
  }

  #controls {
    margin: 2.375em 0 0.625em;
  }
  @media (min-width: 750px) {
    #controls {
      margin: 2.75em 0 1.875em;
    }
  }

  button {
    margin: 0;
    padding: 0;
    font-size: 1em;
    background-color: #414042;
    border: none;
  }

  .controls__button {
    z-index: 2;
    display: inline-block;
    cursor: pointer;
    margin: 0 1em;
  }
  @media (min-width: 750px) {
    .controls__button {
      margin: 0 5.5%;
    }
  }

  .controls__button--large {
    height: 4em;
    width: 4em;
  }
  @media (min-width: 750px) {
    .controls__button--large {
      height: 5.1875em;
      width: 5.1875em;
    }
  }
  @media (min-width: 1300px) {
    .controls__button--large {
      height: 6em;
      width: 6em;
    }
  }

  .controls__button--small {
    position: relative;
    height: 2.5em;
    width: 4.1667em;
    bottom: 0.6667em;
  }
  @media (min-width: 750px) {
    .controls__button--small {
      height: 3.4583em;
      width: 5.7638em;
      bottom: 0.8646em;
    }
  }
  @media (min-width: 1300px) {
    .controls__button--small {
      height: 4em;
      width: 6.6667em;
      bottom: 1em;
    }
  }

  #progress {
    margin: auto;
    min-width: 315px;
    width: 55%;
  }
  @media (min-width: 750px) {
    #progress {
      width: 68%;
    }
  }
  @media (min-width: 880px) {
    #progress {
      width: 73%;
    }
  }
  @media (min-width: 1000px) {
    #progress {
      width: 82%;
    }
  }
  @media (min-width: 1200px) {
    #progress {
      width: 73%;
    }
  }

  #progress-bar {
    display: inline-block;
    margin: auto;
    width: 80%;
    width: calc(100% - 5.5em);
    height: 0.1em;
    background-color: #48484a;
  }

  #seek-bar {
    width: calc(100 * var(--progress));
    height: 100%;
    float: left;
    background-color: #777;
  }

  #current-time,
  #duration {
    display: inline-block;
    width: 3.125em;
    font: 0.625em var(--font-futura-book), var(--font-futura), "Futura Standard",
      "Trebuchet MS", sans-serif;;
    color: #d9d9d9;
    letter-spacing: 0.2em;
    position: relative;
    top: 0.25em;
  }

  #current-time {
    text-align: left;
  }

  #duration {
    text-align: right;
    left: 0.3333em;
  }
</style>
