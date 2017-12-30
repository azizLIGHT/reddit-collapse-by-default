// ==UserScript==
// @name         Reddit collapse by default
// @namespace    http://github.com/Wizek/
// @version      0.2.1
// @description  All Reddit comments collapsed by default
// @author       Milan Nagy
// @match        https://www.reddit.com/*
// @grant        GM_addStyle
// ==/UserScript==

$('.noncollapsed .noncollapsed > .entry > .tagline > .expand').click()
