jest.unmock('../src/helpers');

import { omitProps, includeProps, fontSizeConverter, arraysEqual, propertiesEqual } from '../src/helpers';

describe('helpers', () => {

  describe('omitProps', () => {
    it('should omit object properties', () => {
      const obj = omitProps({ a: 1, b: 2, c: 3, d: 4 }, [ 'a', 'c' ]);
      expect(obj).toEqual({ b: 2, d: 4 });
    });
  });

  describe('includeProps', () => {
    it('should include all object properties', () => {
      const obj = includeProps({ a: 1, b: 2, c: 3, d: 4 }, [ 'a', 'c' ]);
      expect(obj).toEqual({ a: 1, c: 3 });
    });

    it('should include all available object properties', () => {
      const obj = includeProps({ a: 1, b: 2, c: 3, d: 4 }, [ 'b', 'e' ]);
      expect(obj).toEqual({ b: 2 });
    });
  });

  describe('fontSizeConverter', () => {
    it('should minimal tag size', () => {
      const size = fontSizeConverter(25, 10, 1000, 12, 25);
      expect(size).toEqual(12);
    });

    it('should maximal tag size', () => {
      const size = fontSizeConverter(980, 10, 1000, 12, 25);
      expect(size).toEqual(25);
    });

    it('should middle tag size', () => {
      const size = fontSizeConverter(510, 10, 1000, 12, 25);
      expect(size).toEqual(19);
    });

    it('should handle devision by zero', () => {
      const size = fontSizeConverter(450, 10, 10, 12, 25);
      expect(size).toEqual(19);
    });
  });

  describe('arraysEqual', () => {
    it('should be equal', () => {
      const arr = [1, { a: 2 }, 'hello'];
      expect(arraysEqual(arr, arr.slice())).toEqual(true);
    });

    it('should not be equal', () => {
      const arr1 = [1, { a: 2 }, 'hello'];
      const arr2 = [1, { a: 2 }, 'hello'];
      expect(arraysEqual(arr1, arr2)).toEqual(false);
    });

    it('should not be equal because of different length', () => {
      const arr1 = [1, 2, 3];
      const arr2 = [1, 2, 3, 4];
      expect(arraysEqual(arr1, arr2)).toEqual(false);
    });
  });

  describe('propertiesEqual', () => {
    it('should have equal properties', () => {
      const o1 = { a: '1', b: 3 };
      const o2 = { a: '1', b: 3, c: 4 };
      expect(propertiesEqual(o1, o2, ['a', 'b'])).toBe(true);
    });

    it('should have not equal properties', () => {
      const o1 = { a: '1', b: 3 };
      const o2 = { a: '1', b: 3, c: 4 };
      expect(propertiesEqual(o1, o2, ['a', 'b', 'c'])).toBe(false);
    });
  });

});
