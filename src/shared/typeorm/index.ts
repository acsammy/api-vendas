import { createConnection } from 'typeorm';

createConnection()
  .then(async connection => {
    console.log('  .... DB conectado ');
  })
  .catch(error => console.log('Erro ao conectar o banco. ', error));
