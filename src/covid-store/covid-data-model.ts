export interface CovidData {
    regions: Record<string, CovidDataEntry[]>;
}

export interface CovidDataEntry {
    state?: string;
    country: string;
    lat?: number;
    long?: number;
    cases: number[];
}
