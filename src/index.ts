// Main exports for library usage
export { DagTldraw } from './components/DagTldraw'
export type { DagTldrawRef, DagTldrawProps } from './components/DagTldraw'

export { DagAdaptor, createDagAdaptor } from './lib/dag-adaptor'

export type { DAG, DAGNode, DAGEdge, ParsedDAGLine } from './types/dag'
export { parseDAGText, dagToText } from './types/dag'

// Re-export tldraw types that consumers might need
export type { Editor } from 'tldraw'