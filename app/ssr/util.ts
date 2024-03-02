export function cleanUrl(url) { // gabe - this is a duplicate of the function in the page.tsx file
    let trimmedString = url.trim();
    let formattedString = trimmedString.replace(/[^\p{L}\p{N}]/gu, '-');
    // \p{L} matches any kind of letter from any language.
    // \p{N} matches any kind of numeric digit in any script.
    return formattedString;
  }