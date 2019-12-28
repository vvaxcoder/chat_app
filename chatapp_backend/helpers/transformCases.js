module.exports = {
  firstLetterUppercase: username => {
    const name = username.toLowerCase();

    return name.charAt(0).toUpperCase() + name.slice(1);
  },
  firstLetterLowercase: str => {
    return str.toLowerCase();
  }
}
