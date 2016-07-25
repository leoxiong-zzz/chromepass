chrome.runtime.onMessage.addListener(function (message, sender, respond) {
    if (message.from == 'content_script') {
        if (message.action = 'fill_available') {
            chrome.pageAction.show(sender.tab.id);
        }
    }
    else if (message.from == 'popup') {
        if (message.action == 'do_fill') {
            var url = new URL(message.tab.url);

            chrome.runtime.sendNativeMessage('com.leoxiong.chromepass', {
                type: 'autofill_request',
                host: url.host
            }, function (reply) {
                if (reply.type == 'autofill_response') {
                    chrome.tabs.sendMessage(message.tab.id, {
                        from: 'background',
                        action: 'do_fill',
                        user: reply.user,
                        pass: reply.pass
                    });

                    respond();
                }
            });
        }
    }

    // Keep the respond method after function return as we will need it after
    // an async callback.
    return true;
});