export interface DAGNode {
    id: string;
    label: string;
    x?: number;
    y?: number;
}
export interface DAGEdge {
    id: string;
    fromNodeId: string;
    toNodeId: string;
    skill?: string;
    maxAssignees?: number;
}
export interface DAG {
    nodes: DAGNode[];
    edges: DAGEdge[];
}
export interface ParsedDAGLine {
    from: string;
    to: string;
    skill?: string;
    maxAssignees?: number;
}
export declare function parseDAGText(text: string): DAG;
export declare function dagToText(dag: DAG): string;
//# sourceMappingURL=dag.d.ts.map