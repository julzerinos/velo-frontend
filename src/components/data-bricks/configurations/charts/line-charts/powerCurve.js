/* jshint asi:true */

const d3 = this.d3
const svg = this.svg
const athletes = this.athletes

async function powerCurve() {


    const height = 400
    const width = 1000
    const margin = ({top: 20, right: 30, bottom: 30, left: 40})

    const workout = athletes[0].workouts[0].dataSeries

    let ix = 0
    const powers = Array.from({length: d3.max(workout.time)}, function (x, i) {
        let power
        if (i !== workout.time[ix])
            power = (workout.power[ix + 1] + workout.power[ix]) / 2
        else
            power = workout.power[ix++]


        return {
            time: i,
            power: power
        }
    })


    const worker = async function (arr, duration) {
        let maxPower = 0
        for (const [ix, power] of arr.entries()) {
            if (arr.length - ix < duration)
                break

            const power = d3.mean(arr.slice(ix, ix + duration))
            if (maxPower < power)
                maxPower = power
        }

        return maxPower
    }


    // This is death
    const r = (async () => powers.map(async (_, i) => await worker(powers, i + 1)))()
    console.log(r)
    // const maxPowers = await Promise.all(r)


// const powerCurve = Array.from({length: powers.length}, function (x, i) {
//     if (i === 0)
//         return {
//             time: i,
//             power: d3.max(powers)
//         }
//
//     let maxPower = 0
//     for (const [ix, power] of powers.entries()) {
//         if (powers.length - ix < i + 1)
//             break
//
//         const power = d3.mean(powers.slice(ix, ix + i + 1))
//         if (maxPower < power)
//             maxPower = power
//     }
//
//     return {
//         time: i,
//         power: maxPower
//     }
// })
}

powerCurve().then()