export const imageLoader = ({ src, width, quality }) => {
    return `https://alamin-marble.com:8080${src}?w=${width}&q=${quality || 75}`;
}