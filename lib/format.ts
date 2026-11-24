export function formatBanglaNumber(value: number): string {
    return new Intl.NumberFormat("bn-BD", {
        maximumFractionDigits: 1,
    }).format(value);
}

export function formatUnit(unit: string): string {
    const units: Record<string, string> = {
        kg: "কেজি",
        liter: "লিটার",
        l: "লিটার",
        piece: "পিস",
        pcs: "পিস",
        dozen: "ডজন",
    };

    return units[unit.toLowerCase()] ?? unit;
}
