import { Editor } from 'tldraw';
export declare class DagAdaptor {
    private editor;
    constructor(editor: Editor);
    /**
     * Import DAG text format and create visual representation in tldraw
     * @throws Error when DAG text format is invalid
     */
    import(dagText: string): void;
    /**
     * Export current tldraw shapes back to DAG text format
     * @throws Error when shapes cannot be converted to valid DAG
     */
    export(): string;
    private clearCanvas;
    private createVisualDAG;
    private calculateLayout;
    private reduceCrossings;
    private resolveNodeCollisions;
    private centerDAG;
    private adjustForEdgeMinimization;
    private resolveNodeEdgeCollisions;
    private lineIntersectsRect;
    private linesIntersect;
    private extractDAGFromCanvas;
    private getNodeColor;
}
export declare function createDagAdaptor(editor: Editor): DagAdaptor;
//# sourceMappingURL=dag-adaptor.d.ts.map