const appRoot = require('app-root-path')
const { Worker } = require('worker_threads')

const threadCount = 10
const threads = new Set()
const workerPath = appRoot + '/src/worker.js'

let totalRuns = 0

for (let i = 0; i < threadCount; i++) {
  threads.add(new Worker(workerPath, { workerData: { workerId: i } }))
}

for (let worker of threads) {
  worker.on('error', (err) => {
    throw err
  })

  worker.on('exit', () => {
    threads.delete(worker)
    if (threads.size === 0) {
      console.log(`All jobs are complete.`)
      process.exit()
    }
  })

  worker.on('message', (msg = {}) => {
    const { workerId, loopCount, maxLoops } = msg

    if (loopCount > maxLoops) {
      worker.terminate()
    }

    totalRuns++
    console.log(`\n-- Worker Message --`)
    console.log(`workerId: ${workerId}`)
    console.log(`Loops: ${loopCount} / ${maxLoops}`)
    console.log(`Active threads: ${threads.size} / ${threadCount}`)
    console.log(`Total Runs: ${totalRuns}`)
  })
}
