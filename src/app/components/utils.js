import { shuffle } from 'lodash';

export const selectRandomCelebrities = (celebrities, count) => {
  return shuffle(celebrities).slice(0, count);
};

export const getHighestStrengthImage = (images) => {
  return images.reduce((prev, curr) => {
    if (!prev.strength) return curr;
    if (!curr.strength) return prev;
    if (curr.strength > prev.strength) return curr;
    if (curr.strength === prev.strength && curr.effect === 'pixel') return curr;
    return prev;
  });
};