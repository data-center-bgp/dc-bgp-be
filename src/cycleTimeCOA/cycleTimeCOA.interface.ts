export interface CreateCycleTimeCOA {
    userId: string;
    startDate: Date;
    year: number;
    month: string;
    trip: number;
    fleet: string;
    tugboatOrSpob: string;
    obOrSpob: string;
    route: string;
    estimatedFuel?: number;
    actualFuel?: number;
    distance?: number;
    startFromJettyLoading?: Date;
    orderAssistTugboatEntryJettyLoading?: Date;
    startAnchorUpJettyLoading?: Date;
    finishAnchorUpJettyLoading?: Date;
    assistConnectEntryJettyLoading?: Date;
    berthingJettyLoading?: Date;
    loadingMasterOnboardJettyLoading?: Date;
    startLoadingJettyLoading?: Date;
    finishLoadingJettyLoading?: Date;
    startSoundingJettyLoading?: Date;
    finishSoundingJettyLoading?: Date;
    orderAssistTugboatExitJettyLoading?: Date;
    assistConnectExitJettyLoading?: Date;
    castOffJettyLoading?: Date;
    fullAwaySTS?: Date;
    arrivedAtSTS?: Date;
    orderAssistTugboatEntrySTS?: Date;
    assistConnectEntrySTS?: Date;
    berthingSTS?: Date;
    loadingMasterOnboardSTS?: Date;
    startLoadingSTS?: Date;
    finishLoadingSTS?: Date;
    startSoundingSTS?: Date;
    finishSoundingSTS?: Date;
    orderAssistTugboatExitSTS?: Date;
    assistConnectExitSTS?: Date;
    castOffSTS?: Date;
    fullAwayJettyDischarge?: Date;
    arrivedAtJettyDischarge?: Date;
    orderAssistTugboatEntryJettyDischarge?: Date;
    startAnchorUpJettyDischarge?: Date;
    finishAnchorUpJettyDischarge?: Date;
    assistConnectEntryJettyDischarge?: Date;
    berthingJettyDischarge?: Date;
    loadingMasterOnboardJettyDischarge?: Date;
    startDischargeJettyDischarge?: Date;
    finishDischargeJettyDischarge?: Date;
    documentCargoOnboardJettyDischarge?: Date;
    orderAssistTugboatExitJettyDischarge?: Date;
    assistConnectExitJettyDischarge?: Date;
    castOffJettyDischarge?: Date;
    arrivedInPulauAtas?: Date;
    fullAwayAfterDischarge?: Date;
    finishInJettyLoading?: Date;
}

export interface EditCycleTimeCOA {
    userId?: string;
    startDate?: Date;
    year?: number;
    month?: string;
    trip?: number;
    fleet?: string;
    tugboatOrSpob?: string;
    obOrSpob?: string;
    route?: string;
    estimatedFuel?: number;
    actualFuel?: number;
    distance?: number;
    startFromJettyLoading?: Date;
    orderAssistTugboatEntryJettyLoading?: Date;
    startAnchorUpJettyLoading?: Date;
    finishAnchorUpJettyLoading?: Date;
    assistConnectEntryJettyLoading?: Date;
    berthingJettyLoading?: Date;
    loadingMasterOnboardJettyLoading?: Date;
    startLoadingJettyLoading?: Date;
    finishLoadingJettyLoading?: Date;
    startSoundingJettyLoading?: Date;
    finishSoundingJettyLoading?: Date;
    orderAssistTugboatExitJettyLoading?: Date;
    assistConnectExitJettyLoading?: Date;
    castOffJettyLoading?: Date;
    fullAwaySTS?: Date;
    arrivedAtSTS?: Date;
    orderAssistTugboatEntrySTS?: Date;
    assistConnectEntrySTS?: Date;
    berthingSTS?: Date;
    loadingMasterOnboardSTS?: Date;
    startLoadingSTS?: Date;
    finishLoadingSTS?: Date;
    startSoundingSTS?: Date;
    finishSoundingSTS?: Date;
    orderAssistTugboatExitSTS?: Date;
    assistConnectExitSTS?: Date;
    castOffSTS?: Date;
    fullAwayJettyDischarge?: Date;
    arrivedAtJettyDischarge?: Date;
    orderAssistTugboatEntryJettyDischarge?: Date;
    startAnchorUpJettyDischarge?: Date;
    finishAnchorUpJettyDischarge?: Date;
    assistConnectEntryJettyDischarge?: Date;
    berthingJettyDischarge?: Date;
    loadingMasterOnboardJettyDischarge?: Date;
    startDischargeJettyDischarge?: Date;
    finishDischargeJettyDischarge?: Date;
    documentCargoOnboardJettyDischarge?: Date;
    orderAssistTugboatExitJettyDischarge?: Date;
    assistConnectExitJettyDischarge?: Date;
    castOffJettyDischarge?: Date;
    arrivedInPulauAtas?: Date;
    fullAwayAfterDischarge?: Date;
    arrivedInLoadingDock_2?: Date;
}
