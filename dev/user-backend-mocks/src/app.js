const createError = require('http-errors');
const express = require('express');
const logger = require('morgan');

const authRouter = require('./auth/auth.route');
const contactsRouter = require('./contacts/contacts.route');
const notificationsRouter = require('./notifications/notifications.route');
const chatbotRouter = require('./chatbot/chatbot.route');
const mailCalendarRouter = require('./mail-calendar/mail-calendar.route');
const scheduleRouter = require('./schedule/schedule.route');
const restaurantsRouter = require('./restaurants/restaurants.route');
const cardsRouter = require('./cards/cards.route');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));

app.use('/mocking/auth', authRouter);
app.use('/mocking/contacts', contactsRouter);
app.use('/mocking/notifications', notificationsRouter);
app.use('/mocking/chatbot', chatbotRouter);
app.use('/mocking/mail-calendar', mailCalendarRouter);
app.use('/mocking/schedule', scheduleRouter);
app.use('/mocking/restaurants', restaurantsRouter);
app.use('/mocking/cards', cardsRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
