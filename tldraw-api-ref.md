# tldraw API Reference

## Quick Start

```tsx
import { Tldraw } from 'tldraw'
import 'tldraw/tldraw.css'

export default function App() {
  return (
    <div style={{ position: 'fixed', inset: 0 }}>
      <Tldraw />
    </div>
  )
}
```

## Core Components

### Tldraw
```tsx
function Tldraw(props: TldrawProps): JSX.Element
```
**Props:**
- `store?: TLStore` - Custom store instance
- `persistenceKey?: string` - Browser storage key
- `onMount?: (editor: Editor) => void` - Access editor instance
- `components?: TLComponents` - UI component overrides
- `shapeUtils?: ShapeUtil[]` - Custom shape utilities
- `bindingUtils?: BindingUtil[]` - Custom binding utilities
- `tools?: StateNode[]` - Custom tools

**Usage:** `<Tldraw persistenceKey="my-app" onMount={editor => console.log(editor)} />`

## Editor API

### Core Methods
```tsx
class Editor {
  // Shapes
  createShape(shape: TLShapePartial): TLShape
  updateShape(update: TLShapePartial): void
  deleteShapes(ids: TLShapeId[]): void
  getShape(id: TLShapeId): TLShape | undefined
  getShapes(): TLShape[]
  duplicateShapes(ids: TLShapeId[]): void
  
  // Selection
  select(...ids: TLShapeId[]): void
  selectAll(): void
  selectNone(): void
  getSelectedShapeIds(): TLShapeId[]
  getSelectedShapes(): TLShape[]
  
  // Tools
  setCurrentTool(id: string): void
  getCurrentToolId(): string
  
  // Camera
  zoomIn(): void
  zoomOut(): void
  zoomToFit(): void
  zoomToSelection(options?: { animation?: { duration: number } }): void
  zoomToBounds(bounds: Box, options?: { animation?: { duration: number } }): void
  panToShape(shape: TLShape): void
  
  // History
  undo(): void
  redo(): void
  mark(id?: string): void
  
  // State
  isInAny(...stateIds: string[]): boolean
  isIn(stateId: string): boolean
}
```

**Usage:** `editor.createShape({ type: 'geo', x: 100, y: 100, props: { geo: 'rectangle' } })`

### React Hooks
```tsx
function useEditor(): Editor
function useValue<T>(selector: (editor: Editor) => T): T
function track<T extends React.ComponentType>(Component: T): T
```

**Usage:** 
```tsx
const editor = useEditor()
const selectedCount = useValue(editor => editor.getSelectedShapeIds().length)
const MyComponent = track(() => <div>{editor.getSelectedShapes().length}</div>)
```

## Shape System

### Base Shape Type
```tsx
type TLBaseShape<Type extends string, Props extends object> = {
  id: TLShapeId
  type: Type
  props: Props
  x: number
  y: number
  rotation: number
  opacity: number
  isLocked: boolean
  // ... other properties
}
```

### Built-in Shapes
```tsx
type TLGeoShape = TLBaseShape<'geo', { geo: 'rectangle' | 'ellipse' | 'triangle' | 'pentagon' | 'hexagon' | 'octagon' | 'star' | 'rhombus' | 'trapezoid' | 'arrow-right' | 'arrow-left' | 'arrow-up' | 'arrow-down' | 'x-box' | 'check-box', w: number, h: number, color: string, fill: 'none' | 'semi' | 'solid', dash: 'draw' | 'dashed' | 'dotted' | 'solid', size: 's' | 'm' | 'l' | 'xl' }>

type TLTextShape = TLBaseShape<'text', { text: string, scale: number, autoSize: boolean, w: number, h: number, color: string, size: 's' | 'm' | 'l' | 'xl', align: 'start' | 'middle' | 'end', font: 'draw' | 'sans' | 'serif' | 'mono' }>

type TLArrowShape = TLBaseShape<'arrow', { start: TLArrowPoint, end: TLArrowPoint, bend: number, color: string, fill: 'none' | 'semi' | 'solid', dash: 'draw' | 'dashed' | 'dotted' | 'solid', size: 's' | 'm' | 'l' | 'xl', arrowheadStart: 'none' | 'arrow' | 'triangle' | 'square' | 'dot' | 'pipe' | 'diamond' | 'inverted' | 'bar', arrowheadEnd: 'none' | 'arrow' | 'triangle' | 'square' | 'dot' | 'pipe' | 'diamond' | 'inverted' | 'bar', text: string, font: 'draw' | 'sans' | 'serif' | 'mono' }>

type TLDrawShape = TLBaseShape<'draw', { segments: TLDrawShapeSegment[], color: string, fill: 'none' | 'semi' | 'solid', dash: 'draw' | 'dashed' | 'dotted' | 'solid', size: 's' | 'm' | 'l' | 'xl', isComplete: boolean, isClosed: boolean, isPen: boolean }>

type TLHighlightShape = TLBaseShape<'highlight', { segments: TLDrawShapeSegment[], color: string, size: 's' | 'm' | 'l' | 'xl', isComplete: boolean, isPen: boolean }>

type TLShape = TLGeoShape | TLTextShape | TLArrowShape | TLDrawShape | TLHighlightShape | TLNoteShape | TLFrameShape | TLImageShape | TLVideoShape | TLEmbedShape | TLBookmarkShape | TLLineShape
```

### ShapeUtil Class
```tsx
abstract class ShapeUtil<T extends TLShape = TLShape> {
  static type: string
  static props: RecordProps<T>
  static migrations?: MigrationSequence
  
  // @throws Error when props are invalid
  abstract getDefaultProps(): T['props']
  abstract component(shape: T): JSX.Element
  abstract indicator(shape: T): JSX.Element
  
  // Capabilities
  canEdit(shape: T): boolean // default: false
  canResize(shape: T): boolean // default: false
  canBind(shape: T): boolean // default: false
  canCrop(shape: T): boolean // default: false
  canUnmount(shape: T): boolean // default: true
  
  // Geometry
  getBounds(shape: T): Box
  getCenter(shape: T): Vec2
  getGeometry(shape: T): Geometry2d
  
  // Events
  onResize?(shape: T, info: TLResizeInfo<T>): T | void
  onPointerDown?(info: TLPointerEventInfo): void
  onPointerUp?(info: TLPointerEventInfo): void
  onPointerMove?(info: TLPointerEventInfo): void
  onDoubleClick?(info: TLClickEventInfo): void
  onEditEnd?(shape: T): void
}
```

### BaseBoxShapeUtil
```tsx
abstract class BaseBoxShapeUtil<T extends TLBaseShape<string, { w: number; h: number }>> extends ShapeUtil<T> {
  // Provides box-based shape behavior with resize handles
  override canResize(): boolean // returns true
  override getBounds(shape: T): Box
  override getGeometry(shape: T): Rectangle2d
}
```

**Usage:**
```tsx
class CardShapeUtil extends BaseBoxShapeUtil<CardShape> {
  static override type = 'card'
  static override props = { w: T.number, h: T.number }
  
  override getDefaultProps() { return { w: 200, h: 300 } }
  override component(shape) { return <div>Card</div> }
  override indicator(shape) { return <rect /> }
}
```

## Custom Shapes

### Defining Shape Types
```tsx
// 1. Define shape type
type MyShape = TLBaseShape<'my-shape', { 
  w: number
  h: number 
  color: string
}>

// 2. Create props validator
const myShapeProps = {
  w: T.number,
  h: T.number,
  color: T.string
}

// 3. Create shape utility
class MyShapeUtil extends ShapeUtil<MyShape> {
  static override type = 'my-shape' as const
  static override props = myShapeProps
  
  override getDefaultProps() {
    return { w: 100, h: 100, color: 'blue' }
  }
  
  override component(shape: MyShape) {
    return <div style={{ width: shape.props.w, height: shape.props.h, backgroundColor: shape.props.color }} />
  }
  
  override indicator(shape: MyShape) {
    return <rect width={shape.props.w} height={shape.props.h} />
  }
}

// 4. Register with Tldraw
<Tldraw shapeUtils={[MyShapeUtil]} />
```

### Prop Validators
```tsx
import { T } from 'tldraw'

T.string         // string
T.number         // number  
T.boolean        // boolean
T.literal('red') // literal value
T.union('red', 'blue', 'green') // union type
T.object({ x: T.number, y: T.number }) // object
T.array(T.string) // array
T.optional(T.string) // optional field
```

## Binding System

### Base Binding Type
```tsx
type TLBaseBinding<Type extends string, Props extends object> = {
  id: TLBindingId
  type: Type
  fromShapeId: TLShapeId
  toShapeId: TLShapeId
  props: Props
}
```

### BindingUtil Class
```tsx
abstract class BindingUtil<T extends TLBaseBinding<string, object> = TLBaseBinding<string, object>> {
  static type: string
  static props: RecordProps<T>
  
  abstract getDefaultProps(): T['props']
  
  // Binding rules
  canBind(opts: { fromShape: TLShape, toShape: TLShape, binding?: T }): boolean
  
  // Lifecycle
  onBeforeCreate?(binding: T): T | void
  onAfterCreate?(binding: T): void
  onBeforeDelete?(binding: T): void
  onAfterDelete?(binding: T): void
  
  // Shape updates
  onAfterChange?(prev: T, next: T): void
  onBeforeShapeUpdate?(opts: { binding: T, shapeId: TLShapeId, shape: TLShape }): void
  onAfterShapeUpdate?(opts: { binding: T, shapeId: TLShapeId, shape: TLShape }): void
}
```

**Usage:**
```tsx
type MyBinding = TLBaseBinding<'my-binding', { strength: number }>

class MyBindingUtil extends BindingUtil<MyBinding> {
  static override type = 'my-binding'
  static override props = { strength: T.number }
  
  override getDefaultProps() { return { strength: 1 } }
  override canBind({ fromShape, toShape }) { return fromShape.type === 'geo' && toShape.type === 'geo' }
}
```

## Tools

### StateNode Class
```tsx
abstract class StateNode {
  static id: string
  static initial?: string
  static children?: () => StateNode[]
  
  // Lifecycle
  onEnter?(info: any): void
  onExit?(info: any): void
  
  // Pointer events
  onPointerDown?(info: TLPointerEventInfo): void
  onPointerUp?(info: TLPointerEventInfo): void
  onPointerMove?(info: TLPointerEventInfo): void
  onDoubleClick?(info: TLClickEventInfo): void
  
  // Keyboard events  
  onKeyDown?(info: TLKeyboardEventInfo): void
  onKeyUp?(info: TLKeyboardEventInfo): void
  onKeyRepeat?(info: TLKeyboardEventInfo): void
  
  // Transitions
  transition(id: string, info?: any): void
  
  // Editor access
  get editor(): Editor
}
```

**Usage:**
```tsx
class MyTool extends StateNode {
  static override id = 'my-tool'
  static override initial = 'idle'
  static override children = () => [IdleState, DrawingState]
}

class IdleState extends StateNode {
  static override id = 'idle'
  
  onPointerDown(info: TLPointerEventInfo) {
    this.parent.transition('drawing', info)
  }
}

// Register tool
<Tldraw tools={[MyTool]} />
```

## Event Types

### Pointer Events
```tsx
interface TLPointerEventInfo {
  type: 'pointer'
  name: 'pointer_down' | 'pointer_up' | 'pointer_move'
  point: Vec2 // Current pointer position
  pointerId: number
  button: number // 0=left, 1=middle, 2=right
  isPen: boolean
  shiftKey: boolean
  ctrlKey: boolean
  altKey: boolean
  metaKey: boolean
}
```

### Click Events
```tsx
interface TLClickEventInfo {
  type: 'click'
  name: 'double_click'
  point: Vec2
  phase: 'down' | 'up'
  pointerId: number
  button: number
  shiftKey: boolean
  ctrlKey: boolean
  altKey: boolean
  metaKey: boolean
}
```

### Keyboard Events
```tsx
interface TLKeyboardEventInfo {
  type: 'keyboard'
  name: 'key_down' | 'key_up' | 'key_repeat'
  key: string
  code: string
  shiftKey: boolean
  ctrlKey: boolean
  altKey: boolean
  metaKey: boolean
}
```

## Utility Functions

### ID Creation
```tsx
function createShapeId(id?: string): TLShapeId
function createBindingId(id?: string): TLBindingId
```

**Usage:** `const id = createShapeId('my-shape')`

### Geometry
```tsx
class Vec2 {
  constructor(x: number, y: number)
  x: number
  y: number
  
  add(other: Vec2): Vec2
  sub(other: Vec2): Vec2
  mul(scalar: number): Vec2
  div(scalar: number): Vec2
  len(): number
  normalize(): Vec2
  dot(other: Vec2): number
  cross(other: Vec2): number
  angle(): number
  rotate(angle: number): Vec2
}

class Box {
  constructor(x: number, y: number, w: number, h: number)
  x: number
  y: number
  w: number
  h: number
  
  center(): Vec2
  contains(point: Vec2): boolean
  intersects(other: Box): boolean
  expand(amount: number): Box
}
```

## Component Customization

### TLComponents Interface
```tsx
interface TLComponents {
  Background?: ComponentType
  SvgDefs?: ComponentType
  Brush?: ComponentType
  ScribbleOverlay?: ComponentType
  CollaboratorBrush?: ComponentType
  CollaboratorCursor?: ComponentType
  CollaboratorHint?: ComponentType
  CollaboratorShapeIndicator?: ComponentType
  Cursor?: ComponentType
  Grid?: ComponentType
  Handle?: ComponentType
  Handles?: ComponentType
  HelperButtons?: ComponentType
  HoveredShapeIndicator?: ComponentType
  LiveCollaborators?: ComponentType
  LoadingScreen?: ComponentType
  OnTheCanvas?: ComponentType
  InFrontOfTheCanvas?: ComponentType
  SelectionBackground?: ComponentType
  SelectionForeground?: ComponentType
  ShapeErrorFallback?: ComponentType
  ShapeIndicator?: ComponentType
  SnapIndicator?: ComponentType
  Spinner?: ComponentType
  TextEditor?: ComponentType
  Toolbar?: ComponentType
  Minimap?: ComponentType
  DebugPanel?: ComponentType
  MenuPanel?: ComponentType
  SharePanel?: ComponentType
  StylePanel?: ComponentType
  ZoomMenu?: ComponentType
  QuickActions?: ComponentType
  ActionsMenu?: ComponentType
  ContextMenu?: ComponentType
  HelpMenu?: ComponentType
  NavigationPanel?: ComponentType
  PageMenu?: ComponentType
}
```

**Usage:** `<Tldraw components={{ Background: MyBackground, Toolbar: MyToolbar }} />`

## Error Handling

Common exceptions:
- `@throws Error` - Invalid shape props
- `@throws Error` - Shape ID not found  
- `@throws Error` - Invalid tool transition
- `@throws Error` - Binding validation failed

## Performance

### Reactive Components
```tsx
// Make components reactive to editor state
const MyComponent = track(() => {
  const editor = useEditor()
  const selectedCount = editor.getSelectedShapeIds().length
  return <div>Selected: {selectedCount}</div>
})

// Subscribe to specific values
const selectedIds = useValue(editor => editor.getSelectedShapeIds())
```

### Batching Updates
```tsx
// Batch multiple operations
editor.batch(() => {
  editor.createShape(shape1)
  editor.createShape(shape2)
  editor.updateShape(update)
})
```

This reference covers the core tldraw API surface with exact TypeScript signatures, minimal examples, and key usage patterns. Focus on the public API rather than implementation details.