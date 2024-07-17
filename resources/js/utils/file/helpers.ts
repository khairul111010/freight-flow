import { ComponentType, lazy } from 'react'

export const lazyModuleImport = (
    importModule: Promise<any>,
    componentName: any
): ComponentType<any> =>
    lazy(() => importModule.then((module) => ({ default: module[componentName] })))

export const formatSize = (size: number) => {
    const kiloBytes = size / 1024
    const megaBytes = kiloBytes / 1024

    if (megaBytes >= 1) {
        return `${megaBytes.toFixed(2)} MB`
    } else if (kiloBytes >= 1) {
        return `${kiloBytes.toFixed(2)} KB`
    } else {
        return `${size} Bytes`
    }
}

export const removeDuplicates = (arr: any[], prop: any) => {
    const unique = new Set()
    return arr.filter((obj: any) => {
        const isUnique = !unique.has(obj[prop])
        if (isUnique) {
            unique.add(obj[prop])
        }
        return isUnique
    })
}

export const NumberToWordsConverter = (n: number): string => {
    if (n < 0) return "Negative";

    const single_digit: string[] = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine'];
    const double_digit: string[] = ['Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];
    const below_hundred: string[] = ['Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];

    if (n === 0) return 'Zero';

    function translate(num: number): string {
        let word = "";
        if (num < 10) {
            word = single_digit[num] + ' ';
        } else if (num < 20) {
            word = double_digit[num - 10] + ' ';
        } else if (num < 100) {
            const remainder = translate(num % 10);
            word = below_hundred[Math.floor(num / 10) - 2] + ' ' + remainder;
        } else if (num < 1000) {
            word = single_digit[Math.floor(num / 100)] + ' Hundred ' + translate(num % 100);
        } else if (num < 1000000) {
            word = translate(Math.floor(num / 1000)) + ' Thousand ' + translate(num % 1000);
        } else if (num < 1000000000) {
            word = translate(Math.floor(num / 1000000)) + ' Million ' + translate(num % 1000000);
        } else {
            word = translate(Math.floor(num / 1000000000)) + ' Billion ' + translate(num % 1000000000);
        }
        return word.trim();
    }

    const result: string = translate(n);
    return result + '.';
}


export const countWeekdays = (startTimestamp: number, endTimestamp: number) => {
    // Convert timestamps to Date objects
    const startDate = new Date(startTimestamp)
    const endDate = new Date(endTimestamp)

    // Initialize counter
    let count = 0

    // Iterate over each day between start and end dates
    for (
        let date = new Date(startDate);
        date <= endDate;
        date.setDate(date.getDate() + 1)
    ) {
        // Check if the current day is not a Saturday or Sunday
        if (date.getDay() !== 0 && date.getDay() !== 6) {
            count++
        }
    }

    // if leave request is for 2 days and starts on Friday and ends on Monday then it should be counted as 4 days
    // if (
    //     count === 2 &&
    //     new Date(startTimestamp).getDay() === 5 &&
    //     new Date(endTimestamp).getDay() === 1
    // ) {
    //     count = 4
    // }

    return count
}


export const calculateAge = (milliseconds: number) => {
    // Convert milliseconds to a Date object
    const birthDate = new Date(milliseconds);

    // Get the current date
    const currentDate = new Date();

    // Calculate the difference in years
    let age = currentDate.getFullYear() - birthDate.getFullYear();

    // Adjust if the current date is before the birthday in the current year
    const monthDifference = currentDate.getMonth() - birthDate.getMonth();
    const dayDifference = currentDate.getDate() - birthDate.getDate();

    if (monthDifference < 0 || (monthDifference === 0 && dayDifference < 0)) {
        age--;
    }

    return age;
}

