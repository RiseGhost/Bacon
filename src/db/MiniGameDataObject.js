export function MiniGameDataObject(Name){
    const MiniGame={
        Name: Name,
        BestScore: 0,
        Scores: []
    }
    return MiniGame
}

export function UpdateMiniGameDataObject(MiniGameDataObject,score){
    const newScores = (MiniGameDataObject.Scores === undefined) ? [score] :  [...MiniGameDataObject.Scores,score]
    const MiniGame = {
        Name: MiniGameDataObject.Name,
        BestScore: Math.max(...newScores),
        Scores: newScores
    }
    return MiniGame
}