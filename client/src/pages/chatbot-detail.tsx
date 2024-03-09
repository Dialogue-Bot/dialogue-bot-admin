import { Controls, nodeTypes } from '@/components/pages/chatbot-detail';
import { Edge } from '@/components/pages/chatbot-detail/edge';
import { ENodeTypes } from '@/types/chatbot';
import { useCallback } from 'react';
import ReactFlow, {
   Background,
   BackgroundVariant,
   ConnectionLineType,
   OnConnect,
   addEdge,
   useEdgesState,
   useNodesState,
} from 'reactflow';
import 'reactflow/dist/style.css';

const ChatBotDetail = () => {
   const [nodes, _setNodes, onNodesChange] = useNodesState([
      {
         id: '1',
         type: ENodeTypes.START,
         position: { x: 100, y: 100 },
         data: { label: 'Start' },
      },
      {
         id: '2',
         type: ENodeTypes.MESSAGE,
         position: { x: 250, y: 100 },
         data: { label: 'Message' },
      },
      {
         id: '3',
         type: ENodeTypes.MESSAGE,
         position: { x: 250, y: 100 },
         data: { label: 'Message' },
      },
   ]);
   const [edges, setEdges, onEdgesChange] = useEdgesState([
      {
         id: 'e1-2',
         source: '1',
         target: '2',
         type: 'smoothstep',
      },
   ]);

   const onConnect: OnConnect = useCallback(
      (params) =>
         setEdges((eds) =>
            addEdge(
               {
                  ...params,
                  type: 'smoothstep',
               },
               eds
            )
         ),
      [setEdges]
   );

   return (
      <div className="h-svh select-none">
         <ReactFlow
            nodeTypes={nodeTypes}
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            edgeTypes={{
               smoothstep: Edge,
            }}
            connectionLineType={ConnectionLineType.SmoothStep}
         >
            <Background
               gap={24}
               variant={BackgroundVariant.Dots}
               color={'hsl(var(--primary))'}
            />
            <Controls />
         </ReactFlow>
      </div>
   );
};

export default ChatBotDetail;
