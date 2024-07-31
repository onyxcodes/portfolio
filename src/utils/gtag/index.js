if ( process.env.G_ANALYTICS_ENABLED !== 'false' ) {
    var script = document.createElement("script");
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${process.env.G_ANALYTICS_MEASUREMENT_ID}`;

    document.head.prepend(script);

    window.dataLayer = window.dataLayer || [];
    function gtag() { window.dataLayer.push(arguments); }
    gtag('js', new Date());

    gtag('config', 'G-LW1RHTVX9S');
}

if (process.env.ADSENSE_ENABLED !== 'false') {
    var adsenseScript = document.createElement("script");
    adsenseScript.async = true;
    adsenseScript.src = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js";
    adsenseScript.setAttribute('data-ad-client', process.env.ADSENSE_CLIENT_ID);

    document.head.prepend(adsenseScript);
}