(function () {
    Array.prototype.forEach.call(document.querySelectorAll('form input[type=password]'), function (pass) {
        var form = pass.closest('form');

        // <input> and <input type=""> do not get picked up by input[type=text] selector
        // so we must select all inputs and filter it with the .type property
        var users = Array.prototype.filter.call(form.querySelectorAll('input'), function (input) {
            return input.type == 'text' || input.type == 'email';
        });

        if (users.length == 1) {
            var user = users[0];

            chrome.runtime.onMessage.addListener(function (message, sender, respond) {
                if (message.from == 'popup') {
                    if (message.action == 'do_fill') {
                        user.value = message.user;
                        pass.value = message.pass;

                        user.style.backgroundColor = '#edffe3';
                        pass.style.backgroundColor = '#edffe3';
                    }
                }
            });
            chrome.runtime.sendMessage('', {
                from: 'content_script',
                action: 'fill_available'
            });
        }
    });
})();