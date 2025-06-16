import { Editor, createShapeId, createBindingId, TLArrowShape, TLGeoShape, getIndexBetween } from 'tldraw'
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
    try {
      // Layout algorithm: simple hierarchical layout
      const positioned = this.calculateLayout(dag)
      
      // Create all shapes at once using batch operation
      const nodeShapeIds = new Map<string, string>()
      const allShapes: any[] = []
      
      // Prepare node shapes with proper z-index values
      let currentIndex = 'a1' as any // Start with a base index
      
      positioned.nodes.forEach((node) => {
        const shapeId = createShapeId()
        nodeShapeIds.set(node.id, shapeId)
        
        allShapes.push({
          id: shapeId,
          type: 'geo',
          x: node.x || 0,
          y: node.y || 0,
          index: currentIndex,  // Use proper tldraw index
          props: {
            geo: 'rectangle',
            w: Math.max(240, node.label.length * 16 + 64),
            h: 60,
            text: node.label,
            color: this.getNodeColor(node.label),
            fill: 'solid',
            dash: 'solid',
            size: 'm'
          },
          meta: {
            dagNodeId: node.id,
            isDagNode: true
          }
        })
        
        // Generate next index for the next shape
        currentIndex = getIndexBetween(currentIndex, undefined)
      })

      // Create arrow shapes for edges with proper bindings
      positioned.edges.forEach((edge) => {
        try {
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
            
            // Add arrow shape to batch with proper z-index
            allShapes.push({
              id: arrowId,
              type: 'arrow',
              x: Math.min(fromX, toX),
              y: Math.min(fromY, toY),
              index: currentIndex, // Use proper tldraw index
              props: {
                start: {
                  x: fromX - Math.min(fromX, toX),
                  y: fromY - Math.min(fromY, toY)
                },
                end: {
                  x: toX - Math.min(fromX, toX),
                  y: toY - Math.min(fromY, toY)
                },
                text: edge.skill && edge.maxAssignees ? `${edge.skill}:${edge.maxAssignees}` : '',
                color: 'black',
                fill: 'none',
                dash: 'solid',
                size: 'm',
                arrowheadStart: 'none',
                arrowheadEnd: 'arrow',
                font: 'draw',
                bend: 0
              },
              meta: {
                dagEdgeId: edge.id,
                isDagArrow: true
              }
            })
            
            // Generate next index for the next arrow
            currentIndex = getIndexBetween(currentIndex, undefined)

            // Store binding info for later creation
            allShapes.push({
              type: '_binding',
              id: startBindingId,
              bindingType: 'arrow',
              fromId: arrowId,
              toId: fromNodeShapeId,
              props: {
                terminal: 'start',
                isPrecise: false,
                isExact: false,
                normalizedAnchor: { x: 0.5, y: 0.5 }
              }
            })

            allShapes.push({
              type: '_binding',
              id: endBindingId,
              bindingType: 'arrow',
              fromId: arrowId,
              toId: toNodeShapeId,
              props: {
                terminal: 'end',
                isPrecise: false,
                isExact: false,
                normalizedAnchor: { x: 0.5, y: 0.5 }
              }
            })
          }
        } catch (error) {
          console.error(`Error preparing edge ${edge.id}:`, error)
        }
      })
      
      // Create all shapes and bindings in one batch operation
      this.editor.batch(() => {
        // Separate shapes from bindings
        const shapes = allShapes.filter(item => item.type !== '_binding')
        const bindings = allShapes.filter(item => item.type === '_binding')
        
        // Create all shapes at once
        if (shapes.length > 0) {
          this.editor.createShapes(shapes)
        }
        
        // Create all bindings after shapes are created
        bindings.forEach(binding => {
          try {
            this.editor.createBinding({
              id: binding.id,
              type: binding.bindingType,
              fromId: binding.fromId,
              toId: binding.toId,
              props: binding.props
            })
          } catch (error) {
            console.error('Error creating binding:', error)
          }
        })
      })

      // Fit view to content (original behavior)
      try {
        this.editor.zoomToFit({ animation: { duration: 500 } })
      } catch (error) {
        console.error('Error fitting view:', error)
      }
    } catch (error) {
      console.error('Error creating visual DAG:', error)
      throw error
    }
  }


  private calculateLayout(dag: DAG): DAG {
    const positioned: DAG = { nodes: [...dag.nodes], edges: [...dag.edges] }
    
    // Find root nodes (no incoming edges)
    const hasIncoming = new Set(dag.edges.map(e => e.toNodeId))
    const roots = dag.nodes.filter(n => !hasIncoming.has(n.id))
    
    // Build adjacency lists
    const outgoing = new Map<string, string[]>()
    const incoming = new Map<string, string[]>()
    dag.edges.forEach(edge => {
      if (!outgoing.has(edge.fromNodeId)) {
        outgoing.set(edge.fromNodeId, [])
      }
      if (!incoming.has(edge.toNodeId)) {
        incoming.set(edge.toNodeId, [])
      }
      outgoing.get(edge.fromNodeId)!.push(edge.toNodeId)
      incoming.get(edge.toNodeId)!.push(edge.fromNodeId)
    })

    // Assign levels using BFS with improved level assignment
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

    // Group nodes by level and sort to minimize crossings
    const nodesByLevel = new Map<number, DAGNode[]>()
    positioned.nodes.forEach(node => {
      const level = levels.get(node.id) ?? 0
      if (!nodesByLevel.has(level)) {
        nodesByLevel.set(level, [])
      }
      nodesByLevel.get(level)!.push(node)
    })

    // Apply crossing reduction using barycenter method
    this.reduceCrossings(nodesByLevel, dag.edges)

    const baseNodeWidth = 280 // Node width including padding
    const minSpacing = baseNodeWidth + 100 // Minimum space between nodes
    const levelHeight = 250

    // Position nodes with collision avoidance
    nodesByLevel.forEach((nodesAtLevel, level) => {
      if (nodesAtLevel.length === 0) return

      // Calculate optimal spacing for this level
      const nodeSpacing = Math.max(minSpacing, (1200 / Math.max(nodesAtLevel.length - 1, 1)))
      const totalWidth = (nodesAtLevel.length - 1) * nodeSpacing
      const startX = -totalWidth / 2
      
      nodesAtLevel.forEach((node, index) => {
        node.x = startX + index * nodeSpacing
        node.y = level * levelHeight
      })

      // Apply collision detection and resolution
      this.resolveNodeCollisions(nodesAtLevel, baseNodeWidth)
    })

    // Final positioning adjustments
    this.centerDAG(positioned.nodes)
    this.adjustForEdgeMinimization(positioned, dag.edges, levels)
    this.resolveNodeEdgeCollisions(positioned, dag.edges)

    return positioned
  }

  private reduceCrossings(nodesByLevel: Map<number, DAGNode[]>, edges: DAGEdge[]) {
    // Apply barycenter heuristic to reduce edge crossings
    const maxIterations = 5
    
    for (let iter = 0; iter < maxIterations; iter++) {
      // Forward pass - sort nodes based on average position of their predecessors
      for (let level = 1; level <= Math.max(...nodesByLevel.keys()); level++) {
        const nodesAtLevel = nodesByLevel.get(level)
        if (!nodesAtLevel || nodesAtLevel.length <= 1) continue

        const nodePositions = new Map<string, number>()
        nodesByLevel.get(level - 1)?.forEach((node, index) => {
          nodePositions.set(node.id, index)
        })

        nodesAtLevel.sort((a, b) => {
          const aConnections = edges.filter(e => e.toNodeId === a.id).map(e => nodePositions.get(e.fromNodeId) ?? 0)
          const bConnections = edges.filter(e => e.toNodeId === b.id).map(e => nodePositions.get(e.fromNodeId) ?? 0)
          
          const aAvg = aConnections.length > 0 ? aConnections.reduce((sum, pos) => sum + pos, 0) / aConnections.length : 0
          const bAvg = bConnections.length > 0 ? bConnections.reduce((sum, pos) => sum + pos, 0) / bConnections.length : 0
          
          return aAvg - bAvg
        })
      }

      // Backward pass - sort nodes based on average position of their successors
      for (let level = Math.max(...nodesByLevel.keys()) - 1; level >= 0; level--) {
        const nodesAtLevel = nodesByLevel.get(level)
        if (!nodesAtLevel || nodesAtLevel.length <= 1) continue

        const nodePositions = new Map<string, number>()
        nodesByLevel.get(level + 1)?.forEach((node, index) => {
          nodePositions.set(node.id, index)
        })

        nodesAtLevel.sort((a, b) => {
          const aConnections = edges.filter(e => e.fromNodeId === a.id).map(e => nodePositions.get(e.toNodeId) ?? 0)
          const bConnections = edges.filter(e => e.fromNodeId === b.id).map(e => nodePositions.get(e.toNodeId) ?? 0)
          
          const aAvg = aConnections.length > 0 ? aConnections.reduce((sum, pos) => sum + pos, 0) / aConnections.length : 0
          const bAvg = bConnections.length > 0 ? bConnections.reduce((sum, pos) => sum + pos, 0) / bConnections.length : 0
          
          return aAvg - bAvg
        })
      }
    }
  }

  private resolveNodeCollisions(nodes: DAGNode[], nodeWidth: number) {
    // Simple collision resolution by adjusting positions
    for (let i = 0; i < nodes.length - 1; i++) {
      const currentNode = nodes[i]
      const nextNode = nodes[i + 1]
      
      if (!currentNode?.x || !nextNode?.x) continue
      
      const minDistance = nodeWidth + 50 // Minimum distance between node centers
      const currentDistance = nextNode.x - currentNode.x
      
      if (currentDistance < minDistance) {
        const adjustment = (minDistance - currentDistance) / 2
        currentNode.x -= adjustment
        nextNode.x += adjustment
      }
    }
  }

  private centerDAG(nodes: DAGNode[]) {
    if (nodes.length === 0) return

    const minX = Math.min(...nodes.map(n => n.x || 0))
    const maxX = Math.max(...nodes.map(n => (n.x || 0)))
    const dagWidth = maxX - minX
    const centerOffset = -dagWidth / 2 - minX

    nodes.forEach(node => {
      node.x = (node.x || 0) + centerOffset
    })
  }

  private adjustForEdgeMinimization(dag: DAG, edges: DAGEdge[], levels: Map<string, number>) {
    // Additional adjustments to minimize edge lengths and overlaps
    const nodePositions = new Map<string, { x: number, y: number }>()
    dag.nodes.forEach(node => {
      nodePositions.set(node.id, { x: node.x || 0, y: node.y || 0 })
    })

    // Fine-tune positions to reduce edge stress
    edges.forEach(edge => {
      const fromPos = nodePositions.get(edge.fromNodeId)
      const toPos = nodePositions.get(edge.toNodeId)
      const fromLevel = levels.get(edge.fromNodeId) ?? 0
      const toLevel = levels.get(edge.toNodeId) ?? 0
      
      if (fromPos && toPos && Math.abs(toLevel - fromLevel) === 1) {
        // For adjacent levels, slightly adjust horizontal positions to reduce crossing
        const horizontalDiff = Math.abs(fromPos.x - toPos.x)
        if (horizontalDiff > 200) {
          const adjustment = Math.min(30, (horizontalDiff - 200) / 10)
          if (fromPos.x > toPos.x) {
            fromPos.x -= adjustment
            toPos.x += adjustment
          } else {
            fromPos.x += adjustment
            toPos.x -= adjustment
          }
        }
      }
    })

    // Apply the adjusted positions back to nodes
    dag.nodes.forEach(node => {
      const pos = nodePositions.get(node.id)
      if (pos) {
        node.x = pos.x
        node.y = pos.y
      }
    })
  }

  private resolveNodeEdgeCollisions(dag: DAG, edges: DAGEdge[]) {
    const nodeWidth = 280
    const nodeHeight = 60
    const safetyMargin = 20

    // For each node, check if it collides with any edge
    dag.nodes.forEach(node => {
      const nodeX = node.x || 0
      const nodeY = node.y || 0
      const nodeBounds = {
        left: nodeX - nodeWidth / 2 - safetyMargin,
        right: nodeX + nodeWidth / 2 + safetyMargin,
        top: nodeY - nodeHeight / 2 - safetyMargin,
        bottom: nodeY + nodeHeight / 2 + safetyMargin
      }

      edges.forEach(edge => {
        // Skip edges connected to this node
        if (edge.fromNodeId === node.id || edge.toNodeId === node.id) return

        const fromNode = dag.nodes.find(n => n.id === edge.fromNodeId)
        const toNode = dag.nodes.find(n => n.id === edge.toNodeId)
        
        if (!fromNode || !toNode) return

        const fromX = (fromNode.x || 0) + 120 // Node center + offset for edge connection
        const fromY = (fromNode.y || 0) + 30
        const toX = (toNode.x || 0) + 120
        const toY = (toNode.y || 0) + 30

        // Check if the edge line intersects with the node bounds
        if (this.lineIntersectsRect(fromX, fromY, toX, toY, nodeBounds)) {
          console.log(`Node ${node.label} collides with edge ${edge.fromNodeId} -> ${edge.toNodeId}`)
          
          // Move the node horizontally to avoid the collision
          const edgeMidX = (fromX + toX) / 2
          const nodeCenter = nodeX
          
          // Determine which direction to move the node
          if (Math.abs(nodeCenter - edgeMidX) < nodeWidth / 2 + safetyMargin) {
            const moveDistance = nodeWidth / 2 + safetyMargin + 50
            if (nodeCenter < edgeMidX) {
              // Move node to the left
              node.x = edgeMidX - moveDistance
            } else {
              // Move node to the right
              node.x = edgeMidX + moveDistance
            }
            console.log(`Moved ${node.label} to x=${node.x} to avoid edge collision`)
          }
        }
      })
    })
  }

  private lineIntersectsRect(x1: number, y1: number, x2: number, y2: number, rect: { left: number, right: number, top: number, bottom: number }): boolean {
    // Check if line segment from (x1,y1) to (x2,y2) intersects with rectangle
    // Using Liang-Barsky line clipping algorithm (simplified)
    
    // First check if either endpoint is inside the rectangle
    if ((x1 >= rect.left && x1 <= rect.right && y1 >= rect.top && y1 <= rect.bottom) ||
        (x2 >= rect.left && x2 <= rect.right && y2 >= rect.top && y2 <= rect.bottom)) {
      return true
    }

    // Check intersection with each edge of the rectangle
    return (
      this.linesIntersect(x1, y1, x2, y2, rect.left, rect.top, rect.right, rect.top) ||    // Top edge
      this.linesIntersect(x1, y1, x2, y2, rect.right, rect.top, rect.right, rect.bottom) || // Right edge
      this.linesIntersect(x1, y1, x2, y2, rect.right, rect.bottom, rect.left, rect.bottom) || // Bottom edge
      this.linesIntersect(x1, y1, x2, y2, rect.left, rect.bottom, rect.left, rect.top)     // Left edge
    )
  }

  private linesIntersect(x1: number, y1: number, x2: number, y2: number, x3: number, y3: number, x4: number, y4: number): boolean {
    // Check if line segment (x1,y1)-(x2,y2) intersects with line segment (x3,y3)-(x4,y4)
    const denom = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4)
    if (Math.abs(denom) < 1e-10) return false // Lines are parallel
    
    const t = ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / denom
    const u = -((x1 - x2) * (y1 - y3) - (y1 - y2) * (x1 - x3)) / denom
    
    return t >= 0 && t <= 1 && u >= 0 && u <= 1
  }

  private extractDAGFromCanvas(): DAG {
    try {
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
      const nodeIds = new Set<string>()
      
      nodeShapes.forEach(shape => {
        if (shape.id && shape.props?.text !== undefined) {
          nodeIdToLabel.set(shape.id, shape.props.text || 'Untitled')
          nodeIds.add(shape.id)
        }
      })

      // Extract nodes with validation
      const nodes: DAGNode[] = nodeShapes
        .filter(shape => shape.id && shape.props)
        .map(shape => ({
          id: shape.id,
          label: shape.props.text || 'Untitled',
          x: shape.x || 0,
          y: shape.y || 0
        }))

      // Extract edges from arrows using bindings with robust error handling
      const edges: DAGEdge[] = []
      
      try {
        // Get all bindings from the store with error handling
        const store = this.editor.store
        const allBindings = store.allRecords().filter((record: any) => {
          try {
            return record && record.typeName === 'binding'
          } catch {
            return false
          }
        })
        
        arrowShapes.forEach((arrow, index) => {
          try {
            if (!arrow || !arrow.id) return
            
            // Find bindings for this arrow with validation
            const arrowBindings = allBindings.filter((binding: any) => {
              try {
                return binding && binding.fromId === arrow.id
              } catch {
                return false
              }
            })
            
            const startBinding = arrowBindings.find((b: any) => {
              try {
                return b && b.props && b.props.terminal === 'start'
              } catch {
                return false
              }
            })
            
            const endBinding = arrowBindings.find((b: any) => {
              try {
                return b && b.props && b.props.terminal === 'end'
              } catch {
                return false
              }
            })
            
            if (startBinding && endBinding) {
              const fromNodeId = (startBinding as any).toId
              const toNodeId = (endBinding as any).toId
              
              // Validate that both nodes actually exist
              if (!nodeIds.has(fromNodeId) || !nodeIds.has(toNodeId)) {
                console.warn(`Skipping arrow ${arrow.id}: references non-existent nodes`)
                return
              }
              
              const fromNodeLabel = nodeIdToLabel.get(fromNodeId)
              const toNodeLabel = nodeIdToLabel.get(toNodeId)
              
              if (fromNodeLabel && toNodeLabel) {
                const edge: DAGEdge = {
                  id: `edge-${index}`,
                  fromNodeId: fromNodeId,
                  toNodeId: toNodeId
                }
                
                // Parse skill:maxAssignees from arrow text if present
                const arrowText = arrow.props?.text?.trim() || ''
                if (arrowText) {
                  const match = arrowText.match(/^(.+):(\d+)$/)
                  if (match) {
                    const [, skill, maxAssignees] = match
                    if (skill && maxAssignees) {
                      edge.skill = skill.trim()
                      edge.maxAssignees = parseInt(maxAssignees, 10)
                    }
                  }
                }
                
                edges.push(edge)
              }
            }
          } catch (error) {
            console.warn(`Error processing arrow ${arrow.id}:`, error)
          }
        })
      } catch (error) {
        console.warn('Error processing bindings:', error)
      }

      return { nodes, edges }
    } catch (error) {
      console.error('Error extracting DAG from canvas:', error)
      throw error
    }
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