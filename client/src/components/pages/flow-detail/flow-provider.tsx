import { useDidUpdate } from '@/hooks/use-did-update'
import { TFlowInput } from '@/lib/schema/flow-input'
import { EActionTypes, EMessageTypes, TNode } from '@/types/flow'
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
  flow: TFlowInput
  openActions: boolean
  toggleActions: () => void
  nodes: Node<any>[]
  edges: Edge<any>[]
  onConnect: OnConnect
  selectedNode: Node<any> | null
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
}

const FlowContext = createContext<FlowCtx | undefined>(undefined)

type Props = {
  flow: TFlowInput
  children: React.ReactNode
}

export const FlowProvider = ({ children, flow }: Props) => {
  const [open, toggle] = useToggle()
  const actionToLabel = useMapActionToLabel()
  const [nodes, setNodes, onNodesChange] = useNodesState<any>(
    flow.nodes?.length
      ? (flow.nodes as Node<any>[])
      : [
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
        ],
  )
  const [edges, setEdges, onEdgesChange] = useEdgesState(
    flow.edges?.length
      ? (flow.edges as Edge<any>[])
      : [
          {
            id: 'start-fallback',
            source: EActionTypes.START,
            target: EActionTypes.FALLBACK,
            type: 'custom',
            data: {
              deletable: false,
            },
          },
        ],
  )
  const [selectedNode, setSelectedNode] = useState<Node<any> | null>(null)
  const [_selectedEdge, setSelectedEdge] = useState<Edge<any> | null>(null)
  const [currentLang, setCurrentLang] = useState(
    flow.settings?.find((setting) => setting.type === 'language')?.value ||
      'en',
  )

  const [reactFlowInstance, setReactFlowInstance] = useState<ReactFlowInstance<
    any,
    any
  > | null>(null)

  console.log(nodes.map((node) => node.data))

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
                            ? 'yes'
                            : 'no',
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
        return addEdge(
          {
            ...params,
            type: 'custom',
            data: {
              deletable: params.target !== EActionTypes.FALLBACK,
            },
          },
          eds,
        )
      })
    },
    [setEdges, setNodes],
  )

  /**
   * Retrieves a node from the list of nodes based on its ID.
   * @param id - The ID of the node to retrieve.
   * @returns The node with the specified ID, or undefined if not found.
   */
  const _getNode = useCallback(
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
      const sourceNode = _getNode(edge.source)

      if (!sourceNode) {
        return
      }

      if (
        sourceNode.data.action !== EActionTypes.PROMPT_AND_COLLECT &&
        sourceNode.data.action !== EActionTypes.CHECK_VARIABLES
      ) {
        return
      }

      setSelectedEdge(edge)
    },
    [_getNode],
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
   * Retrieves the complete flows from the given nodes.
   * A complete flow is a sequence of nodes where each node has a next action or is a final node.
   * Nodes that do not have a next action and are not final nodes are removed from the result.
   *
   * @returns An array of data objects representing the complete flows.
   */
  const getCompleteFlows = useCallback(() => {
    let clonedNodes = _.cloneDeep(nodes)

    const nodeIsNextAction = (node: Node<any>) => {
      return clonedNodes.some((nd) => {
        return (
          nd.data?.nextAction === node.id ||
          nd.data?.nextActions?.some((na: any) => na.id === node.id)
        )
      })
    }

    const nodeIsToBeRemoved = (node: Node<any>) => {
      if (
        node.data.action === EActionTypes.START ||
        node.data.action === EActionTypes.FALLBACK
      ) {
        return false
      }

      if (
        !nodeIsNextAction(node) &&
        (!node.data?.nextAction || !node.data?.nextActions)
      ) {
        console.log(node.id)
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
  }, [nodes])

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
        getNode: _getNode,
        getEdge,
        handleValidateConnection,
        getCompleteFlows,
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
