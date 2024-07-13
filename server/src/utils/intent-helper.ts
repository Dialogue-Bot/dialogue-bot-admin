const replaceIntentStep = (oldData: any[], newData: any[]) => {
    const newDataMap = new Map();

    newData.forEach(item => {
        newDataMap.set(item.name, item.referenceId);
    });

    return oldData.map(item => {
        // item can be node or flow
        // check item for flow, item.data for node
        if ((item.data && item.data.grammarType !== 'intent') && item.grammarType !== 'intent') return item

        return item.data ? {
            ...item,
            data: {
                ...item.data,
                trainedData: newDataMap.get(item.data.trainedName) || item.data.trainedData,
            }
        } : {
            ...item,
            trainedData: newDataMap.get(item.trainedName) || item.trainedData,
        }
    })
}

export { replaceIntentStep };

