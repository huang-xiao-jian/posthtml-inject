# posthtml-inject
![Build Status](https://img.shields.io/travis/bornkiller/posthtml-inject/master.svg?style=flat)
[![Coverage Status](https://coveralls.io/repos/github/bornkiller/posthtml-inject/badge.svg?branch=master)](https://coveralls.io/github/bornkiller/posthtml-inject?branch=master)
![Package Dependency](https://david-dm.org/bornkiller/posthtml-inject.svg?style=flat)
![Package DevDependency](https://david-dm.org/bornkiller/posthtml-inject/dev-status.svg?style=flat)

This plugin is intended to work with PostHTML. It will allow you to inject HTML elements with standalone object.

```javascript
{
  manifest: [
    {
      tag: 'link',
      attrs: {
        href: 'manifest.json'
      }
    }
  ],
  library: [
    {
      tag: 'script',
      attrs: {
        src: 'https://cdn.bootcss.com/react/15.6.1/react.js'
      }
    },
    {
      tag: 'script',
      attrs: {
        src: 'https://cdn.bootcss.com/moment.js/2.18.1/moment.min.js'
      }
    }
  ]
}
```

A custom tag, which signifies where the HTML elements should be inserted during the build process. The name identify object
key.

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Posthtml</title>
  <posthtml-inject name="manifest" />
</head>
<body>
<posthtml-inject name="library" />
</body>
</html>
```

after build:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Posthtml</title>

<link href="manifest.json">

</head>
<body>

<script src="https://cdn.bootcss.com/react/15.6.1/react.js"></script>
<script src="https://cdn.bootcss.com/moment.js/2.18.1/moment.min.js"></script>

</body>
</html>
```

## License
MIT
