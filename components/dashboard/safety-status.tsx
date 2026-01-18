import React from 'react';
import { ShieldCheck, AlertTriangle, AlertOctagon, ChevronRight } from 'lucide-react';
import { mockUser, mockSafetyAlerts } from '@/lib/mock-data';

export function SafetyStatusWidget() {
    const status = mockUser.safetyStatus;
    const activeAlerts = mockSafetyAlerts.filter(a => a.severity !== 'safe');

    return (
        <div className="p-6 bg-card border border-border rounded-xl shadow-sm h-full flex flex-col">
            <h3 className="text-lg font-semibold flex items-center gap-2 mb-4">
                <div className="h-6 w-1 bg-caution rounded-full" />
                Safety Status
            </h3>

            {/* Main Status Indicator */}
            <div className={`flex items-center gap-4 p-4 rounded-xl border mb-6 ${status === 'green' ? 'bg-green-500/10 border-green-500/20' :
                    status === 'yellow' ? 'bg-yellow-500/10 border-yellow-500/20' :
                        'bg-red-500/10 border-red-500/20'
                }`}>
                <div className={`p-3 rounded-full ${status === 'green' ? 'bg-green-500 text-white' :
                        status === 'yellow' ? 'bg-yellow-500 text-white' :
                            'bg-red-500 text-white'
                    }`}>
                    {status === 'green' && <ShieldCheck className="w-8 h-8" />}
                    {status === 'yellow' && <AlertTriangle className="w-8 h-8" />}
                    {status === 'red' && <AlertOctagon className="w-8 h-8" />}
                </div>
                <div>
                    <h4 className="text-lg font-bold capitalize">{status} Status</h4>
                    <p className="text-sm opacity-80">
                        {status === 'green' ? 'No critical interactions detected.' :
                            status === 'yellow' ? 'Monitor active interactions.' :
                                'Immediate attention required.'}
                    </p>
                </div>
            </div>

            {/* Active Alerts List */}
            <div className="flex-1 space-y-3">
                <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
                    <span>Active Alerts</span>
                    <span className="bg-muted px-2 py-0.5 rounded text-xs">{activeAlerts.length}</span>
                </div>

                {activeAlerts.slice(0, 3).map(alert => (
                    <div key={alert.id} className="group flex items-start gap-3 p-3 rounded-lg border border-border hover:bg-accent/5 transition-colors cursor-pointer">
                        <AlertTriangle className={`w-4 h-4 mt-0.5 shrink-0 ${alert.severity === 'risk' ? 'text-red-500' : 'text-yellow-500'
                            }`} />
                        <div className="flex-1 min-w-0">
                            <h5 className="text-sm font-medium truncate">{alert.title}</h5>
                            <p className="text-xs text-muted-foreground line-clamp-1">{alert.description}</p>
                        </div>
                        <ChevronRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                ))}
            </div>

            <button className="mt-4 w-full py-2 text-sm font-medium text-primary hover:bg-primary/5 rounded-lg border border-transparent hover:border-primary/20 transition-all">
                View Safety Command Center
            </button>
        </div>
    );
}
