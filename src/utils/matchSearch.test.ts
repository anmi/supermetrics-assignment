import { matchSearch } from "./matchSearch"

test('should match text', () => {
    expect(matchSearch('foo', 'Foo Bar')).toBe(true)
    expect(matchSearch('foo', '0 Foo Bar')).toBe(true)
    expect(matchSearch('OO', 'Foo Bar')).toBe(true)
    expect(matchSearch('foo', 'Fo Bar')).toBe(false)
})