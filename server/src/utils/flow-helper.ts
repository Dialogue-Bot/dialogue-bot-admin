import { IFlowTemplate } from "@/interfaces/flows.interface";
import { generateString } from "./helper";

const replaceSubFlowIdStep = (oldData: any[], newData: any[]) => {
    const newDataMap = new Map();

    newData.forEach(item => {
        newDataMap.set(item.name, item.id);
    });

    return oldData.map(item => {
        if (item.type !== 'sub-flow' && item.action !== 'sub-flow') return item
        return item.data ? {
            ...item,
            data: {
                ...item.data,
                subFlowId: newDataMap.get(item.data.subFlowName) || item.data.trainedName,
            }
        } : {
            ...item,
            subFlowId: newDataMap.get(item.subFlowName) || item.trainedName,
        }
    })
}

const addPrefixFlowName = (flow: IFlowTemplate, flowName: string) => {
    let { mainFlow, subFlows, intents } = flow;

    const newDataMainFlow = mainFlow.map(flow => {
        const { name, nodes, flows } = flow;

        const newName = flowName ? flowName + ' - ' + name : name

        const newNodes = nodes.map(node => {
            return addPrefixFlowNameForNode(node, flowName)
        })

        const newFlows = flows.map(flow => {
            return addPrefixFlowNameForFlow(flow, flowName)

        })
        return {
            ...flow,
            name: newName,
            nodes: newNodes,
            flows: newFlows,
        }
    })

    const newDataSubflows = subFlows.map(subFlow => {
        const { name, nodes, flows } = subFlow;

        const newSubFlowName = flowName ? flowName + ' - ' + name : name;

        const newNodes = nodes.map(node => {
            return addPrefixFlowNameForNode(node, flowName)
        })

        const newFlows = flows.map(flow => {
            return addPrefixFlowNameForFlow(flow, flowName)
        })

        return {
            ...subFlow,
            name: newSubFlowName,
            nodes: newNodes,
            flows: newFlows,
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

const addPrefixFlowNameForNode = (node: any, flowName: string) => {
    let newNode = {}
    try {
        if (!node) return newNode

        if (node.type === 'sub-flow') {
            newNode = {
                ...node,
                data: {
                    ...node.data,
                    subFlowName: flowName ? flowName + ' - ' + node.data.subFlowName : node.data.subFlowName
                },
            }
        }

        if (node.data.grammarType && node.data.grammarType === 'intent') {
            newNode = {
                ...node,
                data: {
                    ...node.data,
                    trainedName: flowName ? (flowName + ' - ' + node.data.trainedName) : node.trainedName
                }
            }
        }

        if (!Object.keys(newNode).length) newNode = node
    } catch (error) {
        console.log('[addPrefixFlowNameForNode] failed: ' + error.message)
    }

    return newNode;
}

const addPrefixFlowNameForFlow = (flow: any, flowName: string) => {
    let newFlow = {}
    try {
        if (!flow) return newFlow

        if (flow.action === 'sub-flow') {
            newFlow = {
                ...flow,
                subFlowName: flowName ? flowName + ' - ' + flow.subFlowName : flow.subFlowName,
            }
        }

        if (flow.grammarType && flow.grammarType === 'intent') {
            newFlow = {
                ...flow,
                trainedName: flowName ? (flowName + ' - ' + flow.trainedName) : flow.trainedName,
            }
        }

        if (!Object.keys(newFlow).length) newFlow = flow
    } catch (error) {
        console.log('[addPrefixFlowNameForNode] failed: ' + error.message)
    }

    return newFlow;
}

export {
    addPrefixFlowName, replaceSubFlowIdStep
};

