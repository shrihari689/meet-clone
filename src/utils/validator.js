export const isValidMeetId = (id) => {
    id = (id || "").trim()
    if (!id) return false;
    const words = id?.split("-")
    if (words.length !== 3) return false;
    return (words[0].length === 3) && (words[1].length === 4) && (words[2].length === 3)
}