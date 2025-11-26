export function MiniGameDataObject(Name,currentScore){
    const MiniGame={
        Name: Name,
        BestScore: currentScore,
        Scores: [currentScore]
    }
    return MiniGame
}

export function UpdateMiniGameDataObject(MiniGameDataObject,score){
    const newScores = [...MiniGameDataObject.Scores,score]
    const MiniGame = {
        Name: MiniGameDataObject.Name,
        BestScore: Math.max(...newScores),
        Scores: newScores
    }
    return MiniGame
}