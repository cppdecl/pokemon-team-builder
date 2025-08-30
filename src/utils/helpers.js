export function capitalize(s) {
    if (!s) return "";
    return s[0].toUpperCase() + s.slice(1);
  }
  
  export function fallbackSprite(id) {
    return `data:image/svg+xml;utf8,${encodeURIComponent(
      `<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'>
        <rect width='100%' height='100%' fill='#f4f4f7'/>
        <text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle'
          fill='#b8b8c4' font-size='20'>#${id}</text></svg>`
    )}`;
  }
  