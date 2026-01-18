import React from 'react';
import {
    ShieldCheck,
    AlertTriangle,
    AlertOctagon,
    FileText,
    Activity,
    Globe,
    Search
} from 'lucide-react';
import { mockUser, mockInterventions, mockSafetyAlerts, SafetyAlert } from '@/lib/mock-data';
import { Badge } from '@/components/ui/badge';

export function SafetyCenter() {
    const activeAlerts = mockSafetyAlerts;
    const interventions = mockInterventions.filter(i => i.status === 'active');

    function getSeverityColor(level: SafetyAlert['severity']) {
        switch (level) {
            case 'risk': return 'text-red-600 bg-red-100 border-red-200';
            case 'caution': return 'text-amber-600 bg-amber-100 border-amber-200';
            case 'safe': return 'text-green-600 bg-green-100 border-green-200';
            default: return 'text-slate-600 bg-slate-100 border-slate-200';
        }
    }

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-3xl font-serif font-medium flex items-center gap-3">
                        <ShieldCheck className="w-8 h-8 text-primary" />
                        Safety Command Center
                    </h2>
                    <p className="text-muted-foreground mt-1">
                        Real-time monitoring of your interventions against global safety databases.
                    </p>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-card border rounded-full shadow-sm text-sm">
                    <span className="relative flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                    </span>
                    System Active • Last scan: 2 mins ago
                </div>
            </div>

            {/* Main Grid */}
            <div className="grid lg:grid-cols-3 gap-6">

                {/* Left Col: Interaction Matrix */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="rounded-xl border border-border bg-card p-6">
                        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                            <Activity className="w-5 h-5 text-indigo-500" />
                            Personal Interaction Matrix
                        </h3>

                        {/* Active Substances Grid */}
                        <div className="grid gap-3">
                            {interventions.map((item) => (
                                <div key={item.id} className="flex items-center justify-between p-3 rounded-lg border border-border/50 bg-background/50">
                                    <div className="flex items-center gap-3">
                                        <div className={`w-2 h-2 rounded-full ${item.tier >= 3 ? 'bg-amber-500' : 'bg-green-500'
                                            }`} />
                                        <span className="font-medium">{item.name}</span>
                                        <Badge variant="outline" className="text-xs">{item.tradition}</Badge>
                                    </div>

                                    {item.interactions.length > 0 ? (
                                        <div className="flex items-center gap-2 text-amber-600 text-sm font-medium">
                                            <AlertTriangle className="w-4 h-4" />
                                            {item.interactions.length} Interactions
                                        </div>
                                    ) : (
                                        <div className="flex items-center gap-2 text-green-600 text-sm">
                                            <ShieldCheck className="w-4 h-4" />
                                            Clear
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Global Regulatory Feed */}
                    <div className="rounded-xl border border-border bg-card p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold flex items-center gap-2">
                                <Globe className="w-5 h-5 text-blue-500" />
                                Global Regulatory Feed
                            </h3>
                            <div className="relative">
                                <Search className="absolute left-2 top-1/2 -translate-y-1/2 w-3 h-3 text-muted-foreground" />
                                <input
                                    placeholder="Filter alerts..."
                                    className="pl-7 pr-3 py-1 text-xs bg-muted rounded-md border-none focus:ring-1 focus:ring-primary outline-none"
                                />
                            </div>
                        </div>

                        <div className="space-y-4">
                            {activeAlerts.map((alert) => (
                                <div key={alert.id} className="flex gap-4 p-4 rounded-lg bg-background border border-border/50 hover:border-border transition-colors">
                                    <div className={`mt-1 p-2 rounded-lg h-fit ${getSeverityColor(alert.severity)}`}>
                                        {alert.severity === 'risk' ? <AlertOctagon className="w-5 h-5" /> :
                                            alert.severity === 'caution' ? <AlertTriangle className="w-5 h-5" /> :
                                                <ShieldCheck className="w-5 h-5" />}
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-center justify-between mb-1">
                                            <h4 className="font-medium">{alert.title}</h4>
                                            <span className="text-xs text-muted-foreground">{new Date(alert.timestamp).toLocaleDateString()}</span>
                                        </div>
                                        <p className="text-sm text-muted-foreground mb-2">{alert.description}</p>

                                        <div className="flex flex-wrap gap-2 text-xs">
                                            <span className="px-1.5 py-0.5 bg-muted rounded font-medium">Source: {alert.source}</span>
                                            {alert.substances.map(s => (
                                                <span key={s} className="px-1.5 py-0.5 border border-border rounded text-muted-foreground">{s}</span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right Col: Quick Actions & Status */}
                <div className="space-y-6">
                    <div className="rounded-xl border border-border bg-card p-6">
                        <h3 className="font-semibold mb-4">Escalation Protocols</h3>
                        <div className="space-y-3">
                            <button className="w-full flex items-center justify-between p-3 rounded-lg border border-red-200 bg-red-50 hover:bg-red-100 transition-colors text-red-700">
                                <span className="font-medium flex items-center gap-2">
                                    <AlertOctagon className="w-4 h-4" />
                                    Emergency
                                </span>
                                <span className="text-xs bg-white/50 px-2 py-1 rounded">Call 911</span>
                            </button>
                            <button className="w-full flex items-center justify-between p-3 rounded-lg border border-amber-200 bg-amber-50 hover:bg-amber-100 transition-colors text-amber-700">
                                <span className="font-medium flex items-center gap-2">
                                    <AlertTriangle className="w-4 h-4" />
                                    Contact Practitioner
                                </span>
                                <span className="text-xs bg-white/50 px-2 py-1 rounded">Avg 15m</span>
                            </button>
                        </div>
                    </div>

                    <div className="rounded-xl border border-border bg-card p-6">
                        <h3 className="font-semibold mb-4">Monitoring Documents</h3>
                        <ul className="space-y-2">
                            {['Latest Blood Panel', 'Practitioner Notes', 'Safety Consent Form'].map((doc, i) => (
                                <li key={i} className="flex items-center gap-2 text-sm p-2 hover:bg-muted rounded cursor-pointer transition-colors">
                                    <FileText className="w-4 h-4 text-muted-foreground" />
                                    <span>{doc}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

            </div>
        </div>
    );
}
