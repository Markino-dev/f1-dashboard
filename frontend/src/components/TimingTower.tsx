'use client';

import React from 'react';
import { useF1Data } from '@/hooks/useF1Data';
import { formatTeamColor, cn } from '@/lib/utils';

export function TimingTower() {
    const { data, isLoading, isError } = useF1Data();

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
        <div className="w-full max-w-4xl mx-auto overflow-hidden bg-zinc-900 border border-zinc-800 rounded-lg shadow-2xl">
            <div className="bg-zinc-800 px-4 py-2 flex justify-between items-center border-b border-zinc-700">
                <span className="text-white font-black italic tracking-wider text-sm">TIMING TOWER</span>
                <span className="text-red-500 font-mono text-xs animate-pulse">● LIVE REPLAY</span>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-zinc-900 text-zinc-500 text-[10px] uppercase tracking-widest border-b border-zinc-800">
                            <th className="px-4 py-2 font-medium w-12 text-center">POS</th>
                            <th className="px-4 py-2 font-medium">DRIVER</th>
                            <th className="px-4 py-2 font-medium">GAP</th>
                            <th className="px-4 py-2 font-medium">INTERVAL</th>
                            <th className="px-4 py-2 font-medium">S1</th>
                            <th className="px-4 py-2 font-medium">S2</th>
                            <th className="px-4 py-2 font-medium">S3</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-800/50">
                        {data.map((item) => (
                            <tr key={item.driver?.racingNumber || item.position} className="hover:bg-zinc-800/30 transition-colors">
                                <td className="px-4 py-3 text-center font-black text-zinc-400 text-sm italic">
                                    {item.position}
                                </td>
                                <td className="px-4 py-3">
                                    <div className="flex items-center gap-3">
                                        <div
                                            className="w-1 h-6 rounded-full"
                                            style={{ backgroundColor: formatTeamColor(item.driver?.teamColour || '555') }}
                                        />
                                        <div>
                                            <div className="text-white font-bold leading-none tracking-tight">
                                                {item.driver?.tla || '???'}
                                            </div>
                                            <div className="text-zinc-500 text-[10px] uppercase font-medium mt-1">
                                                {item.driver?.teamName || 'Unknown Team'}
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-4 py-3 font-mono text-xs text-zinc-300">
                                    {item.gapToLeader || '--'}
                                </td>
                                <td className="px-4 py-3 font-mono text-xs text-zinc-400">
                                    {item.intervalToPositionAhead?.value || '--'}
                                </td>
                                {['0', '1', '2'].map((sIdx) => (
                                    <td key={sIdx} className="px-4 py-3">
                                        <div className={cn(
                                            "w-2 h-2 rounded-full mx-auto",
                                            item.sectors[sIdx]?.overallFastest ? "bg-purple-500 shadow-[0_0_8px_rgba(168,85,247,0.5)]" :
                                                item.sectors[sIdx]?.personalFastest ? "bg-green-500" :
                                                    item.sectors[sIdx]?.value ? "bg-yellow-500" : "bg-zinc-700"
                                        )} />
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
