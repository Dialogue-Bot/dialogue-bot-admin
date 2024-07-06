import { IFlowTemplate } from "@/interfaces/flows.interface";
import { generateString } from "./helper";

const replaceSubFlowIdForNodes = (oldNodes: any, newData: any) => {
    const newDataMap = new Map();

    newData.forEach(item => {
        newDataMap.set(item.name, item.id);
    });

    return oldNodes.map(node => {
        return {
            ...node,
            data: {
                ...node.data,
                subFlowId: newDataMap.get(node.data.subFlowName) || node.data.trainedName,
            }
        }
    })
}

const replaceSubFlowIdForFlows = (oldData: any, newData: any) => {
    const newDataMap = new Map();

    newData.forEach(item => {
        newDataMap.set(item.name, item.id);
    });

    return oldData.map(data => {
        return {
            ...data,
            subFlowId: newDataMap.get(data.subFlowName) || data.trainedName,
        }
    })
}

const replaceFlowNameTemplate = (flow: IFlowTemplate, flowName: string) => {
    let { mainFlow, subFlows, intents } = flow;
    const newDataMainFlow = mainFlow.map(flow => {
        const { name, nodes, flows } = flow;

        const newNodes = nodes.map(node => {
            return node.type === 'sub-flow' ? {
                ...node,
                data: {
                    ...node.data,
                    subFlowName: flowName ? flowName + ' - ' + node.data.subFlowName : node.data.subFlowName
                },
            } : node
        })
        const newFlows = flows.map(flow => {
            return flow.action === 'sub-flow' ? {
                ...flow,
                subFlowName: flowName ? flowName + ' - ' + flow.subFlowName : flow.subFlowName,
            } : flow

        })
        return {
            ...flow,
            name: flowName ? flowName + ' - ' + name : name,
            nodes: newNodes,
            flows: newFlows,
        }
    })

    const newDataSubflows = subFlows.map(subFlow => {
        const { name, nodes, flows } = subFlow;
        const newSubFlowName = flowName ? flowName + ' - ' + name : name;
        const newNodes = nodes.map(node => {
            return node.type === 'sub-flow' ? {
                ...node,
                data: {
                    ...node.data,
                    trainedName: flowName ? flowName + ' - ' + node.data.trainedName : node.data.trainedName,
                }
            } : node
        })

        const newFlows = flows.map(flow => {
            return flow.action === 'sub-flow' ? {
                ...flow,
                trainedName: flowName ? flowName + ' - ' + flow.trainedName : flow.trainedName,
            } : flow
        })

        return {
            ...subFlow,
            nodes: newNodes,
            flows: newFlows,
            name: newSubFlowName,
        }
    })

    const newDataIntents = intents.map(intent => {
        return {
            ...intent,
            name: flowName ? flowName + ' - ' + intent.name : intent.name,
            referenceId: generateString(15)
        }
    })

    return {
        ...flow,
        mainFlow: newDataMainFlow,
        subFlows: newDataSubflows,
        intents: newDataIntents,
    }
}

export {
    replaceFlowNameTemplate, replaceSubFlowIdForFlows, replaceSubFlowIdForNodes
};

