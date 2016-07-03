if (typeof antlersAdsLock === 'undefined') {
    antlersAdsLock = true;

    (function () {
        var masterUrl = '//antlers-ads.master.local';
        var workerUrl = '//antlers-ads.worker.local';

        function getAdvertisement(advertisementId, element, callback) {
            var httpRequest = new XMLHttpRequest();
            httpRequest.onload = function () {
                callback(element, JSON.parse(httpRequest.responseText));
            };
            httpRequest.open('GET', workerUrl + '/serve/' + advertisementId);
            httpRequest.send();
        }

        var nodeList = document.querySelectorAll('[data-ad-id]');
        var nodeArray = [].slice.call(nodeList);

        for (var i = 0; i < nodeArray.length; i++) {
            var advertisementId = nodeArray[i].getAttribute('data-ad-id');

            getAdvertisement(advertisementId, nodeArray[i], function (element, advertisement) {
                var advertisementLink = document.createElement('a');
                var advertisementImage = document.createElement('img');

                advertisementImage.setAttribute('src', masterUrl + '/images/' + advertisement.image);
                advertisementImage.setAttribute('alt', advertisement.name);
                advertisementLink.setAttribute('href', advertisement.url);
                advertisementLink.setAttribute('target', '_blank');
                advertisementLink.appendChild(advertisementImage);

                element.parentNode.replaceChild(advertisementLink, element);
            });
        }
    })();
}
