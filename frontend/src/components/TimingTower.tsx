'use client';

import React from 'react';
import { useF1Data } from '@/hooks/useF1Data';
import { formatTeamColor, cn } from '@/lib/utils';

const getTyreColor = (compound?: string) => {
    switch (compound?.toUpperCase()) {
        case 'SOFT': return 'bg-red-600 outline-red-600/50';
        case 'MEDIUM': return 'bg-yellow-500 outline-yellow-500/50';
        case 'HARD': return 'bg-white outline-white/50';
        case 'INTERMEDIATE': return 'bg-green-600 outline-green-600/50';
        case 'WET': return 'bg-blue-600 outline-blue-600/50';
        default: return 'bg-zinc-700 outline-zinc-700/50';
    }
};

export function TimingTower() {
    const { data, lapCount, isLoading, isError } = useF1Data();

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-64 bg-black/50 rounded-lg animate-pulse">
                <p className="text-white/50 font-mono">LOADING TELEMETRY...</p>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="p-4 bg-red-900/20 border border-red-500/50 rounded-lg">
                <p className="text-red-400 font-mono">CONNECTION LOST: RETRYING...</p>
            </div>
        );
    }

    return (
        <div className="w-full max-w-6xl mx-auto overflow-hidden bg-black border border-zinc-800 rounded-lg shadow-2xl">
            <div className="bg-zinc-900 px-4 py-3 flex justify-between items-center border-b border-zinc-800">
                <div className="flex items-center gap-4">
                    <span className="text-white font-black italic tracking-wider text-lg">TIMING TOWER</span>
                    {lapCount && (
                        <span className="bg-white/10 text-white px-3 py-1 rounded-sm font-mono text-sm tracking-widest font-bold">
                            LAP {lapCount.currentLap} / {lapCount.totalLaps}
                        </span>
                    )}
                </div>
                <div className="flex items-center gap-2">
                    <span className="text-red-500 text-xs px-2 py-1 rounded border border-red-500/30 bg-red-500/10 font-black italic tracking-widest">LIVE STREAM</span>
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse table-fixed">
                    <thead>
                        <tr className="bg-zinc-900 text-zinc-500 text-[10px] uppercase tracking-widest border-b border-zinc-800">
                            <th className="px-3 py-2 font-black w-12 text-center">POS</th>
                            <th className="px-3 py-2 font-black w-48">DRIVER</th>
                            <th className="px-3 py-2 font-black w-24">LAST LAP</th>
                            <th className="px-3 py-2 font-black w-20">GAP</th>
                            <th className="px-3 py-2 font-black w-20 text-center">TYRE</th>
                            <th className="px-3 py-2 font-black w-20 text-center">S1</th>
                            <th className="px-3 py-2 font-black w-20 text-center">S2</th>
                            <th className="px-3 py-2 font-black w-20 text-center">S3</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-900">
                        {data.map((item) => {
                            const latestStint = item.appData?.stints
                                ? Object.values(item.appData.stints).pop()
                                : null;

                            return (
                                <tr key={item.driver?.racingNumber || item.position} className="hover:bg-zinc-900/50 transition-colors h-12">
                                    <td className="px-3 py-1 text-center font-black text-zinc-400 text-sm italic">
                                        {item.position}
                                    </td>
                                    <td className="px-3 py-1">
                                        <div className="flex items-center gap-2">
                                            <div
                                                className="w-1 h-5 rounded-sm shrink-0"
                                                style={{ backgroundColor: formatTeamColor(item.driver?.teamColour || '555') }}
                                            />
                                            <div className="flex items-center gap-1.5 min-w-0">
                                                <span className={cn(
                                                    "text-white font-black tracking-tighter truncate text-base",
                                                    item.isFastestLap && "text-purple-400"
                                                )}>
                                                    {item.driver?.tla || '???'}
                                                </span>
                                                {item.isFastestLap && <span className="text-sm">⏱️</span>}
                                                {item.inPit && (
                                                    <span className="bg-red-600 text-white text-[9px] font-black px-1 rounded-sm animate-pulse tracking-tighter">PIT</span>
                                                )}
                                            </div>
                                        </div>
                                    </td>
                                    <td className={cn(
                                        "px-3 py-1 font-mono text-sm font-bold tracking-tighter",
                                        item.isFastestLap ? "text-purple-400" : "text-white"
                                    )}>
                                        {item.lastLapTime?.value || '--'}
                                    </td>
                                    <td className="px-3 py-1 font-mono text-[11px] text-zinc-400 font-bold uppercase tracking-tighter">
                                        {item.gapToLeader === "TOP" ? "INTERVAL" : (item.gapToLeader || '--')}
                                    </td>
                                    <td className="px-3 py-1">
                                        <div className="flex flex-col items-center justify-center leading-none">
                                            <div className={cn(
                                                "w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-black outline outline-2 outline-offset-1 shrink-0",
                                                getTyreColor(latestStint?.compound),
                                                latestStint?.compound?.toUpperCase() === 'HARD' ? "text-black" : "text-white"
                                            )}>
                                                {latestStint?.compound?.charAt(0) || '?'}
                                            </div>
                                            <span className="text-[8px] text-zinc-500 font-bold mt-1.5 uppercase">L{latestStint?.totalLaps || 0}</span>
                                        </div>
                                    </td>
                                    {['0', '1', '2'].map((sIdx) => {
                                        const sector = item.sectors[sIdx];
                                        return (
                                            <td key={sIdx} className="px-2 py-1">
                                                <div className={cn(
                                                    "font-mono text-xs font-black text-center py-1 rounded-sm transition-colors",
                                                    sector?.overallFastest ? "text-purple-400 bg-purple-400/10 shadow-[inset_0_0_10px_rgba(168,85,247,0.1)]" :
                                                        sector?.personalFastest ? "text-green-500 bg-green-500/10" :
                                                            sector?.value ? "text-yellow-500 bg-yellow-500/10" : "text-zinc-600 bg-zinc-800/20"
                                                )}>
                                                    {sector?.value || '--'}
                                                </div>
                                            </td>
                                        );
                                    })}
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
