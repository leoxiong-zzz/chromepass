(function () {
    chrome.tabs.getSelected(function (tab) {
        var url = new URL(tab.url);
        document.getElementById('host').textContent = url.host;

        document.getElementById('button-fill').addEventListener('click', function () {
            chrome.runtime.sendNativeMessage('com.leoxiong.chromepass', {
                type: 'autofill_request',
                host: url.host
            }, function (message) {
                if (message.type == 'autofill_response') {
                    chrome.tabs.sendMessage(tab.id, {
                        from: 'popup',
                        action: 'do_fill',
                        user: message.user,
                        pass: message.pass
                    });
                }
            });
        });
    });
})();