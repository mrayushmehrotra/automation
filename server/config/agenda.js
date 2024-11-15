const Agenda = require('agenda');
const mongoose = require('mongoose');

const mongoConnectionString = process.env.MONGODB_URI;

const agenda = new Agenda({
  db: { address: mongoConnectionString, collection: 'agendaJobs' },
});

module.exports = agenda;
