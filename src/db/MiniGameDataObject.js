export function MiniGameDataObject(Name){
    const MiniGame={
        Name: Name,
        BestScore: 0,
        Scores: []
    }
    return MiniGame
}

export function UpdateMiniGameDataObject(MiniGameDataObject,score,PlusInfo){
    const newScores = (MiniGameDataObject.Scores === undefined) ? [{value: score, ...PlusInfo}] :  [...MiniGameDataObject.Scores,{value: score, ...PlusInfo}]
    const MiniGame = {
        Name: MiniGameDataObject.Name,
        BestScore: Math.max(...(newScores.map((x) => x.value))),
        Scores: newScores
    }
    return MiniGame
}