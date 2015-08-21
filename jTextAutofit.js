/*
 *
 * Licensed under The MIT License (MIT)  (see http://opensource.org/licenses/MIT)
 * https://github.com/traeger/jTextAutofit
 * Copyright (c) 2015 Marco Träger <marco.traeger at googlemail.com>
 *
 */

(function ( $ ) {
    var defer = function(f) {
        setTimeout(f, 0)
    }
    var width = function(e) {
        w = e.width()
        wo = e.outerWidth(true)
        console.log(w + ":" + wo)
        return Math.min(w, wo)
    }
    var setFontsize = function(e, fontsize) {
        e.css({fontSize: fontsize + 'px', lineHeight: fontsize + 'px'})
        return fontsize
    }
    var adjustUp = function(e, s, step) {
        var loopedOnce = false;
        var heightFontsizeRatio = e.height() / s
        var heightFontsizeRatioWithTreshhold = heightFontsizeRatio * 1.5 // treshhold < 2
        
        while (e.width() < width(e.parent()) && e.height() / s <= heightFontsizeRatioWithTreshhold) {
            s = setFontsize(e, s + step)
            loopedOnce = true;
        }
        if (loopedOnce) {
            s = setFontsize(e, s - step)
        }
        return s;
    }
    var adjust = function(e) {
        e.css({padding:0, margin:0, border:0})
        var fontSize = 8
        
        var minsize = e.attr('text-autofit-minsize')
        if (!!minsize) {
            fontSize = parseInt(minsize.substr(0,2))
        }
        setFontsize(e, fontSize)
        
        fontSize = adjustUp(e, fontSize, 4)
        fontSize = adjustUp(e, fontSize, 1)
        
        // fix for floating text.. dont know why we need this actually
        // (other than force a recalculation) .. TODO: investigate
        var pad = e.parent().css('paddingRight');
        e.parent().css('paddingRight', 0)
        defer(function() {
            e.parent().delay(1000).css('paddingRight', pad)
        })
    }
    var autoFit = function() {
        $('.text-autofit').each(function() {
            e = $(this);
            adjust(e)
        })
    }
    
    $(window).resize(autoFit)
    autoFit()
}( jQuery ));