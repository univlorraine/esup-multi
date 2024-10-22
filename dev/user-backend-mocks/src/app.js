/*
 * Copyright ou © ou Copr. Université de Lorraine, (2022)
 *
 * Direction du Numérique de l'Université de Lorraine - SIED
 *  (dn-mobile-dev@univ-lorraine.fr)
 * JNESIS (contact@jnesis.com)
 *
 * Ce logiciel est un programme informatique servant à rendre accessible
 * sur mobile divers services universitaires aux étudiants et aux personnels
 * de l'université.
 *
 * Ce logiciel est régi par la licence CeCILL 2.1, soumise au droit français
 * et respectant les principes de diffusion des logiciels libres. Vous pouvez
 * utiliser, modifier et/ou redistribuer ce programme sous les conditions
 * de la licence CeCILL telle que diffusée par le CEA, le CNRS et INRIA
 * sur le site "http://cecill.info".
 *
 * En contrepartie de l'accessibilité au code source et des droits de copie,
 * de modification et de redistribution accordés par cette licence, il n'est
 * offert aux utilisateurs qu'une garantie limitée. Pour les mêmes raisons,
 * seule une responsabilité restreinte pèse sur l'auteur du programme, le
 * titulaire des droits patrimoniaux et les concédants successifs.
 *
 * À cet égard, l'attention de l'utilisateur est attirée sur les risques
 * associés au chargement, à l'utilisation, à la modification et/ou au
 * développement et à la reproduction du logiciel par l'utilisateur étant
 * donné sa spécificité de logiciel libre, qui peut le rendre complexe à
 * manipuler et qui le réserve donc à des développeurs et des professionnels
 * avertis possédant des connaissances informatiques approfondies. Les
 * utilisateurs sont donc invités à charger et à tester l'adéquation du
 * logiciel à leurs besoins dans des conditions permettant d'assurer la
 * sécurité de leurs systèmes et/ou de leurs données et, plus généralement,
 * à l'utiliser et à l'exploiter dans les mêmes conditions de sécurité.
 *
 * Le fait que vous puissiez accéder à cet en-tête signifie que vous avez
 * pris connaissance de la licence CeCILL 2.1, et que vous en avez accepté les
 * termes.
 */

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
const rssRouter = require('./rss/rss.route');
const statisticsRouter = require('./statistics/statistics.route');
const clockingRouter = require('./clocking/clocking.route');
const mapRouter = require('./map/map.route');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));

app.get('/healthcheck', (req, res) => res.sendStatus(200));

app.use('/mocking/auth', authRouter);
app.use('/mocking/contacts', contactsRouter);
app.use('/mocking/notifications', notificationsRouter);
app.use('/mocking/chatbot', chatbotRouter);
app.use('/mocking/mail-calendar', mailCalendarRouter);
app.use('/mocking/schedule', scheduleRouter);
app.use('/mocking/restaurants', restaurantsRouter);
app.use('/mocking/cards', cardsRouter);
app.use('/mocking/rss', rssRouter);
app.use('/mocking/statistics', statisticsRouter);
app.use('/mocking/clocking', clockingRouter);
app.use('/mocking/map', mapRouter);

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
