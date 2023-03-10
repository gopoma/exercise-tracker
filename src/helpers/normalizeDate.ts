function normalizeDate(date: string): Date {
    const tmp = new Date(date);

    const result = new Date(tmp.getFullYear(), tmp.getMonth(), tmp.getDate() + 1);

    return result;
}

export default normalizeDate;
