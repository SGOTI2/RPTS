export function join(...classNames: string[]): string {
    return classNames.join(" ")
}
/**
 * Class Name When  
 * String followed by a condition to when it applies
 */
export function cnw(...data: (string | boolean)[]): string {
    let final: string[] = [];
    let last: (string | boolean) = "";
    data.forEach((value) => {
        if (typeof value == "string") {
            if (typeof last == "string") final.push(last); // String follows string, first string has no condition and is added
            last = value;
            return;
        }
        if (value) {
            if (typeof last == "string") final.push(last);
            else throw "A condition cannot follow another condition";
        }
        last = value;
    })
    if (typeof last == "string") final.push(last); // No condition on last string
    return final.join(" ");
}