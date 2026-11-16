<script>
  import calendars from "../assets/calendar.js";
</script>

<section id="shows">
  <h2>SHOWS</h2>
  <div id="calendar">
  {#each calendars as calendar}
  <div class="calendar-month">
  <h4>{calendar.month} {calendar.year}</h4>

  <div
    class="container"
    class:has-orphan={calendar.shows.length % 3 !== 0}
  >
    <ol>
      {#each calendar.shows as show}
        <li class="show">
          <div class="day">{show.day}</div>

          <div class="details">
            {#if !show.url}
              <div class="venue">{show.venue.toUpperCase()}</div>
            {:else}
              <a href={show.url} class="venue">
                {show.venue.toUpperCase()}
              </a>
            {/if}

            <div>{show.band.toUpperCase()}</div>
            <div>{show.time.toUpperCase()}</div>
          </div>
        </li>
      {/each}
    </ol>
  </div>
  </div>
{/each}
</div>
</section>

<style>
  #shows {
    text-align: center;
  }

  #shows h4 {
    margin: 0 0 0.875em;
  }
  @media (max-width: 879px) {
    #shows h4 {
      font-size: 2.25em;
    }
  }
  @media (max-width: 599px) {
    #shows h4 {
      font-size: 1.5625em;
    }
  }

  #calendar {
    margin: auto;
    text-align: center;
    max-width: 19em;
  }
  @media (min-width: 600px) {
    #calendar {
      max-width: 34em;
    }
  }
  @media (min-width: 880px) {
    #calendar {
      max-width: 51em;
    }
  }

  .container {
    text-align: left;
  }

  .show {
    display: inline-block;
    width: 16.5em;
    height: 15.375em;
    padding: 1.75em 0.5em;
    vertical-align: top;
    border-right: 0.15em solid #d6a929;
    text-align: center;
  }
  @media (max-width: 599px) {
    .show {
      font-size: 0.55rem;
    }
    .show:nth-of-type(2n) {
      border-right: none;
    }
    .show:nth-of-type(n + 3) {
      border-top: 0.15em solid #d6a929;
    }
  }
  @media (min-width: 600px) {
    .show {
      padding: 2.5em 0.5em;
    }
    .show:nth-of-type(3n) {
      border-right: none;
    }
    .show:nth-of-type(n + 4) {
      border-top: 0.15em solid #d6a929;
    }
  }
  @media (min-width: 600px) and (max-width: 879px) {
    .show {
      font-size: 0.675rem;
    }
  }
  @media (min-width: 880px) {
    .show {
      padding: 2em 0.5em;
    }
  }


.calendar-month {
  margin-bottom: 6vw;
}
  
  


/****** UNDERLINE FIX ******/

.container.has-orphan {
  position: relative;
}
.container.has-orphan::before {
    content: "";
    position: absolute;
    background-color: #d6a929;
  }

/* Desktop: 3 columns */
@media (min-width: 880px) {
  .container.has-orphan::before {
    left: 33em;
    bottom: 15.25em;
    height: 0.14em;
    width: 16.5em;
  }
}

/* Tablet: 600px–879px */
@media (min-width: 600px) and (max-width: 879px) {
  .container.has-orphan::before {
    left: 22.175em;
    bottom: 10.285em;
    height: 0.095em;
    width: 11.1em;
  }
}

/* Mobile: 2 columns */
@media (max-width: 599px) {
  .show.mobile-underline-fix {
    position: relative;
  }

  .show.mobile-underline-fix::after {
    content: "";
    position: absolute;
    bottom: -0.14em;
    left: 0;
    width: 100%;
    height: 0.14em;
    background-color: #d6a929;
  }
}

/* 8 shows */




  .day {
    font: 100 7em/0.9 var(--font-futura-light), var(--font-futura-book), var(--font-futura), "Futura Standard",
      "Trebuchet MS", sans-serif;
  }
  @media (min-width: 880px) {
    .day {
      font-size: 8em;
    }
  }

  .details {
    display: table-cell;
    vertical-align: middle;
    width: 25em;
    height: 7em;
    font-size: 0.75em;
    line-height: 1.5;
    letter-spacing: 0.1em;
  }
  .details a {
    display: inline-block;
  }

  .venue {
    display: block;
    padding: 0 3%;
    font: 1.7em/1.3 var(--font-futura-book);
    color: #d6a929;
  }
</style>
