import mongoose from 'mongoose';

export default class Database {
  public connected: boolean = false;
  private connectionTries: number = 0;
  public connecting: boolean = false;

  public init() {
    // eslint-disable-next-line no-async-promise-executor
    return new Promise(async (resolve) => {
      mongoose.connection.on('connected', () => {
        this.connected = true;
        console.log('Database connected.');
        resolve(true);
      });

      mongoose.connection.on('disconnected', async () => {
        if (this.connecting == true) return;

        console.log('Database disconnected, reconnecting...');
        this.connected = false;
        this.connectionTries = 0;
        await this.connect();
      });

      await this.connect();
    });
  }

  private async connect() {
    this.connecting = true;

    setTimeout(async () => {
      if (!this.connected) {
        if (this.connectionTries > 2) {
          console.log('Failed to connect database, exiting...');
          process.exit(1);
        } else {
          this.connectionTries += 1;
          console.log(`Database is taking too long to connect, retrying... (${this.connectionTries})`);
          await this.connect();
        }
      }
    }, 10000);

    await mongoose.connect(process.env.DATABASE_URL as string);
  }
}
