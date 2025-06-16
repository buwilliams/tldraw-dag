import { useRef, useState } from 'react'
import { DagTldraw, DagTldrawRef } from './components/DagTldraw'
import type { Editor } from 'tldraw'
import './App.css'

const defaultDAGText = `Start -> AI Concept (AI Copywriter:1)
AI Concept -> Film (Video:1)
AI Concept -> Voice Over (Actor:1)
Film -> Editing (Editor:1)
Voice Over -> Editing (Editor:1)
Editing -> Review (Thought Leadership:1)
Review -> End`

function App() {
  const dagRef = useRef<DagTldrawRef>(null)
  const [dagText, setDagText] = useState(defaultDAGText)
  const [error, setError] = useState<string>('')

  const handleMount = (editor: Editor) => {
    console.log('tldraw editor mounted:', editor)
    // Auto-import the default DAG on mount
    setTimeout(() => {
      try {
        dagRef.current?.importDAG(defaultDAGText)
      } catch (err) {
        console.error('Auto-import failed:', err)
      }
    }, 100)
  }

  const handleError = (error: string) => {
    setError(error)
    console.error('DAG error:', error)
  }

  const handleImport = () => {
    try {
      console.log('Importing DAG text:', dagText)
      dagRef.current?.importDAG(dagText)
      setError('')
      console.log('Import completed successfully')
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Import failed'
      console.error('Import failed:', err)
      setError(errorMsg)
    }
  }

  const handleExport = () => {
    try {
      const exported = dagRef.current?.exportDAG()
      if (exported) {
        setDagText(exported)
        setError('')
      }
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Export failed'
      setError(errorMsg)
    }
  }

  return (
    <div className="App" style={{ 
      display: 'flex', 
      height: '100vh',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      backgroundColor: '#f8fafc'
    }}>
      {/* Sidebar */}
      <div style={{ 
        width: '360px', 
        backgroundColor: 'white',
        borderRight: '1px solid #e2e8f0',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '2px 0 8px rgba(0, 0, 0, 0.1)'
      }}>
        {/* Header */}
        <div style={{ 
          padding: '24px 24px 16px 24px',
          borderBottom: '1px solid #e2e8f0'
        }}>
          <h2 style={{ 
            margin: 0, 
            fontSize: '20px', 
            fontWeight: '600', 
            color: '#1e293b',
            marginBottom: '8px'
          }}>
            DAG Editor
          </h2>
          <p style={{ 
            margin: 0, 
            fontSize: '14px', 
            color: '#64748b',
            lineHeight: '1.4'
          }}>
            Define your workflow using DAG text format, then visualize and edit it in the canvas.
          </p>
        </div>

        {/* Content */}
        <div style={{ 
          padding: '24px',
          flex: 1,
          display: 'flex',
          flexDirection: 'column'
        }}>
          <label style={{ 
            fontSize: '14px', 
            fontWeight: '500', 
            color: '#374151',
            marginBottom: '8px',
            display: 'block'
          }}>
            DAG Definition
          </label>
          <textarea
            value={dagText}
            onChange={(e) => setDagText(e.target.value)}
            placeholder="Node1 -> Node2 (Skill:MaxAssignees)"
            style={{ 
              width: '100%', 
              height: '280px', 
              fontFamily: '"JetBrains Mono", "SF Mono", Monaco, monospace',
              fontSize: '13px',
              marginBottom: '16px',
              padding: '12px',
              border: '1px solid #d1d5db',
              borderRadius: '8px',
              backgroundColor: '#f9fafb',
              resize: 'vertical',
              outline: 'none',
              lineHeight: '1.5'
            }}
            onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
            onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
          />
          
          {error && (
            <div style={{ 
              color: '#dc2626', 
              fontSize: '13px', 
              marginBottom: '16px',
              padding: '12px',
              backgroundColor: '#fef2f2',
              border: '1px solid #fecaca',
              borderRadius: '6px',
              lineHeight: '1.4'
            }}>
              <strong>Error:</strong> {error}
            </div>
          )}

          <div style={{ display: 'flex', gap: '12px', flexDirection: 'column' }}>
            <button 
              onClick={handleImport}
              style={{
                background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
                color: 'white',
                border: 'none',
                padding: '12px 16px',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: '500',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                boxShadow: '0 2px 4px rgba(59, 130, 246, 0.3)'
              }}
              onMouseOver={(e) => e.target.style.transform = 'translateY(-1px)'}
              onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}
            >
              📥 Import DAG to Canvas
            </button>
            <button 
              onClick={handleExport}
              style={{
                background: 'white',
                color: '#374151',
                border: '1px solid #d1d5db',
                padding: '12px 16px',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: '500',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
              onMouseOver={(e) => {
                e.target.style.backgroundColor = '#f9fafb'
                e.target.style.borderColor = '#9ca3af'
              }}
              onMouseOut={(e) => {
                e.target.style.backgroundColor = 'white'
                e.target.style.borderColor = '#d1d5db'
              }}
            >
              📤 Export DAG from Canvas
            </button>
          </div>

          {/* Help text */}
          <div style={{ 
            marginTop: 'auto',
            padding: '16px',
            backgroundColor: '#f1f5f9',
            borderRadius: '8px',
            fontSize: '12px',
            color: '#64748b',
            lineHeight: '1.4'
          }}>
            <strong>Format:</strong> Node1 → Node2 or Node1 → Node2 (Skill:Max)<br/>
            <strong>Examples:</strong><br/>
            • Start → Review (Editor:1)<br/>
            • Review → End<br/>
            <strong>Tip:</strong> Alt+drag to duplicate shapes
          </div>
        </div>
      </div>

      {/* Canvas */}
      <div style={{ 
        flex: 1,
        position: 'relative',
        backgroundColor: 'white'
      }}>
        <DagTldraw
          ref={dagRef}
          onMount={handleMount}
          onError={handleError}
          persistenceKey="dag-demo"
          style={{ width: '100%', height: '100%' }}
        />
      </div>
    </div>
  )
}

export default App