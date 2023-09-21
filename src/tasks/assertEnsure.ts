export const assertEnsure = {
    that: {
        isEqualTo: (actual: number | string | boolean | object, expected: number | string | boolean | object): boolean => {
            return assertEnsure.assertions.assertIsEqualsTo(actual, expected);
        },
        isNotEqualTo: (actual: number | string | boolean | object, expected: number | string | boolean | object): boolean => {
            return assertEnsure.assertions.assertIsNotEqualsTo(actual, expected);
        },
        startsWith: (actual: string, expected: string): boolean => {
            return assertEnsure.assertions.assertStartsWith(actual, expected);
        },
        endsWith: (actual: string, expected: string): boolean => {
            return assertEnsure.assertions.assertEndsWith(actual, expected);
        }
    },
  
    assertions: {
        assertIsEqualsTo: (actual: number | string | boolean | object, expected: number | string | boolean | object): boolean => actual === expected,
        assertIsNotEqualsTo: (actual: number | string | boolean | object, expected: number | string | boolean | object): boolean => actual != expected,
        assertStartsWith: (actual: string, expected: string): boolean => actual.startsWith(expected),
        assertEndsWith: (actual: string, expected: string): boolean => actual.endsWith(expected)
    },
};
  