# Node Workers Example

This is a demo application that shows how to use worker threads in Node. I created this for my own curiosity, as I wanted to experiment with running a number of tasks in parallel using Node JS.

## Usage

1. Clone the project.
2. Run `npm start`

## Tips and Tricks

- Change the number of active threads by modifying `threadCount` inside `/src/server.js`.
- In `worker.js`, I created a method named `iterate` that handles / simulates the business logic of the worker thread. You can name this whatever you want.
