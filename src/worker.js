const { workerData, parentPort } = require('worker_threads')

// Maximum number of times this worker should run.
const maxLoops = Math.floor(Math.random() * (1000 - 10) + 10)

// Randomly generated delay to simulate different workers taking
// differing amount of times to parse and process data.
const timeMs = Math.floor(Math.random() * (700 - 100) + 100)
let loopCount = 0

// Main function where the worker's task should happen.
const interate = () => {
  loopCount++

  parentPort.postMessage({
    workerId: workerData.workerId,
    loopCount,
    maxLoops
  })

  setTimeout(() => {
    interate()
  }, timeMs)
}

const run = () => {
  console.log(`\nWorker initialized:`)
  console.log(`workerId: ${workerData.workerId}`)
  console.log(`delayTimeMs: ${timeMs}`)
  console.log(`Max Loops: ${maxLoops}`)

  interate()
}

run()
