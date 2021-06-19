export const isDevMode = () => process.env.NODE_ENV === "development"


export const getOrderedPeoples = (users, refId) => {
    if (!refId) return users;
    const peoples = [...users];
    const me = peoples
        .splice(peoples.findIndex(e => e.refId === refId), 1)
        .map(e => ({ ...e, name: e.name + " (You)" }));
    peoples.sort((a, b) => a.name < b.name ? -1 : 1)
    const orderedOnes = [...me, ...peoples];
    return orderedOnes
}

export const groupMessage = (messages = []) => {
    if (messages.length === 0) return [];

    let lastMessage;
    let grouped = [];
    messages.forEach(e => {
        const user = e.sender.id;
        const { time, text } = e;
        if (!lastMessage) {
            grouped.push(e)
        } else if (lastMessage.user === user && lastMessage.time === time) {
            grouped[grouped.length - 1] = {
                ...grouped[grouped.length - 1],
                text: grouped[grouped.length - 1].text + "\n" + text
            };
        } else {
            grouped.push(e)
        }
        lastMessage = { user, time, text };
    })
    return grouped;
}