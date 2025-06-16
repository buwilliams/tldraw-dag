import { useState, useCallback, useRef } from 'react'
import { Tldraw, Editor } from 'tldraw'
import 'tldraw/tldraw.css'
import { createDagAdaptor, DagAdaptor } from '../lib/dag-adaptor'

const defaultDagText = `Start -> AI Concept (AI Copywriter:1)
AI Concept -> Film (Video:1)
AI Concept -> Voice Over (Actor:1)
Film -> Editing (Editor:1)
Voice Over -> Editing (Editor:1)
Editing -> Review (Thought Leadership:1)
Review -> End (Delivery:1)`

export function DagEditor() {
  const [dagText, setDagText] = useState(defaultDagText)
  const [error, setError] = useState<string | null>(null)
  const adaptorRef = useRef<DagAdaptor | null>(null)

  const handleMount = useCallback((editor: Editor) => {
    adaptorRef.current = createDagAdaptor(editor)
    
    // Import the default DAG on mount
    try {
      adaptorRef.current.import(dagText)
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to import DAG')
    }
  }, [dagText])

  const handleImport = useCallback(() => {
    if (!adaptorRef.current) return
    
    try {
      adaptorRef.current.import(dagText)
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to import DAG')
    }
  }, [dagText])

  const handleExport = useCallback(() => {
    if (!adaptorRef.current) return
    
    try {
      const exportedText = adaptorRef.current.export()
      setDagText(exportedText)
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to export DAG')
    }
  }, [])

  const handleTextChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDagText(e.target.value)
    setError(null)
  }, [])

  return (
    <div style={{ display: 'flex', height: '100vh', fontFamily: 'Inter, sans-serif' }}>
      {/* Left panel - DAG text editor */}
      <div style={{ 
        width: '400px', 
        borderRight: '1px solid #e5e7eb',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#f9fafb'
      }}>
        {/* Header */}
        <div style={{ 
          padding: '16px', 
          borderBottom: '1px solid #e5e7eb',
          backgroundColor: 'white'
        }}>
          <h2 style={{ margin: 0, fontSize: '18px', fontWeight: 'bold', color: '#111827' }}>
            DAG Text Format
          </h2>
          <p style={{ margin: '4px 0 0 0', fontSize: '12px', color: '#6b7280' }}>
            Format: Node1 -&gt; Node2 (Skill:MaxAssignees)
          </p>
        </div>

        {/* Text editor */}
        <div style={{ flex: 1, padding: '16px', display: 'flex', flexDirection: 'column' }}>
          <textarea
            value={dagText}
            onChange={handleTextChange}
            style={{
              flex: 1,
              border: '1px solid #d1d5db',
              borderRadius: '6px',
              padding: '12px',
              fontFamily: 'Monaco, Consolas, monospace',
              fontSize: '13px',
              lineHeight: '1.5',
              resize: 'none',
              backgroundColor: 'white'
            }}
            placeholder="Enter your DAG format here..."
          />
          
          {/* Error display */}
          {error && (
            <div style={{
              marginTop: '8px',
              padding: '8px',
              backgroundColor: '#fef2f2',
              border: '1px solid #fecaca',
              borderRadius: '4px',
              fontSize: '12px',
              color: '#dc2626'
            }}>
              {error}
            </div>
          )}
          
          {/* Buttons */}
          <div style={{ 
            marginTop: '16px', 
            display: 'flex', 
            gap: '8px' 
          }}>
            <button
              onClick={handleImport}
              style={{
                flex: 1,
                padding: '8px 16px',
                backgroundColor: '#3b82f6',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                fontSize: '14px',
                fontWeight: '500',
                cursor: 'pointer'
              }}
            >
              Import to Canvas
            </button>
            <button
              onClick={handleExport}
              style={{
                flex: 1,
                padding: '8px 16px',
                backgroundColor: '#6b7280',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                fontSize: '14px',
                fontWeight: '500',
                cursor: 'pointer'
              }}
            >
              Export from Canvas
            </button>
          </div>
        </div>
      </div>

      {/* Right panel - tldraw canvas */}
      <div style={{ flex: 1, position: 'relative' }}>
        <Tldraw
          onMount={handleMount}
          persistenceKey="dag-editor-v3"
        />
      </div>
    </div>
  )
}