import useSWR from 'swr';
import {
    DriverInfo,
    DriverList,
    TimingData,
    MergedDriverData,
    TimingAppData,
    LapCount
} from '@/types/f1';

const API_BASE = 'https://f1-dashboard-9k7e.onrender.com';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function useF1Data() {
    const { data: drivers, error: driverError } = useSWR<DriverList>(
        `${API_BASE}/data/DriverList/latest`,
        fetcher,
        { refreshInterval: 10000 }
    );

    const { data: timing, error: timingError } = useSWR<TimingData>(
        `${API_BASE}/data/TimingData/latest`,
        fetcher,
        { refreshInterval: 1000 }
    );

    const { data: appData, error: appError } = useSWR<TimingAppData>(
        `${API_BASE}/data/TimingAppData/latest`,
        fetcher,
        { refreshInterval: 5000 }
    );

    const { data: lapCount, error: lapError } = useSWR<LapCount>(
        `${API_BASE}/data/LapCount/latest`,
        fetcher,
        { refreshInterval: 5000 }
    );

    const isLoading = !drivers || !timing;
    const isError = driverError || timingError || appError || lapError;

    // Merge the data
    const mergedData: MergedDriverData[] = [];

    if (drivers && timing && timing.lines) {
        Object.keys(timing.lines).forEach((number) => {
            const timingLine = timing.lines[number];
            const driverInfo = drivers[number];
            const driverAppData = appData?.lines?.[number];

            mergedData.push({
                ...timingLine,
                driver: driverInfo,
                appData: driverAppData,
            });
        });
    }

    // Calculate overall fastest lap
    let fastestLapTime: number | null = null;
    let fastestDriverNumber: string | null = null;

    mergedData.forEach((driver) => {
        if (driver.bestLapTime?.value) {
            const parts = driver.bestLapTime.value.split(':');
            const timeInS = parts.length === 2
                ? parseFloat(parts[0]) * 60 + parseFloat(parts[1])
                : parseFloat(parts[0]);

            if (fastestLapTime === null || timeInS < fastestLapTime) {
                fastestLapTime = timeInS;
                fastestDriverNumber = driver.driver?.racingNumber || null;
            }
        }
    });

    const finalData = mergedData.map((d) => ({
        ...d,
        isFastestLap: d.driver?.racingNumber === fastestDriverNumber,
    }));

    // Sort by position
    const sortedData = finalData.sort((a, b) => {
        const posA = parseInt(a.position) || 99;
        const posB = parseInt(b.position) || 99;
        return posA - posB;
    });

    return {
        data: sortedData,
        lapCount,
        isLoading,
        isError,
    };
}
