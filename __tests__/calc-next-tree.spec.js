/**
 * @description - main test suits
 * @author - bornkiller <hjj491229492@hotmail.com>
 */

// Internal
const calcNextTree = require('../lib/calc-next-tree');

describe('calc-next-tree helper', () => {
  it('should tolerate missing elements', () => {
    expect(calcNextTree({}, 'missing')).toEqual([]);
  });

  it('should tolerate incorrect elements syntax', () => {
    expect(calcNextTree({ incorrect: {} }, 'incorrect')).toEqual([]);
  });

  it('should normalize standard elements', () => {
    const elements = {
      manifest: [
        {
          tag: 'link',
          attrs: {
            href: 'manifest.json'
          }
        },
        {
          tag: 'link',
          attrs: {
            href: 'main.css'
          }
        }
      ]
    };

    expect(calcNextTree(elements, 'manifest', '\n', '  ')).toMatchSnapshot();
  });
});
