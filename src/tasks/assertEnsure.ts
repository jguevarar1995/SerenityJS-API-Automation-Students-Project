export const assertEnsure = {
    that: {
        isEqualTo: (actual: number | string | boolean | object, expected: number | string | boolean | object): boolean => {
            return assertEnsure.assertions.assertIsEqualsTo(actual, expected);
        },
        isNotEqualTo: (actual: number | string | boolean | object, expected: number | string | boolean | object): boolean => {
            return assertEnsure.assertions.assertIsNotEqualsTo(actual, expected);
        },
    },
  
    assertions: {
        assertIsEqualsTo: (actual: number | string | boolean | object, expected: number | string | boolean | object): boolean => actual === expected,
        assertIsNotEqualsTo: (actual: number | string | boolean | object, expected: number | string | boolean | object): boolean => actual != expected,
    },
};
  