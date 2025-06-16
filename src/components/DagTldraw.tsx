import { forwardRef, useImperativeHandle, useCallback, useRef, useEffect } from 'react'
import { Tldraw, Editor } from 'tldraw'
import 'tldraw/tldraw.css'
import { createDagAdaptor, DagAdaptor } from '../lib/dag-adaptor'

export interface DagTldrawRef {
  importDAG: (dagText: string) => void
  exportDAG: () => string
  getEditor: () => Editor | null
}

export interface DagTldrawProps {
  onMount?: (editor: Editor) => void
  onError?: (error: string) => void
  persistenceKey?: string
  className?: string
  style?: React.CSSProperties
  autoImport?: string
}

export const DagTldraw = forwardRef<DagTldrawRef, DagTldrawProps>(
  ({ onMount, onError, persistenceKey, className, style, autoImport }, ref) => {
    const adaptorRef = useRef<DagAdaptor | null>(null)
    const editorRef = useRef<Editor | null>(null)

    const handleMount = useCallback((editor: Editor) => {
      editorRef.current = editor
      adaptorRef.current = createDagAdaptor(editor)
      
      // Auto-import DAG if provided
      if (autoImport && adaptorRef.current) {
        try {
          adaptorRef.current.import(autoImport)
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : 'Failed to auto-import DAG'
          onError?.(errorMessage)
        }
      }
      
      onMount?.(editor)
    }, [onMount, onError, autoImport])

    const importDAG = useCallback((dagText: string) => {
      if (!adaptorRef.current) {
        const error = 'DAG adaptor not initialized. Make sure tldraw has mounted.'
        onError?.(error)
        throw new Error(error)
      }

      try {
        adaptorRef.current.import(dagText)
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Failed to import DAG'
        onError?.(errorMessage)
        throw error
      }
    }, [onError])

    const exportDAG = useCallback((): string => {
      if (!adaptorRef.current) {
        const error = 'DAG adaptor not initialized. Make sure tldraw has mounted.'
        onError?.(error)
        throw new Error(error)
      }

      try {
        return adaptorRef.current.export()
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Failed to export DAG'
        onError?.(errorMessage)
        throw error
      }
    }, [onError])

    const getEditor = useCallback((): Editor | null => {
      return editorRef.current
    }, [])

    useImperativeHandle(ref, () => ({
      importDAG,
      exportDAG,
      getEditor
    }), [importDAG, exportDAG, getEditor])

    return (
      <div className={className} style={{ width: '100%', height: '100%', ...style }}>
        <Tldraw
          onMount={handleMount}
          persistenceKey={persistenceKey}
        />
      </div>
    )
  }
)

DagTldraw.displayName = 'DagTldraw'