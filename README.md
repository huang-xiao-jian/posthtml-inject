# posthtml-inject
![Build Status](https://img.shields.io/travis/bornkiller/posthtml-inject/master.svg?style=flat)
[![Coverage Status](https://coveralls.io/repos/github/bornkiller/posthtml-inject/badge.svg?branch=master)](https://coveralls.io/github/bornkiller/posthtml-inject?branch=master)
![Package Dependency](https://david-dm.org/bornkiller/posthtml-inject.svg?style=flat)
![Package DevDependency](https://david-dm.org/bornkiller/posthtml-inject/dev-status.svg?style=flat)

This plugin is intended to work with PostHTML. It will allow you to inject HTML elements with standalone object.

```javascript
{
  EOL: '\n', // Optional
  INTENT: '\s\s', // Optional,
  matcher: 'template', // Optional, tag name to match slot
  include: [], // Optional, default elements property, declare explicit slot to insert
  elements: {
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
}
```

```javascript
posthtml([inject( /* options above*/ )])
  .process(html)
  .then((res) => {
    // ....
    // ....
  });
```

A matcher tag, which signifies where the HTML elements should be inserted during the build process. The name identify object key.

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Posthtml</title>
  <!-- slot manifest -->
  <template data-id="posthtml-inject" data-name="manifest"></template>
  <!-- slot manifest -->
</head>
<body>
  <!-- slot library CDN scripts -->
  <template data-id="posthtml-inject" data-name="library"></template>
  <!-- slot library CDN scripts -->
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
  <!-- slot manifest -->
  <link href="manifest.json">
  <!-- slot manifest -->
</head>
<body>
  <!-- slot library CDN scripts -->
  <script src="https://cdn.bootcss.com/react/15.6.1/react.js"></script>
  <script src="https://cdn.bootcss.com/moment.js/2.18.1/moment.min.js"></script>
  <!-- slot library CDN scripts -->
</body>
</html>
```

## License
MIT
