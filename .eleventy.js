module.exports = function(eleventyConfig) {
  eleventyConfig.addPassthroughCopy('CNAME');
  eleventyConfig.addPassthroughCopy("./authorimg");
  eleventyConfig.addPassthroughCopy("./css");
  eleventyConfig.addPassthroughCopy("./img");
  eleventyConfig.addPassthroughCopy("./links");
  eleventyConfig.addPassthroughCopy("./postimg");
  eleventyConfig.addPassthroughCopy("./script");

    return {
      dir: {
        input: "./",
        output: "./_site",
        layouts: "./_layouts"
      }
    };
  }