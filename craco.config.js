module.exports = {
  style: {
    postcss: {
      Plugin: [require("tailwindcss"), require("autoprefixer")],
    },
  },
};
