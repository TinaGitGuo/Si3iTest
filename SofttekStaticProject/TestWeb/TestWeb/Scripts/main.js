//Tab changes

$(function () {
    if (typeof String.prototype.startsWith != 'function') {
        String.prototype.startsWith = function (prefix) {
            return this.slice(0, prefix.length) === prefix;
        };
    }
 
    bindEachControl();
})
function bindEachControl() {
    $('.input-div>input').focus(function () {
        if ($(this).val() == '') {
            $(this).parents('.input-div').addClass('focused');
        }
    });
    $('.input-div>input').blur(function () {
        if ($(this).val() == '') {
            $(this).parents('.input-div').removeClass('focused');
        }
    });
    $('.input-div>textarea').focus(function () {
        if ($(this).val() == '') {
            $(this).parents('.input-div').addClass('focused');
        }
    });
    $('.input-div>textarea').blur(function () {
        if ($(this).val() == '') {
            $(this).parents('.input-div').removeClass('focused');
        }
    });

    $('.checkbox-div').click(function () {
        if ($('label.checkbox-text', $(this)).hasClass('toggle-active')) {
            $('label.checkbox-text', $(this)).removeClass('toggle-active');
            $('input[type=checkbox]', $(this)).checked = false;
        }
        else {
            $('label.checkbox-text', $(this)).addClass('toggle-active');
        }
    });
    $('.radio-div').click(function () {
        if ($('span.radio-text', $(this)).hasClass('toggle-active')) {
            $('span.radio-text', $(this)).removeClass('toggle-active');
            $('input[type=radio]', $(this)).checked = false;
        }
        else {
            var group = $(this).attr('data-group');
            $('.radio-div[data-group=' + group + ']').each(function (i, val) {
                if ($('span.radio-text', $(this)).hasClass('toggle-active')) {
                    $('span.radio-text', $(this)).removeClass('toggle-active');
                }
            });
            $('span.radio-text', $(this)).addClass('toggle-active');
        }
    });

    //dropdown
    // has to happen after text input event binding!!!
    $('select').each(function () {
        var curInput = $(this);
        $('option:first', this).text(curInput.attr("watermark"));

        curInput.selectric({
            onOpen: function () {
                //console.log('Open');
                if (curInput.parent().parent('.selectric-wrapper').hasClass('selectric-above')) {
                    $('html, body').animate({
                        scrollTop: curInput.offset().top
                    }, 500);
                }
            },
            onInit: function () {
                var selectricWrapper = curInput.parent().parent('.selectric-wrapper');
                var label = $('.selectric .selectric-label', selectricWrapper);
                label.attr('data-placeholder', curInput.attr("watermark"));
                var firstItem = $('.selectric-items .selectric-scroll ul li:first', selectricWrapper);
                //firstItem.remove();
                var firstOption = $('.selectric-hide-select select option:first', selectricWrapper);

                /* START Workaround dc special hide */
                if (curInput.attr('name').startsWith('variable_column')) {
                    curInput.attr('dc-required', 'false');
                }
                /* END Workaround dc special hide */
            },
            onChange: function () {
                var label = $('.selectric .selectric-label', curInput.parent().parent('.selectric-wrapper'));
                label.attr('data-placeholder', curInput.attr('watermark'));
                if (curInput.val() != "" && curInput.val() != curInput.attr("watermark")) {
                    curInput.parent().parent('.selectric-wrapper').addClass('enable');

                    /* START dc-special-hide-trigger */
                    if (curInput.hasClass('dc-special-hide-trigger')) {
                        if (curInput.val() == curInput.attr('dc-trigger-value')) {
                            $(formIdentifier + ' .dc-special-hide :input[name^=variable_column]').each(function () {
                                var curItem = $(this);
                                curItem.attr('dc-required', 'true');
                                if (!curItem.is('select')) {
                                    curItem.val(curItem.attr("watermark"));
                                }
                            });
                            $(formIdentifier + ' .dc-special-hide').removeClass('hidden');
                        }
                        else {
                            $(formIdentifier + ' .dc-special-hide :input[name^=variable_column]').each(function () {
                                var curItem = $(this);
                                curItem.attr('dc-required', 'false');
                                if (!curItem.is('select')) {
                                    curItem.val(curItem.attr("watermark"));
                                    curItem.removeClass('enable');
                                    curItem.parent().removeClass('focused');
                                }
                                else {
                                    curItem[0].selectedIndex = 0;
                                    curItem.selectric('refresh');
                                }
                            });
                            $(formIdentifier + ' .dc-special-hide').addClass('hidden');
                        }
                    }
                    /* END dc-special-hide-trigger */
                }
                else {
                    curInput.parent().parent('.selectric-wrapper').removeClass('enable');
                }
                //console.log('Change');
                //event.stopPropagation();
                if (event.stopPropagation) {
                    // ’Î∂‘ Mozilla ∫Õ Opera   
                    event.stopPropagation();
                }
                else if (window.event) {
                    // ’Î∂‘ IE   
                    window.event.cancelBubble = true;
                }
            },
          
            preventWindowScroll: true,
            maxHeight: 270,
            nativeOnMobile:false
        });
    });

}