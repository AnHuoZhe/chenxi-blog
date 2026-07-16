export default {
  permalink: (data) => `${data.page.filePathStem.replace(/^\/content/, '')}/`,
};
