export interface DriverInfo {
  racingNumber: string;
  broadcastName: string;
  fullName: string;
  tla: string;
  line: number;
  teamName: string;
  teamColour: string;
  isSelected: boolean;
}

export interface DriverList {
  [key: string]: DriverInfo;
}

export interface Sector {
  value: string;
  overallFastest: boolean;
  personalFastest: boolean;
  segments: {
    [key: string]: {
      status: string | number;
    };
  };
}

export interface LapTime {
  value: string;
  overallFastest: boolean;
  personalFastest: boolean;
}

export interface TimingLine {
  gapToLeader: string;
  intervalToPositionAhead: {
    value: string;
    catching: boolean;
  };
  line: number;
  position: string;
  inPit: boolean;
  pitOut: boolean;
  numberOfPitStops: number | null;
  isPitLap: boolean;
  lastLapTime: LapTime & { segments: any };
  sectors: {
    [key: string]: Sector;
  };
  bestLapTime: {
    value: string;
    lap: number | null;
  };
  retired: boolean;
  stopped: boolean;
  status: number;
}

export interface TimingData {
  liveTimingDataType: string;
  lines: {
    [key: string]: TimingLine;
  };
}

export interface MergedDriverData extends TimingLine {
  driver?: DriverInfo;
}
