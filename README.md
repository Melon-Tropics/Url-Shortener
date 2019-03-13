# [Url-Shortener](https://code.lnmai.com/#/admin/urlshortener)
## How short should the short url be?
- A-Z(26)
- a-z(26)
- 0–9(10)
- _, -(2)

A total of 64. With 6 characters, something like http://example.com/abcdef, we will be able to store 64⁶ unique urls. This is more than 68 billion (68,719,476,736).

## How to generate short code?
Using hashing, specifically MD5 hash, and using base64 encoding on the hash to generate the string and take the first 6 characters.

```const hash = crypto.createHash('md5').update(longURL).digest('base64').replace(/\//g, '_').replace(/\+/g, '-');```

## How to save the short code?
Using SQlite3
