import { MediaType } from 'features/content/types'

const getStrapiURL = ( path: string ) => {
    return `${process.env.API_ENDPOINT || 'http://localhost:1337'}${path}`
}

const getStrapiMediaURL = ( url: string ) => {
    if ( url.startsWith('http') || url.startsWith('//') ) return url;
    return getStrapiURL(url);
}

const getStrapiMedia = ( media: MediaType | null ) => {
    let url,
        alt,
        caption,
        type;

    // By default fetch ( default, not sized ) url
    if ( media ) {
        url = getStrapiMediaURL(media.attributes.url),
        alt = media.attributes.alternativeText,
        caption = media.attributes.caption,
        type = media.attributes.mime;
    }
    return { url, alt, caption, type };
}

export { getStrapiURL, getStrapiMedia }