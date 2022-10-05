const striptags = require("striptags");
const fetch = require("node-fetch");
const he = require("he");
const pluginRss = require("@11ty/eleventy-plugin-rss");

const WHITESPACE = /\s+/;

module.exports = function (eleventyConfig) {
    eleventyConfig.addPlugin(pluginRss);

    eleventyConfig.addPassthroughCopy('CNAME');
    eleventyConfig.addPassthroughCopy("./authorImg");
    eleventyConfig.addPassthroughCopy("./css");
    eleventyConfig.addPassthroughCopy("./img");
    eleventyConfig.addPassthroughCopy("./links");
    eleventyConfig.addPassthroughCopy("./postImg");
    eleventyConfig.addPassthroughCopy("./script");

    eleventyConfig.addFilter("fifty_words", (content) => {
        var plainText = he.decode(striptags(content), { strict: true });
        if (plainText.split(WHITESPACE).length > 50) {
            plainText = plainText.split(WHITESPACE).slice(0, 50).join(" ") + "...";
        }
        return plainText;
    });

    eleventyConfig.addLiquidShortcode("header", function () {
        return `
        <header>
            <noscript>
                <div id="error">
                    <strong>
                        This site works best with JavaScript enabled! (╯°□°）╯︵ ┻━┻
                    </strong>
                </div>
            </noscript>
            <img id="topBtn" src="/img/TopIcon.svg" alt="Click to go back to top.">
            <div id="vignette"></div>
            <a href="/">
                <img src="/img/2022-01_ARBEE_Wort-Marke_rgb_weiss_01.svg" id="wordmark" alt="ARBEE's Wordmark">
            </a>
        </header>`
    });
    eleventyConfig.addLiquidShortcode("footer", function () {
        return `
        <footer id="footer">
            <img src="/img/2022-01_ARBEE_Wort-Bild-Marke_rgb_weiss_01.svg" alt="ARBEE's Word-Imagemark.">
            <br>
            <div id="footercontact">
                <a href="https://ko-fi.com/arbee" target="_blank">
                    <img src="/img/ko-fi-icon.svg" alt="Support me on Ko-fi!">
                </a>
                <a href="https://arbeeco.de/links/discord" target="_blank">
                    <img src="/img/icon_clyde_circle_white.svg" alt="Contact ARBEE over Discord.">
                </a>
                <a href="https://twitter.com/ARBEE_codes" target="_blank">
                    <img src="/img/TwitterLogoWhite.svg" alt="Contact ARBEE over Twitter">
                </a>
                <a href="https://github.com/Arbee4ever" target="_blank">
                    <img src="/img/GitHub-Logo.svg" alt="Contact ARBEE over GitHub.">
                </a>
                <a href="&#109;&#97;&#105;&#108;&#116;&#111;&#58;%61%72%62%65%65%40%61%72%62%65%65%63%6F%2E%64%65?subject=Contact-Website&body=Hello%20ARBEE%2C">
                    <img src="/img/MailLogoWhite.svg" alt="Contact ARBEE over eMail.">
                </a>
            </div>
            <p>Hosted on <a href="https://pages.cloudflare.com" target="_blank">Cloudflare</a>, domain from <a href="https://dashserv.io/a/arbee" target="_blank">dashserv</a></p>
            <p>Brand design by <a href="https://www.instagram.com/ralfbaenecke/" target="_blank">ralf baenecke</a>.</p>
            <p>© 2022 ARBEE</p>
        </footer>`
    });
    eleventyConfig.addLiquidShortcode("modPostPreview", async mod => {
        const modrinthAPI = await fetch("https://api.modrinth.com/v2/project/" + mod, {
            Accept: "application/json",
            method: "GET",
            "User-Agent": "https://github.com/Arbee4ever/arbeeco.de (arbeeco.de)"
        });
        const response = await modrinthAPI.json();
        const body = response.body;
        return eleventyConfig.getFilter("fifty_words")(body);
    });

    return {
        dir: {
            input: "./",
            output: "./_site",
            layouts: "./_layouts"
        }
    };
}