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
    } catch (error) {
      console.log(error);
    }
  }

  async sendMessage(data) {
    await this.channel.sendToQueue(
      "test-queue",
      Buffer.from(JSON.stringify(data))
    );
  }
}

const provider = new Provider();

module.exports = provider;
