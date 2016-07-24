(function () {
    NodeList.prototype.forEach = Array.prototype.forEach;

    document.querySelectorAll('form input[type=password]').forEach(function (pass) {
        var form = pass.closest('form');
        var users = form.querySelectorAll('input[type=text], input[type=email]');

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