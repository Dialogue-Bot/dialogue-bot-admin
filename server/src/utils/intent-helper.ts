const replaceIntentsTemplateFlows = (oldFlows: any, newData: any) => {
    const newDataMap = new Map();

    newData.forEach(item => {
        newDataMap.set(item.name, item.id);
    });

    return oldFlows.map(flow => {
        return flow.grammarType === 'intent' ? {
            ...flow,
            trainedData: newDataMap.get(flow.trainedName) || flow.trainedName,
        } : flow
    })
}

const replaceIntentsTemplateNodes = (oldNodes: any, newData: any) => {
    const newDataMap = new Map();

    newData.forEach(item => {
        newDataMap.set(item.name, item.id);
    });

    return oldNodes.map(node => {
        return node.data && node.data.grammarType === 'intent' ? {
            ...node,
            data: {
                trainedData: newDataMap.get(node.data.trainedName) || node.data.trainedName,
            }
        } : node
    })
}

export { replaceIntentsTemplateFlows, replaceIntentsTemplateNodes };
