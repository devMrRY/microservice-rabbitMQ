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

      this.channel.assertQueue("test-queue"); // creating a queue with test-queue name if it doesn't exist already.
    } catch (error) {
      console.log(error);
    }
  }

  async sendMessage(data) {
    await this.channel.sendToQueue( // sending message to test-queue
      "test-queue",
      Buffer.from(JSON.stringify(data))
    );
  }
}

const provider = new Provider();

module.exports = provider;
