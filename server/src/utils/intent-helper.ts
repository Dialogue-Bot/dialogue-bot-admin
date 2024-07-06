const replaceIntentStep = (oldData: any[], newData: any[]) => {
    const newDataMap = new Map();

    newData.forEach(item => {
        newDataMap.set(item.name, item.id);
    });

    return oldData.map(item => {
        if ((item.data && item.data.grammarType !== 'intent') && item.grammarType !== 'intent') return item

        return item.data ? {
            ...item,
            data: {
                trainedData: newDataMap.get(item.data.trainedName) || item.data.trainedName,
            }
        } : {
            ...item,
            trainedData: newDataMap.get(item.trainedName) || item.trainedName,
        }
    })
}

export { replaceIntentStep };

