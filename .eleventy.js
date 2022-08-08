const striptags = require("striptags");
const he = require("he");
const fs = require('fs')

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
        var plainText = he.decode(striptags(content), { strict: true });
        if(plainText.split(WHITESPACE).length > 50) {
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
                    <img src="/img/ko-fi-icon.svg" alt="Support me on Ko-Fi!">
                </a>
                <a href="https://discord.gg/fHu8AZBrYW" target="_blank">
                    <img src="/img/icon_clyde_circle_white.svg" alt="Contact ARBEE over Discord.">
                </a>
                <a href="https://twitter.com/0Arbee0" target="_blank">
                    <img src="/img/TwitterLogoWhite.svg" alt="Contact ARBEE over Twitter">
                </a>
                <a href="https://github.com/Arbee4ever" target="_blank">
                    <img src="/img/GitHub-Mark-Light-120px-plus.png" alt="Contact ARBEE over GitHub.">
                </a>
                <a href="&#109;&#97;&#105;&#108;&#116;&#111;&#58;%61%72%62%65%65%40%61%72%62%65%65%63%6F%2E%64%65?subject=Contact-Website&body=Hello%20ARBEE%2C">
                    <img src="/img/MailLogoWhite.svg" alt="Contact ARBEE over eMail.">
                </a>
            </div>
            <p>This website is hosted by <a href="https://pages.cloudflare.com" target="_blank">Cloudflare</a>.</p>
            <p>Brand design by <a href="https://www.instagram.com/ralfbaenecke/" target="_blank">ralf baenecke</a>.</p>
            <p>© 2022 ARBEE</p>
        </footer>`
    });

    return {
        dir: {
            input: "./",
            output: "./_site",
            layouts: "./_layouts"
        }
    };
}