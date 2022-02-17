require("dotenv").config();
const axios = require('axios');
const apiKey = process.env.SERP_API_KEY;


//function which counts the occurence of a specific word in a string in all combinations of upper and lower case letters;
const countOccurence = function(str, word) {
  let input = '';
  for (const char of word) {
    input += `[${char.toUpperCase()}${char.toLowerCase()}]`;
  }
  let regex = new RegExp(input, "g");
  return (str.match(regex) || []).length;
};

//this function takes in a queryString and uses a search api to return the most likely category it fells into given predefined keywords
const sortCategories = function(query) {

  const tally = {
    countWatch: {
      categoryId: 1,
      keywords: ["watch", "stream", "theatre", 'binge', 'channel', 'tv','imdb', 'rotten tomato','movie'],
      sum: function(callback, str) {
        let total = 0;
        for (const verb of this.keywords) {
          total += callback(str, verb);
        }
        return total;
      }
    },
    countRead: {
      categoryId: 2,
      keywords: ["read", "book", "author", 'story', 'goodreads','epub', 'fiction', 'literature'],
      sum: function(callback, str) {
        let total = 0;
        for (const verb of this.keywords) {
          total += callback(str, verb);
        }
        return total;
      }
    },
    countBuy: {
      categoryId: 3,
      keywords: ["buy", "purchase", "shop", 'commerce'],
      sum: function(callback, str) {
        let total = 0;
        for (const verb of this.keywords) {
          total += callback(str, verb);
        }
        return total;
      }
    },
    countEat: {
      categoryId: 4,
      keywords: ["eat", "drink", "food", 'restaurant', 'meal', 'snack'],
      sum: function(callback, str) {
        let total = 0;
        for (const verb of this.keywords) {
          total += callback(str, verb);
        }
        return total;
      }
    }
  };

  let mostOccurences = {
    categoryId: 0,
    max: 0
  };

  let apiURL = `https://serpapi.com/search.json?engine=google&q=${query}&api_key=${apiKey}`;

  const testAPI = 'https://api.coingecko.com/api/v3/exchange_rates'
  return axios.get(apiURL)
    .then(function(response) {
      const googleResponse = JSON.stringify(response.data);
      for (let key in tally) {
        let total = tally[key].sum(countOccurence, googleResponse);
        if (total > mostOccurences.max) {
          mostOccurences.max = total;
          mostOccurences.categoryId = tally[key].categoryId;
        }
        // console.log(tally[key].sum(countOccurence, googleResponse));
      }
      // console.log(mostOccurences.categoryId);
      return mostOccurences.categoryId;
    })
    .catch(function(error) {
      console.log(error);
    });
};


module.exports = {
  sortCategories,
};
