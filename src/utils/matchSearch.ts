export function matchSearch(search:string, value: string): boolean {
    return value.toLocaleLowerCase().indexOf(search.toLocaleLowerCase()) !== -1;
}