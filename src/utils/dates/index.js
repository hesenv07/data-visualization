export const desiredYear = (monthsCount) => {
    const currentDate = new Date();
    const futureDate = new Date();

    futureDate.setMonth(currentDate.getMonth() + monthsCount);
    const day = String(futureDate.getDate()).padStart(2, '0');
    const month = String(futureDate.getMonth() + 1).padStart(2, '0');
    const year = String(futureDate.getFullYear());

    return `${day}/${month}/${year}`;
}