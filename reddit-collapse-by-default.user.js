// ==UserScript==
// @name         Reddit collapse by default
// @namespace    http://github.com/Wizek/
// @version      0.2.2
// @description  Second level Reddit comments collapsed by default
// @author       Milan Nagy
// @contributors joeytwiddle
// @match        https://www.reddit.com/*
// @grant        GM_addStyle
// ==/UserScript==


GM_addStyle("                                                                               \
  .sitetable.nestedlisting .comment .tagline .expand-children {\
    display: inline-block; \
  }\
  .child .sitetable .comment .tagline .expand-children {\
    display: none; \
  }\
  .important-show {\
    display: inline-block !important; \
  }\
");
//$('.noncollapsed > .entry > .tagline > .expand').click()



// Add expand-children comments link
$('<a href="javascript:void(0)" class="expand-children collapsedc" onclick="">[+++]</a>').insertAfter('.expand');


// Do not collapse top-level comments


$(document).ready(function(){
    var url = window.location.href;
    if (localStorage.getItem("redditURL") == url)
    {
        $('.noncollapsed').click();
        var stat1, i = 0, stat2;
        stat1 = localStorage.getItem("reddit1State");
        if (stat1 != null)
        {
            $('.expand-children').each(function () {
                if (stat1[i] == '1')
                {
                    $(this).click();
                }
                i++;
            });
        }
        i = 0;
        stat2 = localStorage.getItem("reddit2State");
        if (stat2 != null)
        {
            $('.comment').each(function () {
                if (stat2[i] == '1')
                {
                    var te = $(this).thing().find('.expand:first');
                    te.click();
                }
                i++;
            });
        }
    }
    else
    {
        $('.noncollapsed .noncollapsed  > .entry > .tagline > .expand').click();
    }
});


$('.expand').click(function(){
    var state2='';
    $('.comment').each(function(){
        if ($(this).hasClass('noncollapsed')){
            state2 += '0';
        }
        else state2 += '1';
    });
    localStorage.setItem("reddit2State", state2);
});

// definition of expand-children click function
$('.expand-children').click(function(){
    var t, n, r, k, count;
    $(this).toggleClass("collapsedc noncollapsedc");
    if ($(this).text() == '[+++]'){
        $(this).text("[---]");
        t=$(this).prev().thing(); n=t.find(".expand:first"); r=t.hasClass("collapsed");
//        if (r)
//          t.toggleClass("collapsed noncollapsed");

        k=$(this).parent().parent().next();

        t = k.children().children();
        count = t.size();
        for (obj_index=0;obj_index<count-2;obj_index+=2)
        {
            n = t.eq(obj_index);
            k = n.children(".entry");
            n = k.children('.tagline');
            k = n.children('.expand');
            if (k.thing().hasClass('collapsed'))
                n.children(".expand").click();
            n.children('.expand-children').addClass('important-show');
        }

    }
    else{
        $(this).text("[+++]");
        t=$(this).prev().thing(); n=t.find(".expand:first"); r=t.hasClass("noncollapsed");
//        if (r)
  //          t.toggleClass("collapsed noncollapsed");

        k=$(this).parent().parent().next();
        t = k.children().children();
        count = t.size();
        for (obj_index=0;obj_index<count-2;obj_index+=2)
        {
            n = t.eq(obj_index);
            k = n.children(".entry");
            n = k.children('.tagline');
            k = n.children('.expand');
            if (k.thing().hasClass('noncollapsed'))
                n.children(".expand").click();
            n.children('.expand-children').removeClass('important-show');
        }

    }

    var state1='';
    $('.expand-children').each(function(){
        if ($(this).hasClass('noncollapsedc')){
            state1 += '0';
        }
        else state1 += '1';
    });
    var state2='';
    $('.comment').each(function(){
        if ($(this).hasClass('noncollapsed')){
            state2 += '0';
        }
        else state2 += '1';
    });
    var url = window.location.href;
    localStorage.setItem("reddit1State", state1);
    localStorage.setItem("reddit2State", state2);
    localStorage.setItem("redditURL", url);
});
