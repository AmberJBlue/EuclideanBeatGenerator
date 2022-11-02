// export const sounds = {
//     0: {
//         name: 'Kick',
//         filePath: '/kick.wav',
//     },
//     1: {
//         name: 'Snare',
//         filePath: '/snare.wav'
//     },
//     2: {
//         name: 'Clap',
//         filePath: '/clap.wav'
//     }
// }

const Notes = {}
const noteNames = [
    'C1','D1','E1','F1','G1','A1','B1',
    'Db1','Eb1','Gb1','Ab1','Bb1',
    'C2','D2','E2','F2','G2','A2','B2',
    'Db2','Eb2','Gb2','Ab2','Bb2',
    'C3','D3','E3','F3','G3','A3','B3',
    'Db3','Eb3','Gb3','Ab3','Bb3',
    'C4','D4','E4','F4','G4','A4','B4',
    'Db4','Eb4','Gb4','Ab4','Bb4',
    'C5','D5','E5','F5','G5','A5','B5',
    'Db5','Eb5','Gb5','Ab5','Bb5',
    'C6','D6','E6','F6','G6','A6','B6',
    'Db6','Eb6','Gb6','Ab6','Bb6',
    'C7','D7','E7','F7','G7','A7','B7',
    'Db7','Eb7','Gb7','Ab7','Bb7',]
for (let [i, val]  of noteNames.entries()) {
    Notes[i] = {
        name: val,
        filePath: val
    }
}
export default Notes;
