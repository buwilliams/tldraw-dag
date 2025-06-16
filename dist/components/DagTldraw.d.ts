import { Editor } from 'tldraw';
import 'tldraw/tldraw.css';
export interface DagTldrawRef {
    importDAG: (dagText: string) => void;
    exportDAG: () => string;
    getEditor: () => Editor | null;
}
export interface DagTldrawProps {
    onMount?: (editor: Editor) => void;
    onError?: (error: string) => void;
    persistenceKey?: string;
    className?: string;
    style?: React.CSSProperties;
    autoImport?: string;
}
export declare const DagTldraw: import("react").ForwardRefExoticComponent<DagTldrawProps & import("react").RefAttributes<DagTldrawRef>>;
//# sourceMappingURL=DagTldraw.d.ts.map