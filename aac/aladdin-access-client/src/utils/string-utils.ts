// import * as tlog from '@tcw/tlog';

export const swapNameOrder = (name: string ): string => {
    const splitName = name.split(' ');
    const removeComma = splitName[0].slice(0, -1);
    const newName = splitName[1] + " " + removeComma;
    return newName;
}

export const getFirstLetters = (value: string | undefined | null): string[] => {
    if (!value) {
        return ['?'];
    }

    try {
        //First split the string by white spaces.
        //Then get the first char of each value. 
        //If somehow the string is empty/undefined, return an empty string.
        //Filter out any empty strings.
        return value.split(' ').map(v => v?.length ? v.charAt(0) : '').filter(v => v.length);
    } catch (err) {
        // tlog.error(err as Error, 'Error getting first letter of each word.', 'getFirstLetters');
        return ['?'];
    }
}