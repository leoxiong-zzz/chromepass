(function () {
    $('form input[type=password]:visible').each(function () {
        var form = $(this).closest('form')[0];

        var user_input = $(form).find('input[type=text], input[type=email]');
        var pass_input = $(this);

        if ($(user_input)) {
            chrome.runtime.sendMessage('', function (message) {
                if (message.type == 'autofill_response') {
                    $(user_input).val(message.user).css('background-color', '#edffe3');
                    $(pass_input).val(message.pass).css('background-color', '#edffe3');
                }
            });
        }
    });
})();