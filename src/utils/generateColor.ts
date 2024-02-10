const COLORS = [
  "#FFDAB9",
  "#B0E0E6",
  "#F08080",
  "#98FB98",
  "#FFB6C1",
  "#DA70D6",
  "#F4A460",
  "#90EE90",
  "#87CEFA",
  "#FFE4C4",
];

export const generateColor = (value: string) => {
  let sum = 0;
  for (let i = 0; i < value.length; i++) {
    sum += value.charCodeAt(i);
  }
  return COLORS[sum % 10];
};
