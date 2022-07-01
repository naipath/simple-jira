const getEmoijForTime = t => {
    if (t < 500) return '😓'
    if (t < 1000) return '😩'
    return '🤢🤮'
}

export const callTracker = async (name, cb) => {
    const start = new Date().getTime();
    const result = await cb()
    const time = new Date().getTime() - start

    if (time > 199) {
        document.dispatchEvent(new CustomEvent("timing-backend-call", {"detail": `${name} - ${time}ms ${getEmoijForTime(time)}`}))
    }
    return result
}

export const groupArr = (data, n) => {
    const group = [];
    for (let i = 0, j = 0; i < data.length; i++) {
        if (i >= n && i % n === 0)
            j++;
        group[j] = group[j] || [];
        group[j].push(data[i])
    }
    return group;
}
