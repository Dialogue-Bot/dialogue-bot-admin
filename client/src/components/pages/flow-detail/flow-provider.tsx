import { useDidUpdate } from '@/hooks/use-did-update'
import { EActionTypes, EMessageTypes, TFLow, TNode } from '@/types/flow'
import { createId } from '@paralleldrive/cuid2'
import _ from 'lodash'
import {
  DragEvent,
  createContext,
  useCallback,
  useContext,
  useState,
} from 'react'
import {
  Connection,
  Edge,
  EdgeChange,
  EdgeMouseHandler,
  Node,
  NodeChange,
  NodeMouseHandler,
  OnConnect,
  OnNodesDelete,
  ReactFlowInstance,
  addEdge,
  useEdgesState,
  useNodesState,
} from 'reactflow'
import { useToggle } from 'usehooks-ts'
import {
  SOURCE_HANDLE_PROMPT_NO,
  SOURCE_HANDLE_PROMPT_YES,
  SOURCE_HANDLE_VARIABLES_NO,
  SOURCE_HANDLE_VARIABLES_YES,
  useMapActionToLabel,
} from './constant'

type FlowCtx = {
  flow: TFLow
  openActions: boolean
  toggleActions: () => void
  nodes: Node<any>[]
  edges: Edge<any>[]
  onConnect: OnConnect
  selectedNode: Node<any> | null
  selectedEdge: Edge<any> | null
  currentLang: string
  onNodesChange: (changes: NodeChange[]) => void
  onEdgesChange: (changes: EdgeChange[]) => void
  handleInit: (instance: ReactFlowInstance<any, any>) => void
  handleDragOver: (event: DragEvent<HTMLDivElement>) => void
  handleDrop: (event: DragEvent<HTMLDivElement>) => void
  handleDoubleClickNode: NodeMouseHandler
  handleChangeSelectedNode: (node: Node<any> | null) => void
  handleChangeLang: (lang: string) => void
  handleDoubleClickEdge: EdgeMouseHandler
  getNode: (id: string) => Node<any> | undefined
  getEdge: (id: string) => Edge<any> | undefined
  handleValidateConnection: (connection: Connection) => boolean
  getCompleteFlows: () => any[]
  handleChangeSelectedEdge: (edge: Edge<any> | null) => void
  setNodes: React.Dispatch<React.SetStateAction<Node<any>[]>>
  setEdges: React.Dispatch<React.SetStateAction<Edge<any>[]>>
  handleDeleteEdgeById: (id: string) => void
  handleNodesDelete: OnNodesDelete
}

const FlowContext = createContext<FlowCtx | undefined>(undefined)

type Props = {
  flow: TFLow
  children: React.ReactNode
}

const INIT_NODES = [
  {
    id: EActionTypes.START,
    type: EActionTypes.START,
    position: { x: 100, y: 100 },
    data: {
      label: 'Start',
      action: EActionTypes.START,
      id: EActionTypes.START,
      name: 'Start',
    },
    deletable: false,
    draggable: false,
  },
  {
    id: EActionTypes.FALLBACK,
    type: EActionTypes.FALLBACK,
    position: { x: 190, y: 280 },
    data: {
      label: 'Fallback',
      id: EActionTypes.FALLBACK,
      action: EActionTypes.FALLBACK,
      name: 'Fallback',
    },
    deletable: false,
    draggable: false,
  },
]

const INIT_EDGES = [
  {
    id: 'start-fallback',
    source: EActionTypes.START,
    target: EActionTypes.FALLBACK,
    type: 'custom',
    data: {
      deletable: false,
    },
  },
]

/**
 * Provides the context for the flow editor.
 *
 * @param {Props} props - The component properties.
 * @returns The FlowProvider component.
 */
export const FlowProvider = ({ children, flow }: Props) => {
  const [open, toggle] = useToggle()
  const actionToLabel = useMapActionToLabel()
  const [nodes, setNodes, onNodesChange] = useNodesState<any>(
    flow.nodes?.length ? (flow.nodes as Node<any>[]) : INIT_NODES,
  )
  const [edges, setEdges, onEdgesChange] = useEdgesState(
    flow.edges?.length ? (flow.edges as Edge<any>[]) : INIT_EDGES,
  )
  const [selectedNode, setSelectedNode] = useState<Node<any> | null>(null)
  const [selectedEdge, setSelectedEdge] = useState<Edge<any> | null>(null)
  const [currentLang, setCurrentLang] = useState(
    flow.settings?.find((setting) => setting.type === 'language')?.value ||
      'en',
  )

  console.log({
    selectedEdge,
    selectedNode,
    flows: nodes.map((node) => node.data),
    nodes,
    edges,
  })

  const [reactFlowInstance, setReactFlowInstance] = useState<ReactFlowInstance<
    any,
    any
  > | null>(null)

  /**
   * Handles the drag over event for the HTMLDivElement.
   * Prevents the default behavior and sets the drop effect to 'move'.
   *
   * @param event - The DragEvent<HTMLDivElement> object.
   */
  const handleDragOver = useCallback((event: DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    event.dataTransfer.dropEffect = 'move'
  }, [])

  /**
   * Handles the drop event when a draggable item is dropped onto the flow.
   * @param {any} event - The drop event object.
   */
  const handleDrop = useCallback(
    (event: any) => {
      event.preventDefault()

      if (!reactFlowInstance) {
        return
      }

      const type = event.dataTransfer.getData('application/reactflow')

      if (typeof type === 'undefined' || !type) {
        return
      }

      const position = reactFlowInstance.screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      })
      const id = createId()
      const newNode: Node<any> = {
        id,
        position,
        type,
        data: {
          label: actionToLabel[type as EActionTypes],
          action: type as EActionTypes,
          id,
          name: actionToLabel[type as EActionTypes],
          contents: {
            vi: {},
            en: {},
          },
        } as TNode,
      }

      setNodes((nds) => nds.concat(newNode))
    },
    [reactFlowInstance, setNodes, actionToLabel],
  )

  /**
   * Initializes the React Flow instance.
   *
   * @param instance The React Flow instance.
   */
  const handleInit = useCallback((instance: ReactFlowInstance<any, any>) => {
    setReactFlowInstance(instance)
  }, [])

  /**
   * Retrieves a node from the list of nodes based on its ID.
   * @param id - The ID of the node to retrieve.
   * @returns The node with the specified ID, or undefined if not found.
   */
  const getNode = useCallback(
    (id: string) => nodes.find((node) => node.id === id),
    [nodes],
  )

  /**
   * Retrieves an edge object from the `edges` array based on the provided ID.
   * @param id - The ID of the edge to retrieve.
   * @returns The edge object with the matching ID, or `undefined` if no match is found.
   */
  const getEdge = useCallback(
    (id: string) => edges.find((edge) => edge.id === id),
    [edges],
  )

  /**
   * Handles the connection between nodes in the flow.
   *
   * @param params - The connection parameters.
   * @returns The updated edges after adding the connection.
   */
  const onConnect: OnConnect = useCallback(
    (params) => {
      setNodes((nds) => {
        const targetNode = nds.find((node) => node.id === params.target)

        const sourceNode = nds.find((node) => node.id === params.source)

        switch (sourceNode?.data.action) {
          case EActionTypes.PROMPT_AND_COLLECT:
            return nds.map((node) => {
              if (node.id === params.source) {
                return {
                  ...node,
                  data: {
                    ...node.data,
                    nextActions: [
                      ...(node.data.nextActions || []),
                      {
                        condition:
                          params.sourceHandle === SOURCE_HANDLE_PROMPT_YES
                            ? ''
                            : 'otherwise',
                        id: targetNode?.id as string,
                      },
                    ],
                  },
                }
              }

              return node
            })
          case EActionTypes.CHECK_VARIABLES:
            return nds.map((node) => {
              if (node.id === params.source) {
                return {
                  ...node,
                  data: {
                    ...node.data,
                    nextActions: [
                      ...(node.data.nextActions || []),
                      {
                        condition:
                          params.sourceHandle === SOURCE_HANDLE_VARIABLES_YES
                            ? ''
                            : 'otherwise',
                        id: targetNode?.id as string,
                      },
                    ],
                  },
                }
              }

              return node
            })

          default:
            return nds.map((node) => {
              if (node.id === params.source) {
                return {
                  ...node,
                  data: {
                    ...node.data,
                    nextAction: targetNode?.id,
                  },
                }
              }

              return node
            })
        }
      })

      return setEdges((eds) => {
        const newEdgs = addEdge(
          {
            ...params,
            type: 'custom',
            data: {
              deletable: params.target !== EActionTypes.FALLBACK,
            },
          },
          eds,
        )

        const edge = newEdgs.find(
          (edge) =>
            edge.source === params.source &&
            edge.target === params.target &&
            (edge.sourceHandle === SOURCE_HANDLE_PROMPT_YES ||
              edge.sourceHandle === SOURCE_HANDLE_VARIABLES_YES),
        )

        const sourceNode = getNode(params.source as string)

        if (
          edge &&
          sourceNode &&
          (sourceNode?.data.action === EActionTypes.PROMPT_AND_COLLECT ||
            sourceNode?.data.action === EActionTypes.CHECK_VARIABLES)
        ) {
          setSelectedEdge(edge)
        }

        return newEdgs
      })
    },
    [setEdges, setNodes, getNode],
  )

  console.log()

  /**
   * Handles the change of edges.
   *
   * @param changes - An array of EdgeChange objects representing the changes to the edges.
   */
  const handleEdgesChange = useCallback(
    (changes: EdgeChange[]) => {
      const nextChanges = changes.reduce((acc, change) => {
        if (change.type === 'remove') {
          const edge = getEdge(change.id)

          if (
            edge?.type === 'custom' &&
            edge.target === EActionTypes.FALLBACK
          ) {
            return acc
          }

          return [...acc, change]
        }

        return [...acc, change]
      }, [] as EdgeChange[])

      onEdgesChange(nextChanges)
    },
    [getEdge, onEdgesChange],
  )

  /**
   * Handles the double click event on a node.
   *
   * @param e - The mouse event.
   * @param node - The selected node.
   */
  const handleDoubleClickNode: NodeMouseHandler = useCallback(
    (_e, node: Node<any>) => {
      if (
        node.type === EActionTypes.START ||
        node.type === EActionTypes.FALLBACK
      ) {
        return
      }

      setSelectedNode(node)
    },
    [],
  )

  const handleDoubleClickEdge: EdgeMouseHandler = useCallback(
    (_e, edge: Edge<any>) => {
      const sourceNode = getNode(edge.source)

      if (!sourceNode) {
        return
      }

      if (
        sourceNode.data.action !== EActionTypes.PROMPT_AND_COLLECT &&
        sourceNode.data.action !== EActionTypes.CHECK_VARIABLES
      ) {
        return
      }

      if (
        ![SOURCE_HANDLE_PROMPT_YES, SOURCE_HANDLE_VARIABLES_YES].includes(
          edge.sourceHandle as string,
        )
      ) {
        return
      }

      setSelectedEdge(edge)
    },
    [getNode],
  )

  /**
   * Checks the condition node to determine if it is valid.
   *
   * @param connection - The connection object.
   * @param sourceHandleNo - The source handle for the "No" path.
   * @param sourceHandleYes - The source handle for the "Yes" path.
   * @returns True if the condition node is valid, false otherwise.
   */
  const handleCheckConditionNode = useCallback(
    ({
      connection,
      sourceHandleNo,
      sourceHandleYes,
    }: {
      connection: Connection
      sourceHandleYes: string
      sourceHandleNo: string
    }) => {
      const numberOfYes = edges.filter((edge) => {
        return (
          edge.source === connection.source &&
          edge.sourceHandle === sourceHandleYes
        )
      })

      const numberOfNo = edges.filter((edge) => {
        return (
          edge.source === connection.source &&
          edge.sourceHandle === sourceHandleNo
        )
      })

      if (
        numberOfYes.length === 1 &&
        connection.sourceHandle === sourceHandleYes
      ) {
        return false
      }

      if (
        numberOfNo.length === 1 &&
        connection.sourceHandle === sourceHandleNo
      ) {
        return false
      }

      const targetEdge = edges.find(
        (edge) =>
          edge.target === connection.target &&
          edge.source === connection.source &&
          edge.sourceHandle !== null,
      )

      if (targetEdge) {
        return false
      }

      return true
    },
    [edges],
  )

  /**
   * Handles the validation of a connection.
   *
   * @param connection - The connection to validate.
   * @returns A boolean indicating whether the connection is valid or not.
   */
  const handleValidateConnection = useCallback(
    (connection: Connection) => {
      const sourcesFromHandleInState = edges.filter(
        (edge) => edge.source === connection.source,
      ).length
      const sourceNode = nodes.find((node) => node.id === connection.source)

      const targetFromHandleInState = edges.filter(
        (edge) => edge.target === connection.target,
      ).length

      if (connection.source === connection.target) return false

      if (
        sourceNode?.data.action === EActionTypes.START &&
        sourcesFromHandleInState < 2
      )
        return true

      if (sourceNode?.data.action === EActionTypes.PROMPT_AND_COLLECT) {
        return handleCheckConditionNode({
          connection,
          sourceHandleNo: SOURCE_HANDLE_PROMPT_NO,
          sourceHandleYes: SOURCE_HANDLE_PROMPT_YES,
        })
      }

      if (
        sourceNode?.data.action === EActionTypes.CHECK_VARIABLES &&
        sourcesFromHandleInState < 2
      ) {
        return handleCheckConditionNode({
          connection,
          sourceHandleNo: SOURCE_HANDLE_VARIABLES_NO,
          sourceHandleYes: SOURCE_HANDLE_VARIABLES_YES,
        })
      }

      if (targetFromHandleInState === 1) return false
      if (sourcesFromHandleInState < 1) return true

      return false
    },
    [edges, nodes, handleCheckConditionNode],
  )

  /**
   * Handles the change of the selected node.
   *
   * @param {Node<any> | null} node - The selected node.
   */
  const handleChangeSelectedNode = useCallback((node: Node<any> | null) => {
    setSelectedNode(node)
  }, [])

  const handleChangeSelectedEdge = useCallback((edge: Edge<any> | null) => {
    setSelectedEdge(edge)
  }, [])

  const handleChangeLang = useCallback((lang: string) => {
    setCurrentLang(lang)

    setSelectedNode((prev) => {
      if (!prev) {
        return prev
      }

      if (
        prev.data.contents[lang]?.type === EMessageTypes.LIST_BUTTON ||
        prev.data.contents[lang]?.type === EMessageTypes.LIST_CARD
      ) {
        return prev
      }

      const clonedNode = _.cloneDeep(prev)

      if (_.isEmpty(clonedNode.data.contents['vi'])) {
        _.set(
          clonedNode,
          'data.contents.vi',
          _.get(clonedNode, `data.contents.en`),
        )
      }

      if (_.isEmpty(clonedNode.data.contents['en'])) {
        _.set(
          clonedNode,
          'data.contents.en',
          _.get(clonedNode, `data.contents.vi`),
        )
      }

      return clonedNode
    })
  }, [])

  /**
   * Finds a node in the given array of nodes that has the specified node as its next action.
   * @param nodes - The array of nodes to search in.
   * @param node - The node to find the next action for.
   * @returns The node that has the specified node as its next action, or undefined if not found.
   */
  const findNodeIsNextAction = useCallback((nodes: Node[], node: Node<any>) => {
    return nodes.find((nd) => {
      return (
        nd.data?.nextAction === node.id ||
        nd.data?.nextActions?.some((na: any) => na.id === node.id)
      )
    })
  }, [])

  const findNodeContainNextAction = useCallback(
    (nodes: Node[], node: Node<any>) => {
      return nodes.find((nd) => {
        return (
          nd.data?.nextAction === node.id ||
          nd.data?.nextActions?.some((na: any) => na.id === node.id)
        )
      })
    },
    [],
  )

  /**
   * Retrieves the complete flows from the given nodes.
   * A complete flow is a sequence of nodes where each node has a next action or is a final node.
   * Nodes that do not have a next action and are not final nodes are removed from the result.
   *
   * @returns An array of data objects representing the complete flows.
   */
  const getCompleteFlows = useCallback(() => {
    let clonedNodes = _.cloneDeep(nodes)

    /**
     * Checks if a node is to be removed.
     * @param node - The node to check.
     * @returns True if the node is to be removed, false otherwise.
     */
    const nodeIsToBeRemoved = (node: Node<any>) => {
      if (
        node.data.action === EActionTypes.START ||
        node.data.action === EActionTypes.FALLBACK
      ) {
        return false
      }

      if (
        !findNodeIsNextAction(clonedNodes, node) &&
        (!node.data?.nextAction || !node.data?.nextActions)
      ) {
        return true
      }

      return false
    }

    // eslint-disable-next-line no-constant-condition
    while (true) {
      const nodeToBeRemoved = clonedNodes.find(nodeIsToBeRemoved)

      if (!nodeToBeRemoved) {
        break
      }

      clonedNodes = clonedNodes.filter((node) => node.id !== nodeToBeRemoved.id)
    }

    return clonedNodes.map((node) => node.data)
  }, [findNodeIsNextAction, nodes])

  /**
   * Handles the deletion of nodes.
   * @param nodeDels - The nodes to be deleted.
   */
  const handleNodesDelete: OnNodesDelete = useCallback(
    (nodeDels) => {
      const nodeToDelete = nodeDels[0]

      // get node is have next action to remove this next action
      const nodeIsHaveNextAction = findNodeIsNextAction(nodes, nodeToDelete)

      if (!nodeIsHaveNextAction) {
        return
      }

      // remove next action from node is have next action
      if (nodeIsHaveNextAction?.data.nextAction) {
        delete nodeIsHaveNextAction.data.nextAction
      }

      // remove next actions from node is have next action
      if (nodeIsHaveNextAction?.data.nextActions) {
        // remove next action from next actions
        nodeIsHaveNextAction.data.nextActions =
          nodeIsHaveNextAction.data.nextActions.filter(
            (na: any) => na.id !== nodeToDelete.id,
          )

        // remove next actions if it empty
        if (nodeIsHaveNextAction.data.nextActions.length === 0) {
          delete nodeIsHaveNextAction.data.nextActions
        }
      }

      setNodes((nodes) => {
        return nodes.map((node) => {
          if (node.id === nodeIsHaveNextAction.id) {
            return nodeIsHaveNextAction
          }

          return node
        })
      })
    },
    [findNodeIsNextAction, nodes, setNodes],
  )

  /**
   * Deletes an edge by its ID.
   * @param id - The ID of the edge to delete.
   */
  const handleDeleteEdgeById = useCallback(
    (id: string) => {
      const edge = getEdge(id)

      if (!edge) {
        return
      }

      if (!edge.data?.deletable) return

      const sourceNode = getNode(edge.source)

      if (sourceNode) {
        const cloned = _.cloneDeep(sourceNode)

        if (cloned.data?.nextAction) {
          delete cloned.data.nextAction
        }

        if (cloned.data?.nextActions) {
          cloned.data.nextActions = cloned.data.nextActions.filter(
            (nextAction: any) => nextAction.id !== edge.target,
          )

          if (cloned.data.nextActions.length === 0) {
            delete cloned.data.nextActions
          }
        }

        setNodes((nodes) =>
          nodes.map((node) => {
            if (node.id === edge.source) {
              return cloned
            }

            return node
          }),
        )
      }

      setEdges((edges) => edges.filter((edge) => edge.id !== id))
    },
    [getEdge, getNode, setEdges, setNodes],
  )

  useDidUpdate(() => {
    setNodes((nds) => {
      return nds.map((node) =>
        node.id === selectedNode?.id ? selectedNode : node,
      )
    })
  }, [selectedNode])

  return (
    <FlowContext.Provider
      value={{
        flow,
        openActions: open,
        toggleActions: toggle,
        nodes,
        edges,
        selectedNode,
        selectedEdge,
        onConnect,
        onNodesChange,
        onEdgesChange: handleEdgesChange,
        handleInit,
        handleDragOver,
        handleDrop,
        handleDoubleClickNode,
        handleChangeSelectedNode,
        currentLang,
        handleChangeLang,
        handleDoubleClickEdge,
        getNode,
        getEdge,
        handleValidateConnection,
        getCompleteFlows,
        handleChangeSelectedEdge,
        setNodes,
        setEdges,
        handleDeleteEdgeById,
        handleNodesDelete,
      }}
    >
      {children}
    </FlowContext.Provider>
  )
}

export const useFlowCtx = () => {
  const ctx = useContext(FlowContext)
  if (!ctx) {
    throw new Error('useFlowCtx must be used within a FlowProvider')
  }
  return ctx
}
