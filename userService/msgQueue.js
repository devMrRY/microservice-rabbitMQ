const amqp = require("amqplib");

class Provider {
  channel;
  connection;
  constructor() {
    this.connectQueue();
  }
  async connectQueue() {
    try {
      this.connection = await amqp.connect("amqp://localhost:5672");
      this.channel = await this.connection.createChannel();

      this.channel.assertQueue("test-queue");
      this.channel.consume("test-queue", (data) => {  // consuming message from test-queue
        console.log(`${Buffer.from(data.content)}`);
        this.channel.ack(data); // acknowledgment is required to remove the message from queue if not acknowleged then message will remain in queue.
      });
    } catch (error) {
      console.log(error);
    }
  }
}

const provider = new Provider();

module.exports = provider;
