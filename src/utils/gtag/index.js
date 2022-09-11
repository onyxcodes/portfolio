var script = document.createElement("script");
script.async = true;
script.src = `https://www.googletagmanager.com/gtag/js?id=${process.env.G_ANALYTICS_MEASUREMENT_ID}`;

document.head.prepend(script);

window.dataLayer = window.dataLayer || [];
function gtag() { dataLayer.push(arguments); }
gtag('js', new Date());

gtag('config', 'G-LW1RHTVX9S');