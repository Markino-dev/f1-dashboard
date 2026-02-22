import useSWR from 'swr';
import { DriverList, TimingData, MergedDriverData } from '@/types/f1';

const API_BASE = 'https://f1-dashboard-9k7e.onrender.com';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function useF1Data() {
    const { data: drivers, error: driverError } = useSWR<DriverList>(
        `${API_BASE}/data/DriverList/latest`,
        fetcher,
        { refreshInterval: 10000 } // Driver list doesn't change often
    );

    const { data: timing, error: timingError } = useSWR<TimingData>(
        `${API_BASE}/data/TimingData/latest`,
        fetcher,
        { refreshInterval: 1000 } // Timing updates every second
    );

    const isLoading = !drivers || !timing;
    const isError = driverError || timingError;

    // Merge the data
    const mergedData: MergedDriverData[] = [];

    if (drivers && timing && timing.lines) {
        Object.keys(timing.lines).forEach((number) => {
            const timingLine = timing.lines[number];
            const driverInfo = drivers[number];

            mergedData.push({
                ...timingLine,
                driver: driverInfo,
            });
        });
    }

    // Sort by position
    const sortedData = mergedData.sort((a, b) => {
        const posA = parseInt(a.position) || 99;
        const posB = parseInt(b.position) || 99;
        return posA - posB;
    });

    return {
        data: sortedData,
        isLoading,
        isError,
    };
}
