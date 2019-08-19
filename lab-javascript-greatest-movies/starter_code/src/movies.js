/* eslint no-restricted-globals: 'off' */

// Iteration 1: All rates average - Get the average of all rates with 2 decimals

function ratesAverage(movies) {
  if (!movies.length) return 0;

  const ratesSum = movies.reduce(function(accumulator, value) {
    // if (!value.rate) return accumulator;
    let rate = Number(value.rate);
    if (!rate) rate = 0;

    return accumulator + rate;
  }, 0);

  const average = ratesSum / movies.length;

  const averageStrWith2Digits = average.toFixed(2);

  const averageFloat = parseFloat(averageStrWith2Digits);

  return averageFloat;
}

// Iteration 2: Drama movies - Get the average of Drama Movies

function filterDrama(movies) {
  const dramaMovies = movies.filter(function(movie) {
    if (movie.genre.includes("Drama")) return true;
    // return movie.genre.includes("Drama");
    // return movie.genre.indexOf("Drama") !== -1;
  });

  return dramaMovies;
}

function dramaMoviesRate(movies) {
  const dramaMovies = filterDrama(movies);

  const avg = ratesAverage(dramaMovies);
  return avg;
}

// Iteration 3: Ordering by duration - Order by time duration, ascending (in growing order)

function orderByDuration(movies) {
  const sorted = movies.slice().sort(function(a, b) {
    if (a.duration === b.duration) {
      return a.title.localeCompare(b.title);
    } else {
      return a.duration - b.duration;
    }
  });

  return sorted;
}

// Iteration 4: Steven Spielberg. The best? - How many movies did STEVEN SPIELBERG direct

function howManyMovies(movies) {
  /*
  const dramaMovies = filterDrama(movies);

  const stevenDramaMovies = dramaMovies.filter(function(movie) {
    if (movie.director === "Steven Spielberg") return true;
  });

  return stevenDramaMovies.length;
  */

  const stevenDramaMovies = movies.filter(function(movie) {
    if (movie.director === "Steven Spielberg" && movie.genre.includes("Drama"))
      return true;
  });

  return stevenDramaMovies.length;
}

// Iteration 5: Alphabetic Order - Order by title and print the first 20 titles

function orderAlphabetically(movies) {
  /*
  const titles = movies
    .slice()
    .sort(function(a, b) {
      return a.title.localeCompare(b.title);
    })
    .slice(0, 20)
    .map(function(movie) {
      return movie.title;
    });

  return titles;
  */

  const titles = movies.map(function(movie) {
    return movie.title;
  });

  const sorted = titles.sort(function(a, b) {
    return a.localeCompare(b);
  });

  const sliced = sorted.slice(0, 20);

  return sliced;
}

// Iteration 6: Time Format - Turn duration of the movies from hours to minutes
/*
function convertHours(duration) {
  let totalTime = 0;

  if (duration.includes("h")) {
    totalTime += Number(duration.slice(0, duration.indexOf("h"))) * 60;
  }
  if (duration.includes("min")) {
    totalTime += Number(
      duration.slice(duration.indexOf(" ") + 1, duration.indexOf("m"))
    );
  }

  return totalTime;
}
*/

function convertHours(duration) {
  let totalTime = 0;
  let hours = 0;
  let minutes = 0;

  const time = duration.split(" ");

  if (time.length >= 2) {
    hours = parseInt(time[0]);
    minutes = parseInt(time[1]);
  } else {
    // if (time[0].indexOf("min") !== -1) {
    if (time[0].includes("min")) {
      minutes = parseInt(time[0]);
      // } else if (time[0].indexOf("h") !== -1) {
    } else if (time[0].includes("h")) {
      hours = parseInt(time[0]);
    }
  }

  totalTime = hours * 60 + minutes;
  return totalTime;
}

function turnHoursToMinutes(movies) {
  const newMovies = movies.map(function(movie) {
    const newMovie = { ...movie };

    newMovie.duration = convertHours(movie.duration);

    return newMovie;
  });

  return newMovies;
}

// BONUS Iteration: Best yearly rate average - Best yearly rate average
