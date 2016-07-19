chrome.runtime.onMessage.addListener(function (message, sender, respond) {
    var url = new URL(sender.url);
    var on_reply = function (message) {
        if (message.type === 'exception') {
            chrome.notifications.create('notif_id', {
                type: 'basic',
                // placeholder image, as this parameter is required
                iconUrl: 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7',
                title: 'chromepass exception',
                message: message.message
            });
        }

        respond(message);
    };

    get_autofill(url.host, on_reply);

    // Keep the 'respond' callback function variable after function exit
    // as we are calling 'respond' later in another async callback.
    return true;
});

function get_autofill(host, callback) {
    var msg_obj = {
        type: 'autofill_request',
        host: host
    };
    send_message(msg_obj, callback);
}

function send_message(msg_obj, callback) {
    chrome.runtime.sendNativeMessage('com.leoxiong.chromepass', msg_obj, callback);
}