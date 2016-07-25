(function () {
    chrome.tabs.getSelected(function (tab) {
        var url = new URL(tab.url);

        document.getElementById('host').textContent = url.host;

        document.getElementById('button-fill').addEventListener('click', function () {
            document.getElementById('progress-indeterminate').style.display = 'block';
            chrome.runtime.sendMessage('', {
                from: 'popup',
                action: 'do_fill',
                tab: tab
            }, function (reply) {
                document.getElementById('progress-indeterminate').style.display = 'none';
            });
        });
    });
})();