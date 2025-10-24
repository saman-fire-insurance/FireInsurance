/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Probability } from './Probability';
import type { WeatherCondition } from './WeatherCondition';
export type AddIncidentInfoToClaimRequest = {
    damageClaimId?: string;
    incidentTypeId?: string;
    occuranceDate?: string;
    provinceId?: string;
    cityId?: string;
    address?: string | null;
    postalCode?: string | null;
    ownershipTypeId?: string;
    incidentCause?: string | null;
    restraintDescription?: string | null;
    incidentImageFileIds?: Array<string> | null;
    hasPoliceReport?: boolean;
    policeReportNumber?: string | null;
    policeReportDate?: string | null;
    policeReportFileIds?: Array<string> | null;
    hasFireStationReport?: boolean;
    fireStationName?: string | null;
    fireStationReportFileIds?: Array<string> | null;
    hasWeatherReport?: boolean;
    weatherCondition?: WeatherCondition;
    weatherReportProbability?: Probability;
};

