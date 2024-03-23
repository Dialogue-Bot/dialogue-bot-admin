import { useDidUpdate } from '@/hooks/use-did-update'
import { usePrevious } from '@/hooks/use-prev'
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
  Edge,
  EdgeChange,
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
import { SOURCE_HANDLE_PROMPT_YES, useMapActionToLabel } from './constant'

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
}

const FlowContext = createContext<FlowCtx | undefined>(undefined)

type Props = {
  flow: TFlowInput
  children: React.ReactNode
}

export const FlowProvider = ({ children, flow }: Props) => {
  const [open, toggle] = useToggle()
  const actionToLabel = useMapActionToLabel()
  const [nodes, setNodes, onNodesChange] = useNodesState<any>([
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
  ])
  const [edges, setEdges, onEdgesChange] = useEdgesState([
    {
      id: 'start-fallback',
      source: EActionTypes.START,
      target: EActionTypes.FALLBACK,
      type: 'custom',
      data: {
        deletable: false,
      },
    },
  ])
  const [selectedNode, setSelectedNode] = useState<Node<any> | null>(null)
  const [currentLang, setCurrentLang] = useState(
    flow.settings?.find((setting) => setting.type === 'language')?.value ||
      'en',
  )
  const prevLang = usePrevious<string>(currentLang)

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
