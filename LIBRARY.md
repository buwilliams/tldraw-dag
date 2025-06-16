# tldraw-dag Library

A reusable React component library for creating DAG (Directed Acyclic Graph) drawing tools using tldraw.

## Installation

```bash
npm install tldraw-dag
```

## Usage

### Basic Usage

```tsx
import React, { useRef } from 'react'
import { DagTldraw, DagTldrawRef } from 'tldraw-dag'

function MyApp() {
  const dagRef = useRef<DagTldrawRef>(null)

  const handleImport = () => {
    const dagText = `
      Start -> AI Concept (AI Copywriter:1)
      AI Concept -> Film (Video:1)
      Film -> End
    `
    dagRef.current?.importDAG(dagText)
  }

  const handleExport = () => {
    const dagText = dagRef.current?.exportDAG()
    console.log(dagText)
  }

  return (
    <div style={{ height: '100vh' }}>
      <DagTldraw ref={dagRef} />
      <button onClick={handleImport}>Import</button>
      <button onClick={handleExport}>Export</button>
    </div>
  )
}
```

### Advanced Usage

```tsx
import React, { useRef } from 'react'
import { DagTldraw, DagTldrawRef, parseDAGText, dagToText } from 'tldraw-dag'
import type { Editor } from 'tldraw'

function AdvancedApp() {
  const dagRef = useRef<DagTldrawRef>(null)

  const handleMount = (editor: Editor) => {
    console.log('tldraw editor mounted:', editor)
  }

  const handleError = (error: string) => {
    console.error('DAG error:', error)
  }

  const handleCustomImport = () => {
    try {
      const dagText = "Start -> Process (Worker:2)\nProcess -> End"
      const dag = parseDAGText(dagText)
      dagRef.current?.importDAG(dagToText(dag))
    } catch (error) {
      console.error('Import failed:', error)
    }
  }

  return (
    <div style={{ height: '100vh' }}>
      <DagTldraw
        ref={dagRef}
        onMount={handleMount}
        onError={handleError}
        persistenceKey="my-dag-app"
        className="my-dag-editor"
        style={{ border: '1px solid #ccc' }}
      />
      <button onClick={handleCustomImport}>Custom Import</button>
    </div>
  )
}
```

## API Reference

### DagTldraw Component

A React component that provides a complete DAG drawing interface.

#### Props

- `onMount?: (editor: Editor) => void` - Called when the tldraw editor is mounted
- `onError?: (error: string) => void` - Called when DAG operations fail
- `persistenceKey?: string` - Key for persisting tldraw state
- `className?: string` - CSS class name for the container
- `style?: React.CSSProperties` - Inline styles for the container

#### Ref Methods

- `importDAG(dagText: string): void` - Import DAG text and create visual representation
- `exportDAG(): string` - Export current visual state to DAG text format
- `getEditor(): Editor | null` - Get the underlying tldraw Editor instance

### Types

```typescript
interface DAGNode {
  id: string
  label: string
  x?: number
  y?: number
}

interface DAGEdge {
  id: string
  fromNodeId: string
  toNodeId: string
  skill: string
  maxAssignees: number
}

interface DAG {
  nodes: DAGNode[]
  edges: DAGEdge[]
}
```

### Utilities

- `parseDAGText(text: string): DAG` - Parse DAG text format into structured data
- `dagToText(dag: DAG): string` - Convert DAG data to text format
- `createDagAdaptor(editor: Editor): DagAdaptor` - Create adaptor for custom usage

## DAG Text Format

The library uses a simple text format for defining DAGs:

```
Node1 -> Node2 (Skill:MaxAssignees)
```

### Examples

```text
Start -> AI Concept (AI Copywriter:1)
AI Concept -> Film (Video:1)
AI Concept -> Voice Over (Actor:1)
Film -> Editing (Editor:1)
Voice Over -> Editing (Editor:1)
Editing -> Review (Thought Leadership:1)
Review -> End
```

## Features

- **Visual DAG Editor**: Drag-and-drop interface powered by tldraw
- **Bidirectional Conversion**: Import text to visual, export visual to text
- **Node Binding**: Arrows automatically follow nodes when moved
- **Color Coding**: Green for start nodes, purple for end nodes, blue for others
- **Editable Labels**: Double-click arrows to edit skills and assignee counts
- **Automatic Layout**: Hierarchical layout with proper spacing and centering
- **Topological Sorting**: Exported text maintains logical flow order

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build library
npm run build:lib

# Lint code
npm run lint
```

## License

MIT