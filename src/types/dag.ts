export interface DAGNode {
  id: string
  label: string
  x?: number
  y?: number
}

export interface DAGEdge {
  id: string
  fromNodeId: string
  toNodeId: string
  skill?: string
  maxAssignees?: number
}

export interface DAG {
  nodes: DAGNode[]
  edges: DAGEdge[]
}

export interface ParsedDAGLine {
  from: string
  to: string
  skill?: string
  maxAssignees?: number
}

// Utility functions for parsing DAG text format
export function parseDAGText(text: string): DAG {
  const lines = text.trim().split('\n').filter(line => line.trim())
  const parsedLines: ParsedDAGLine[] = []
  
  for (const line of lines) {
    // Try to match with skill and max assignees first
    const matchWithSkill = line.match(/^(.+?)\s*->\s*(.+?)\s*\((.+?):(\d+)\)$/)
    if (matchWithSkill) {
      const [, from, to, skill, maxAssignees] = matchWithSkill
      if (from && to && skill && maxAssignees) {
        parsedLines.push({
          from: from.trim(),
          to: to.trim(), 
          skill: skill.trim(),
          maxAssignees: parseInt(maxAssignees, 10)
        })
      }
    } else {
      // Try to match simple arrow format without skill/assignees
      const matchSimple = line.match(/^(.+?)\s*->\s*(.+?)$/)
      if (matchSimple) {
        const [, from, to] = matchSimple
        if (from && to) {
          parsedLines.push({
            from: from.trim(),
            to: to.trim()
          })
        }
      }
    }
  }
  
  // Extract unique nodes
  const nodeLabels = new Set<string>()
  parsedLines.forEach(line => {
    nodeLabels.add(line.from)
    nodeLabels.add(line.to)
  })
  
  const nodes: DAGNode[] = Array.from(nodeLabels).map(label => ({
    id: `node-${label.toLowerCase().replace(/\s+/g, '-')}`,
    label
  }))
  
  // Create edges
  const edges: DAGEdge[] = parsedLines.map((line, index) => {
    const fromNode = nodes.find(n => n.label === line.from)
    const toNode = nodes.find(n => n.label === line.to)
    
    const edge: DAGEdge = {
      id: `edge-${index}`,
      fromNodeId: fromNode!.id,
      toNodeId: toNode!.id
    }
    
    // Only add skill and maxAssignees if they exist
    if (line.skill !== undefined) {
      edge.skill = line.skill
    }
    if (line.maxAssignees !== undefined) {
      edge.maxAssignees = line.maxAssignees
    }
    
    return edge
  })
  
  return { nodes, edges }
}

export function dagToText(dag: DAG): string {
  const nodeMap = new Map(dag.nodes.map(n => [n.id, n.label]))
  
  // Sort edges in topological order (layer by layer)
  const sortedEdges = sortEdgesTopologically(dag.edges, nodeMap)
  
  return sortedEdges.map(edge => {
    const fromLabel = nodeMap.get(edge.fromNodeId) || 'Unknown'
    const toLabel = nodeMap.get(edge.toNodeId) || 'Unknown'
    
    // Include skill and maxAssignees only if they exist
    if (edge.skill !== undefined && edge.maxAssignees !== undefined) {
      return `${fromLabel} -> ${toLabel} (${edge.skill}:${edge.maxAssignees})`
    } else {
      return `${fromLabel} -> ${toLabel}`
    }
  }).join('\n')
}

function sortEdgesTopologically(edges: DAGEdge[], nodeMap: Map<string, string>): DAGEdge[] {
  // Build adjacency list and find start/end nodes
  const outgoing = new Map<string, DAGEdge[]>()
  const incoming = new Map<string, DAGEdge[]>()
  const allNodes = new Set<string>()
  
  edges.forEach(edge => {
    allNodes.add(edge.fromNodeId)
    allNodes.add(edge.toNodeId)
    
    if (!outgoing.has(edge.fromNodeId)) {
      outgoing.set(edge.fromNodeId, [])
    }
    if (!incoming.has(edge.toNodeId)) {
      incoming.set(edge.toNodeId, [])
    }
    
    outgoing.get(edge.fromNodeId)!.push(edge)
    incoming.get(edge.toNodeId)!.push(edge)
  })
  
  // Find start nodes (no incoming edges)
  const startNodes = Array.from(allNodes).filter(nodeId => !incoming.has(nodeId))
  
  // Perform layer-by-layer traversal
  const sortedEdges: DAGEdge[] = []
  const visited = new Set<string>()
  const queue = [...startNodes]
  
  while (queue.length > 0) {
    const currentLevelNodes = [...queue]
    queue.length = 0
    
    // Sort current level by node label to ensure consistent ordering
    currentLevelNodes.sort((a, b) => {
      const labelA = nodeMap.get(a) || ''
      const labelB = nodeMap.get(b) || ''
      
      // Prioritize Start nodes first, End nodes last
      if (labelA.toLowerCase().includes('start')) return -1
      if (labelB.toLowerCase().includes('start')) return 1
      if (labelA.toLowerCase().includes('end')) return 1
      if (labelB.toLowerCase().includes('end')) return -1
      
      return labelA.localeCompare(labelB)
    })
    
    currentLevelNodes.forEach(nodeId => {
      if (visited.has(nodeId)) return
      visited.add(nodeId)
      
      // Add all outgoing edges from this node to sorted list
      const nodeOutgoing = outgoing.get(nodeId) || []
      
      // Sort edges by target node label
      nodeOutgoing.sort((a, b) => {
        const labelA = nodeMap.get(a.toNodeId) || ''
        const labelB = nodeMap.get(b.toNodeId) || ''
        return labelA.localeCompare(labelB)
      })
      
      sortedEdges.push(...nodeOutgoing)
      
      // Add target nodes to next level queue
      nodeOutgoing.forEach(edge => {
        if (!visited.has(edge.toNodeId)) {
          queue.push(edge.toNodeId)
        }
      })
    })
  }
  
  return sortedEdges
}