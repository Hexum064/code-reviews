import { describe, it, expect } from 'vitest';
import { ApolloError } from '@apollo/client';
import { parseApolloErrors } from './apollo-errors-parser'

describe('tests to cover the functionality of the apollo error parsing utility', () => {
    it('should return the same Error object', () => {
        const originalError = new Error();
        expect(parseApolloErrors(originalError)).toBe(originalError);
    });
    it('should return a new AggregateError object', () => {
        const originalApolloError = new ApolloError({});
        expect(parseApolloErrors(originalApolloError)).toBeInstanceOf(AggregateError);
    });    
});
