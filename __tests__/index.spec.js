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

describe('posthtml inject plugin', () => {
  it('should validate pass options', () => {
    expect(() => inject()).toThrow();
    expect(() => inject({ elements: [] })).toThrow();
  });

  it('standard case', () => {
    const html = fs.readFileSync(path.resolve(__dirname, '__fixture__', 'template.html'), readOptions);

    return posthtml([inject({ elements })])
      .process(html)
      .then((res) => {
        expect(res.html).toMatchSnapshot();
      });
  });

  it('standard case without tag name limitation', () => {
    const html = fs.readFileSync(path.resolve(__dirname, '__fixture__', 'arbitrary.html'), readOptions);

    return posthtml([inject({ elements })])
      .process(html)
      .then((res) => {
        expect(res.html).toMatchSnapshot();
      });
  });
});
