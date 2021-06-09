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