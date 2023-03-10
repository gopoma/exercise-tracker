function normalizeDate(date: string): Date {
    const tmp = new Date(date);

    return new Date(tmp.getFullYear(), tmp.getMonth(), tmp.getDate() + 1);
}

export default normalizeDate;
