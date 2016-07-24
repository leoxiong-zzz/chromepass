(function () {
    var pass = $('form input[type=password]:visible')[0];
    var form = $(pass).closest('form');
    var user = $(form).find('input[type=text], input[type=email]')[0];


    if ($(user) && $(pass)) {
        chrome.runtime.sendMessage('', {
            from: 'content_script',
            action: 'fill_available'
        });
        chrome.runtime.onMessage.addListener(function (message, sender, respond) {
            if (message.from == 'popup') {
                if (message.action == 'do_fill') {
                    $(user).val(message.user).css('background-color', '#edffe3');
                    $(pass).val(message.pass).css('background-color', '#edffe3');
                }
            }
        });
    }
})();