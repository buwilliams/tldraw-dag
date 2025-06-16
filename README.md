# DAG Drawing Tool

A visual DAG (Directed Acyclic Graph) editor built with React, TypeScript, Vite, and tldraw. This tool provides a bridge between custom DAG text format and beautiful visual representations.

## Features

- **Custom DAG Format**: Support for task workflows with skills and assignee limits
- **Visual Editor**: Beautiful drag-and-drop interface powered by tldraw
- **Bidirectional Conversion**: Import text format to visual, export visual back to text with topological sorting
- **Standard Shapes**: Uses tldraw's built-in rectangle shapes with text labels
- **Bound Arrows**: Built-in tldraw arrows with proper node bindings
- **Connected Movement**: Arrows automatically follow nodes when dragged
- **Editable Labels**: Double-click arrow text to edit skill names and max assignees  
- **Optimal Viewport**: Auto-zoom to fit entire DAG centered on canvas for immediate overview
- **Complete Visualization**: All edges display including start/end connections

## DAG Format

The tool supports a flexible text format for defining DAGs. Skill assignments are optional:

```
Node1 -> Node2                    // Simple connection
Node1 -> Node2 (Skill:MaxAssignees)  // With skill and max assignees
```

**Example:**
```
Start -> AI Concept (AI Copywriter:1)
AI Concept -> Film (Video:1)
AI Concept -> Voice Over (Actor:1)
Film -> Editing (Editor:1)
Voice Over -> Editing (Editor:1)
Editing -> Review (Thought Leadership:1)
Review -> End
```

**Mixed Format Example:**
```
Start -> Research
Research -> Design (Designer:2)
Design -> Development (Developer:3)
Development -> Testing
Testing -> End (Deploy:1)
```

## Getting Started

### Running the Demo Application

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start development server:**
   ```bash
   npm run dev
   ```

3. **Build for production:**
   ```bash
   npm run build
   ```

### Library Build Process

The library uses a multi-step build process that ensures TypeScript declarations are always generated:

```bash
npm run build:lib    # Complete library build
```

**Build Steps:**
1. `clean` - Removes existing dist/ directory
2. `build:types` - Generates TypeScript declaration files (.d.ts)
3. `build:bundle` - Creates JavaScript bundle and CSS with Vite
4. `verify:build` - Validates all required files are present

**Individual Commands:**
```bash
npm run clean          # Clean dist directory
npm run build:types    # Generate TypeScript declarations only
npm run build:bundle   # Generate JavaScript bundle only
npm run verify:build   # Verify build output
```

**Output Structure:**
```
dist/
├── index.js           # Main library bundle (ES modules)
├── index.d.ts         # Main TypeScript declarations
├── style.css          # Required tldraw styles
├── components/        # Component type definitions
├── lib/              # Core library type definitions  
└── types/            # DAG format type definitions
```

### Using as a Library in Your React Project

This package can be imported and used as a reusable component in other React applications.

#### Installation

```bash
npm install @buwilliams/tldraw-dag
# or
yarn add @buwilliams/tldraw-dag
```

#### Basic Usage

```tsx
import React, { useRef } from 'react'
import { DagTldraw, DagTldrawRef } from '@buwilliams/tldraw-dag'
import '@buwilliams/tldraw-dag/style.css'
import type { Editor } from 'tldraw'

function MyApp() {
  const dagRef = useRef<DagTldrawRef>(null)

  const handleImport = () => {
    const dagText = `Start -> Process (Worker:2)
Process -> Review
Review -> End (Deploy:1)`
    dagRef.current?.importDAG(dagText)
  }

  const handleExport = () => {
    const exported = dagRef.current?.exportDAG()
    console.log('Exported DAG:', exported)
  }

  const handleMount = (editor: Editor) => {
    console.log('tldraw editor mounted:', editor)
  }

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <button onClick={handleImport}>Import DAG</button>
      <button onClick={handleExport}>Export DAG</button>
      
      <DagTldraw
        ref={dagRef}
        onMount={handleMount}
        onError={(error) => console.error('DAG Error:', error)}
        persistenceKey="my-dag-editor"
        style={{ width: '100%', height: '500px' }}
      />
    </div>
  )
}
```

#### Advanced Usage with Auto-Import

```tsx
import React, { useRef, useState } from 'react'
import { DagTldraw, DagTldrawRef } from '@buwilliams/tldraw-dag'
import '@buwilliams/tldraw-dag/style.css'

const initialDAG = `Start -> Research (Analyst:1)
Research -> Design (Designer:2)
Design -> Development
Development -> Testing (QA:2)
Testing -> End`

function AdvancedDAGEditor() {
  const dagRef = useRef<DagTldrawRef>(null)
  const [error, setError] = useState<string>('')

  return (
    <div>
      {error && <div style={{ color: 'red' }}>Error: {error}</div>}
      
      <DagTldraw
        ref={dagRef}
        autoImport={initialDAG}  // Automatically import this DAG on mount
        onError={setError}
        persistenceKey="advanced-dag"
        className="my-dag-editor"
        style={{ 
          width: '100%', 
          height: '600px',
          border: '1px solid #ccc',
          borderRadius: '8px'
        }}
      />
    </div>
  )
}
```

#### Direct API Usage

If you need more control, you can use the DAG adaptor directly:

```tsx
import React, { useEffect, useRef } from 'react'
import { Tldraw, Editor } from 'tldraw'
import { createDagAdaptor, DagAdaptor } from '@buwilliams/tldraw-dag'
import '@buwilliams/tldraw-dag/style.css'

function CustomDAGEditor() {
  const adaptorRef = useRef<DagAdaptor>()

  const handleMount = (editor: Editor) => {
    adaptorRef.current = createDagAdaptor(editor)
    
    // Import a DAG with mixed format
    try {
      adaptorRef.current.import('Start -> Process (Worker:1)\\nProcess -> End')
    } catch (error) {
      console.error('Import failed:', error)
    }
  }

  const exportDAG = () => {
    if (adaptorRef.current) {
      try {
        const dagText = adaptorRef.current.export()
        console.log('Exported:', dagText)
      } catch (error) {
        console.error('Export failed:', error)
      }
    }
  }

  return (
    <div style={{ width: '100%', height: '100vh' }}>
      <button onClick={exportDAG}>Export DAG</button>
      <Tldraw onMount={handleMount} />
    </div>
  )
}
```

#### TypeScript Types

The library exports all necessary TypeScript types:

```tsx
import type { 
  DAG, 
  DAGNode, 
  DAGEdge,
  DagTldrawRef,
  DagTldrawProps 
} from '@buwilliams/tldraw-dag'

// Example of working with DAG data structures
const processDAG = (dag: DAG) => {
  dag.nodes.forEach((node: DAGNode) => {
    console.log(`Node: ${node.label} at (${node.x}, ${node.y})`)
  })
  
  dag.edges.forEach((edge: DAGEdge) => {
    console.log(`Edge: ${edge.skill} (max: ${edge.maxAssignees})`)
  })
}
```

#### Required Dependencies

Make sure your project has these peer dependencies installed:

```bash
npm install react react-dom tldraw
```

#### CSS Imports

Don't forget to import the required CSS in your application:

```tsx
import 'tldraw/tldraw.css'
import '@buwilliams/tldraw-dag/style.css'
```

**Note:** The library exports its own CSS file that includes all necessary tldraw styles, so you can import just the library styles if preferred:

```tsx
import '@buwilliams/tldraw-dag/style.css'
```

## Project Structure

```
src/
├── types/
│   └── dag.ts           # DAG format types and parsing utilities
├── lib/
│   └── dag-adaptor.ts   # Core adaptor library (import/export)
├── components/
│   └── DagEditor.tsx    # Main editor component  
├── App.tsx              # Root app component
└── main.tsx             # Entry point
```

## Core API

### DagAdaptor Class

The main adaptor library provides two key methods:

```typescript
import { createDagAdaptor } from './lib/dag-adaptor'

const adaptor = createDagAdaptor(editor)

// Import DAG text to visual representation
adaptor.import(dagText: string): void

// Export visual representation back to DAG text
adaptor.export(): string
```

### Shape Usage

- **Rectangle Nodes**: Standard tldraw geo shapes with text labels
- **Color Coding**: Green for Start, Purple for End, Blue for intermediate tasks
- **Arrow Edges**: Built-in arrows with skill labels and binding connections

## Usage

1. **Text Editor**: Enter your DAG format in the left panel
2. **Import**: Click "Import to Canvas" to visualize the DAG
3. **Visual Editing**: Drag, resize, and modify nodes in the canvas
4. **Export**: Click "Export from Canvas" to get the updated DAG text

## Future Enhancements

- [ ] Real-time sync between text and visual editors
- [ ] Advanced layout algorithms (force-directed, hierarchical)
- [ ] LLM integration for automatic DAG generation
- [ ] Shape connection tracking for better export functionality
- [ ] Validation for DAG cycles and constraints
- [ ] Collaborative editing support

## Technology Stack

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **tldraw** - Canvas and drawing library
- **Inter Font** - Typography

## License

MIT