const striptags = require("striptags");
const he = require("he");

const WHITESPACE = /\s+/;

module.exports = function (eleventyConfig) {
    eleventyConfig.addPassthroughCopy('CNAME');
    eleventyConfig.addPassthroughCopy("./authorImg");
    eleventyConfig.addPassthroughCopy("./css");
    eleventyConfig.addPassthroughCopy("./img");
    eleventyConfig.addPassthroughCopy("./links");
    eleventyConfig.addPassthroughCopy("./postImg");
    eleventyConfig.addPassthroughCopy("./script");

    eleventyConfig.addFilter("fifty_words", (content) => {
        const plainText = he.decode(striptags(content), { strict: true });
        return plainText.split(WHITESPACE).slice(0, 50).join(" ");
    });

    return {
        dir: {
            input: "./",
            output: "./_site",
            layouts: "./_layouts"
        }
    };
}