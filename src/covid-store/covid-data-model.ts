export interface CovidData {
    regions: Record<string, CovidDataCountry>;
}

export interface CovidDataCountry {
    country: string;
    stateData?: Record<string, CovidDataEntry>;
    data?: CovidDataEntry;
}

export interface CovidDataEntry {
    country: string;
    state?: string;
    lat?: number;
    long?: number;
    cases: number[];
}
