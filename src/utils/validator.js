export const isValidMeetId = (id) => {
    id = (id || "").trim()
    if (!id) return false;
    const words = id?.split("-")
    if (words.length !== 3) return false;
    return (words[0].length === 3) && (words[1].length === 4) && (words[2].length === 3)
}

export const generateNewMeetId = () => {
    const alphabets = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]
    const pattern = [["*", "*", "*"], ["*", "*", "*", "*"], ["*", "*", "*"]];

    return pattern.map(e => e.map(_ => alphabets[Math.floor(Math.random() * 26)]).join("")).join("-")
}















