const { config } = require('dotenv');

config();

module.exports = [
  {
    type: 'postgres',
    name: 'default',
    host: '127.0.0.1',
    port: 5432,
    username: process.env.PG_USERNAME,
    password: process.env.PG_PASSWORD,
    database: 'skullking',
    synchronize: false,
    logging: false,
    connectTimeout: 30 * 1000,
    acquireTimeout: 30 * 1000,
    entities: [__dirname + '/dist/server/entity/**/*.js', __dirname + '/src/server/entity/**/*.ts'],
    migrations: [__dirname + '/dist/server/migration/**/*.js'],
    cli: {
      entitiesDir: 'src/server/entity',
      migrationsDir: 'src/server/migration',
      subscribersDir: 'src/server/subscriber',
    }
  },
];
