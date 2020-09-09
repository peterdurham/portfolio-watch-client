export const shortenName = (name) => {
  const splitName = name.split("");

  if (splitName.length > 24) {
    const shortenedArr = splitName.slice(0, 24);
    const shortenedStr = shortenedArr.join("");
    return shortenedStr + "...";
  } else {
    return name;
  }
};
