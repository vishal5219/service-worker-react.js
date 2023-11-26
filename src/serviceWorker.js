export default function serviceWorker() {
    let swUrl = `${process.env.PUBLIC_URL}/sw.js`; // get sw.js file from public directory

    if ("serviceWorker" in navigator) {
        window.addEventListener('load', function () {
            navigator.serviceWorker.register(swUrl)
                .then((registration) => {
                    console.log('registration', registration.scope);
                }, function (err) {
                    console.log('Failed');
                }).catch((err) => {
                    console.log('not registration', err);
                })
        })
    } else {
        console.log('service worker is not supported');
    }
}