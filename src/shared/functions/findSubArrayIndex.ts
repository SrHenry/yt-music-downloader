export function findSubArrayIndex(
    mainArray: unknown[],
    subArray: unknown[]
): number {
    if (!Array.isArray(mainArray) || !Array.isArray(subArray)) {
        return -1; // Handle invalid inputs
    }

    if (subArray.length === 0) {
        return 0; // An empty subarray is considered found at index 0
    }

    if (subArray.length > mainArray.length) {
        return -1; // Subarray cannot be longer than the main array
    }

    for (let i = 0; i <= mainArray.length - subArray.length; i++) {
        let match = true;
        for (let j = 0; j < subArray.length; j++) {
            if (mainArray[i + j] !== subArray[j]) {
                match = false;
                break;
            }
        }
        if (match) {
            return i; // Return the starting index if a match is found
        }
    }

    return -1; // Return -1 if the subarray is not found
}
