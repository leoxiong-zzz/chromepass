chrome.runtime.onMessage.addListener(function (message, sender, respond) {
    if (message.from == 'content_script') {
        if (message.action = 'fill_available') {
            chrome.pageAction.show(sender.tab.id);
        }
    }
});