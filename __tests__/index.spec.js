/**
 * @description - main test suits
 * @author - bornkiller <hjj491229492@hotmail.com>
 */

// Native
const fs = require('fs');
const path = require('path');

// External
const posthtml = require('posthtml');

// Internal
const inject = require('../lib');

// Scope
const readOptions = { encoding: 'utf8' };

describe('posthtml inject plugin', () => {
  it('should validate pass options', () => {
    expect(() => inject()).toThrow();
    expect(() => inject({ elements: [] })).toThrow();
  });

  it('standard case', () => {
    const html = fs.readFileSync(path.resolve(__dirname, '__fixture__', 'standard.html'), readOptions);
    const exclude = 'critical';
    const elements = {
      manifest: [
        {
          tag: 'link',
          attrs: {
            rel: 'manifest',
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
    };

    return posthtml([inject({ exclude, elements })])
      .process(html)
      .then((res) => {
        expect(res.html).toMatchSnapshot();
      });
  });
});
