"use strict";
/**
 * This Node program reads text from standard input, computes the frequency
 * of each letter in that text, and displays a histogram of the most
 * frequently used characters. It requires Node 12 or higher to run.
 *
 * In a Unix-type environment you can invoke the program like this:
 *    node charfreq.js < corpus.txt
 */
// This class extends Map so that the get() method returns the specified
// value instead of null when the key is not in the map
class DefaultMap extends Map {
    constructor(defaultValue) {
        super(); // Invoke superclass constructor
        this.defaultValue = defaultValue; // Remember the default value
    }
    get(key) {
        if (this.has(key)) {
            // If the key is already in the map
            return super.get(key); // return its value from superclass.
        }
        else {
            return this.defaultValue; // Otherwise return the default value
        }
    }
}
// This class computes and displays letter frequency histograms
class Histogram {
    constructor() {
        this.letterCounts = new DefaultMap(0); // Map from letters to counts
        this.totalLetters = 0; // How many letters in all
    }
    // This function updates the histogram with the letters of text.
    add(text) {
        // Remove whitespace from the text, and convert to upper case
        text = text.replace(/\s/g, '').toUpperCase();
        // Now loop through the characters of the text
        for (let character of text) {
            let count = this.letterCounts.get(character); // Get old count
            this.letterCounts.set(character, count + 1); // Increment it
            this.totalLetters++;
        }
    }
    // Convert the histogram to a string that displays an ASCII graphic
    toString() {
        // Convert the Map to an array of [key,value] arrays
        let entries = [...this.letterCounts];
        // Sort the array by count, then alphabetically
        entries.sort((a, b) => {
            // A function to define sort order.
            if (a[1] === b[1]) {
                // If the counts are the same
                return a[0] < b[0] ? -1 : 1; // sort alphabetically.
            }
            else {
                // If the counts differ
                return b[1] - a[1]; // sort by largest count.
            }
        });
        // Convert the counts to percentages
        for (let entry of entries) {
            entry[1] = (entry[1] / this.totalLetters) * 100;
        }
        // Drop any entries less than 1%
        entries = entries.filter((entry) => entry[1] >= 1);
        // Now convert each entry to a line of text
        let lines = entries.map(([l, n]) => `${l}: ${'#'.repeat(Math.round(n))} ${n.toFixed(2)}%`);
        // And return the concatenated lines, separated by newline characters.
        return lines.join('\n');
    }
}
// This async (Promise-returning) function creates a Histogram object,
// asynchronously reads chunks of text from standard input, and adds those chunks to
// the histogram. When it reaches the end of the stream, it returns this histogram
async function histogramFromStdin() {
    process.stdin.setEncoding('utf-8'); // Read Unicode strings, not bytes
    let histogram = new Histogram();
    for await (let chunk of process.stdin) {
        histogram.add(chunk);
    }
    return histogram;
}
// This one final line of code is the main body of the program.
// It makes a Histogram object from standard input, then prints the histogram.
histogramFromStdin().then((histogram) => {
    console.log(histogram.toString());
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hhcmZyZXEuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJjaGFyZnJlcS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7Ozs7R0FPRztBQUVILHdFQUF3RTtBQUN4RSx1REFBdUQ7QUFDdkQsTUFBTSxVQUFXLFNBQVEsR0FBRztJQUMxQixZQUFZLFlBQWE7UUFDdkIsS0FBSyxFQUFFLENBQUMsQ0FBQyxnQ0FBZ0M7UUFDekMsSUFBSSxDQUFDLFlBQVksR0FBRyxZQUFZLENBQUMsQ0FBQyw2QkFBNkI7SUFDakUsQ0FBQztJQUVELEdBQUcsQ0FBQyxHQUFHO1FBQ0wsSUFBSSxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUM7WUFDbEIsbUNBQW1DO1lBQ25DLE9BQU8sS0FBSyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLG9DQUFvQztRQUM3RCxDQUFDO2FBQU0sQ0FBQztZQUNOLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLHFDQUFxQztRQUNqRSxDQUFDO0lBQ0gsQ0FBQztDQUNGO0FBRUQsK0RBQStEO0FBQy9ELE1BQU0sU0FBUztJQUNiO1FBQ0UsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLDZCQUE2QjtRQUNwRSxJQUFJLENBQUMsWUFBWSxHQUFHLENBQUMsQ0FBQyxDQUFDLDBCQUEwQjtJQUNuRCxDQUFDO0lBRUQsZ0VBQWdFO0lBQ2hFLEdBQUcsQ0FBQyxJQUFJO1FBQ04sNkRBQTZEO1FBQzdELElBQUksR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUU3Qyw4Q0FBOEM7UUFDOUMsS0FBSyxJQUFJLFNBQVMsSUFBSSxJQUFJLEVBQUUsQ0FBQztZQUMzQixJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMs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