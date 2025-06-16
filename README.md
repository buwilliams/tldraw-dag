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

The tool uses a simple text format for defining DAGs:

```
Node1 -> Node2 (Skill:MaxAssignees)
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

## Getting Started

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