'use strict';

/**
 * Javascript version of https://gist.github.com/jbroadway/2836900
 *
 * Slimdown - A very basic regex-based Markdown parser. Supports the
 * following elements (and can be extended via Slimdown::add_rule()):
 *
 * - Headers
 * - Links
 * - Bold
 * - Emphasis
 * - Deletions
 * - Quotes
 * - Inline code
 * - Blockquotes
 * - Ordered/unordered lists
 * - Horizontal rules
 *
 * Author: Johnny Broadway <johnny@johnnybroadway.com>
 * Website: https://gist.github.com/jbroadway/2836900
 * License: MIT
 */
class Slimdown {

    constructor() {
        // Rules
        this.rules = [
            {regex: /\[([^\[]+)\]\(([^\)]+)\)/g, replacement: '<a href=\'$2\'>$1</a>'},     // hyperlink
            {regex: /(\*)(.*?)\1/g, replacement: '<strong>$2</strong>'},                    // bold
            {regex: /(_)(.*?)\1/g, replacement: '<em>$2</em>'},                             // emphasis
            {regex: /```([^]*?)```/g, replacement: '<pre>$1</pre>'},                        // block of code
            {regex: /`(.*?)`/g, replacement: '<code>$1</code>'},                            // inline code
        ];

    }

    // Render some Markdown into HTML.
    render(text) {
        text = `\n${text}\n`;
        this.rules.forEach( (rule) => {
            text = text.replace(rule.regex, rule.replacement);
        });

        return text.trim();
    }
}


////////////

module.exports = new Slimdown();
