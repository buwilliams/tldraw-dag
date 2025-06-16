import { Editor, createShapeId, createBindingId, TLArrowShape, TLGeoShape } from 'tldraw'
import { DAG, DAGNode, DAGEdge, parseDAGText, dagToText } from '../types/dag'

export class DagAdaptor {
  private editor: Editor

  constructor(editor: Editor) {
    this.editor = editor
  }

  /**
   * Import DAG text format and create visual representation in tldraw
   * @throws Error when DAG text format is invalid
   */
  import(dagText: string): void {
    try {
      const dag = parseDAGText(dagText)
      this.clearCanvas()
      this.createVisualDAG(dag)
    } catch (error) {
      throw new Error(`Failed to import DAG: ${error instanceof Error ? error.message : 'Unknown error'}`)
    }
  }

  /**
   * Export current tldraw shapes back to DAG text format
   * @throws Error when shapes cannot be converted to valid DAG
   */
  export(): string {
    try {
      const dag = this.extractDAGFromCanvas()
      return dagToText(dag)
    } catch (error) {
      throw new Error(`Failed to export DAG: ${error instanceof Error ? error.message : 'Unknown error'}`)
    }
  }

  private clearCanvas(): void {
    // Clear all shapes to ensure clean slate
    const allShapes = this.editor.getCurrentPageShapes()
    if (allShapes.length > 0) {
      this.editor.deleteShapes(allShapes.map((s: any) => s.id))
    }
  }

  private createVisualDAG(dag: DAG): void {
    // Layout algorithm: simple hierarchical layout
    const positioned = this.calculateLayout(dag)
    
    // Create node shapes using standard geo rectangles
    const nodeShapeIds = new Map<string, string>()
    positioned.nodes.forEach(node => {
      const shapeId = createShapeId()
      nodeShapeIds.set(node.id, shapeId)
      
      this.editor.createShape({
        id: shapeId,
        type: 'geo',
        x: node.x || 0,
        y: node.y || 0,
        props: {
          geo: 'rectangle',
          w: Math.max(240, node.label.length * 16 + 64), // Twice as wide
          h: 60,
          text: node.label,
          color: this.getNodeColor(node.label),
          fill: 'solid',
          size: 'm'
        }
      })
    })

    // Create arrow shapes for edges with proper bindings
    positioned.edges.forEach(edge => {
      const fromNodeShapeId = nodeShapeIds.get(edge.fromNodeId)
      const toNodeShapeId = nodeShapeIds.get(edge.toNodeId)
      const fromNode = positioned.nodes.find(n => n.id === edge.fromNodeId)
      const toNode = positioned.nodes.find(n => n.id === edge.toNodeId)
      
      if (fromNodeShapeId && toNodeShapeId && fromNode && toNode) {
        const arrowId = createShapeId()
        const startBindingId = createBindingId()
        const endBindingId = createBindingId()
        
        // Calculate initial arrow position (adjust for wider nodes)
        const fromX = (fromNode.x || 0) + 120 // center of wider node
        const fromY = (fromNode.y || 0) + 30
        const toX = (toNode.x || 0) + 120
        const toY = (toNode.y || 0) + 30
        
        // Create the arrow shape
        this.editor.createShape({
          id: arrowId,
          type: 'arrow',
          x: Math.min(fromX, toX),
          y: Math.min(fromY, toY),
          props: {
            start: {
              x: fromX - Math.min(fromX, toX),
              y: fromY - Math.min(fromY, toY)
            },
            end: {
              x: toX - Math.min(fromX, toX),
              y: toY - Math.min(fromY, toY)
            },
            text: `${edge.skill}:${edge.maxAssignees}`,
            color: 'black',
            size: 'm',
            arrowheadStart: 'none',
            arrowheadEnd: 'arrow'
          }
        })

        // Create binding from arrow start to fromNode
        this.editor.createBinding({
          id: startBindingId,
          type: 'arrow',
          fromId: arrowId as any,
          toId: fromNodeShapeId as any,
          props: {
            terminal: 'start',
            isPrecise: false,
            isExact: false,
            normalizedAnchor: { x: 0.5, y: 0.5 }
          }
        })

        // Create binding from arrow end to toNode  
        this.editor.createBinding({
          id: endBindingId,
          type: 'arrow',
          fromId: arrowId as any,
          toId: toNodeShapeId as any,
          props: {
            terminal: 'end',
            isPrecise: false,
            isExact: false,
            normalizedAnchor: { x: 0.5, y: 0.5 }
          }
        })
      }
    })

    // Fit view to content (original behavior)
    this.editor.zoomToFit({ animation: { duration: 500 } })
  }


  private calculateLayout(dag: DAG): DAG {
    // Simple hierarchical layout algorithm
    const positioned: DAG = { nodes: [...dag.nodes], edges: [...dag.edges] }
    
    // Find root nodes (no incoming edges)
    const hasIncoming = new Set(dag.edges.map(e => e.toNodeId))
    const roots = dag.nodes.filter(n => !hasIncoming.has(n.id))
    
    // Build adjacency list for outgoing edges
    const outgoing = new Map<string, string[]>()
    dag.edges.forEach(edge => {
      if (!outgoing.has(edge.fromNodeId)) {
        outgoing.set(edge.fromNodeId, [])
      }
      outgoing.get(edge.fromNodeId)!.push(edge.toNodeId)
    })

    // Assign levels using BFS
    const levels = new Map<string, number>()
    const queue: Array<{ nodeId: string, level: number }> = []
    
    roots.forEach(root => {
      levels.set(root.id, 0)
      queue.push({ nodeId: root.id, level: 0 })
    })

    while (queue.length > 0) {
      const { nodeId, level } = queue.shift()!
      const children = outgoing.get(nodeId) || []
      
      children.forEach(childId => {
        const currentLevel = levels.get(childId) ?? -1
        if (level + 1 > currentLevel) {
          levels.set(childId, level + 1)
          queue.push({ nodeId: childId, level: level + 1 })
        }
      })
    }

    // Group nodes by level
    const nodesByLevel = new Map<number, DAGNode[]>()
    positioned.nodes.forEach(node => {
      const level = levels.get(node.id) ?? 0
      if (!nodesByLevel.has(level)) {
        nodesByLevel.set(level, [])
      }
      nodesByLevel.get(level)!.push(node)
    })

    // Position nodes with double spacing and center the entire DAG
    const levelHeight = 300 // Double the vertical space
    const nodeSpacing = 360 // Double the horizontal space
    
    // First pass: position nodes within each level
    nodesByLevel.forEach((nodesAtLevel, level) => {
      const totalWidth = (nodesAtLevel.length - 1) * nodeSpacing
      const startX = -totalWidth / 2
      
      nodesAtLevel.forEach((node, index) => {
        node.x = startX + index * nodeSpacing
        node.y = level * levelHeight
      })
    })
    
    // Second pass: find overall bounds and center the entire DAG horizontally
    if (positioned.nodes.length > 0) {
      const minX = Math.min(...positioned.nodes.map(n => n.x || 0))
      const maxX = Math.max(...positioned.nodes.map(n => (n.x || 0) + 240)) // Add node width
      const dagWidth = maxX - minX
      const centerOffset = -dagWidth / 2 - minX
      
      // Apply horizontal centering offset to all nodes
      positioned.nodes.forEach(node => {
        node.x = (node.x || 0) + centerOffset
      })
    }

    return positioned
  }

  private extractDAGFromCanvas(): DAG {
    const allShapes = this.editor.getCurrentPageShapes()
    const nodeShapes = allShapes.filter((shape: any) => 
      shape.type === 'geo' && shape.props.geo === 'rectangle'
    ) as TLGeoShape[]
    const arrowShapes = allShapes.filter((shape: any) => shape.type === 'arrow') as TLArrowShape[]

    if (nodeShapes.length === 0) {
      throw new Error('No DAG nodes found on canvas')
    }

    // Create a map of shape IDs to node labels for lookup
    const nodeIdToLabel = new Map<string, string>()
    nodeShapes.forEach(shape => {
      nodeIdToLabel.set(shape.id, shape.props.text || 'Untitled')
    })

    // Extract nodes
    const nodes: DAGNode[] = nodeShapes.map(shape => ({
      id: shape.id,
      label: shape.props.text || 'Untitled',
      x: shape.x,
      y: shape.y
    }))

    // Extract edges from arrows using bindings
    const edges: DAGEdge[] = []
    
    // Get all bindings from the store
    const store = this.editor.store
    const allBindings = store.allRecords().filter((record: any) => record.typeName === 'binding')
    
    arrowShapes.forEach((arrow, index) => {
      if (arrow.props.text) {
        // Find bindings for this arrow
        const arrowBindings = allBindings.filter((binding: any) => binding.fromId === arrow.id)
        const startBinding = arrowBindings.find((b: any) => b.props && b.props.terminal === 'start')
        const endBinding = arrowBindings.find((b: any) => b.props && b.props.terminal === 'end')
        
        if (startBinding && endBinding) {
          const fromNodeLabel = nodeIdToLabel.get((startBinding as any).toId)
          const toNodeLabel = nodeIdToLabel.get((endBinding as any).toId)
          
          if (fromNodeLabel && toNodeLabel) {
            // Parse skill:maxAssignees from arrow text
            const match = arrow.props.text.match(/^(.+):(\d+)$/)
            if (match) {
              const [, skill, maxAssignees] = match
              if (skill && maxAssignees) {
                edges.push({
                  id: `edge-${index}`,
                  fromNodeId: (startBinding as any).toId,
                  toNodeId: (endBinding as any).toId,
                  skill: skill.trim(),
                  maxAssignees: parseInt(maxAssignees, 10)
                })
              }
            }
          }
        }
      }
    })

    return { nodes, edges }
  }

  private getNodeColor(label: string): string {
    // Color coding: green for start, purple for end, blue for others
    const lowerLabel = label.toLowerCase()
    
    if (lowerLabel.includes('start')) {
      return 'green'
    } else if (lowerLabel.includes('end')) {
      return 'violet'
    } else {
      return 'blue'
    }
  }
}

// Factory function to create adaptor instance
export function createDagAdaptor(editor: Editor): DagAdaptor {
  return new DagAdaptor(editor)
}