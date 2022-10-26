import { isSome } from "./isSome";

export function classes(names: (string | undefined | false | null)[]): string {
    return names.filter(isSome).join(' ')
}
