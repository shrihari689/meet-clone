export const isDevMode = () => process.env.NODE_ENV === "development"


export const getOrderedPeoples = (users, user) => {
    const peoples = [...users];
    const me = peoples
        .splice(peoples.findIndex(e => e.id === user.id), 1)
        .map(e => ({ ...e, name: e.name + " (You)" }));
    peoples.sort((a, b) => a.name < b.name ? -1 : 1)
    const orderedOnes = [...me, ...peoples];
    return orderedOnes
}