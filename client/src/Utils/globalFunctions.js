import React from 'react';
import toast from 'react-hot-toast';
import moment from 'moment';
// eslint-disable-next-line import/no-extraneous-dependencies
import _ from 'lodash';

import {
  Circular, Community, Energy, Land, NonCarbon, Occupational, Waste, Water,
} from '../Components/common';
// import { useSelector } from 'react-redux';

export const sendNotification = (type, message, duration = 4000, position = 'top-right') => {
  toast[type](message, {
    duration,
    position,
  });
};

export const errorsHandler = (error) => {
  if (error.response.status === 400 && error?.response?.data?.return_status?.length > 0) {
    sendNotification('error', error.response.data.return_status[0].message);
  } else if (error.response.status === 401) {
    sendNotification('error', error.response.data.return_status);
  } else if (error.response.status === 500) {
    sendNotification('error', error.response.data.return_status);
  } else if (error.response.status === 404) {
    sendNotification('error', error.response.data.return_status);
  }
};

export const getUserId = () => {
  try {
    const token = JSON.parse(localStorage.getItem('appState')).registerReducer.userToken;
    const forgotTokeSplit = token.split('.');
    return JSON.parse(atob(forgotTokeSplit[1])).user_id;
  } catch (e) {
    return 0;
  }
};

export const getYearDifference = (from = null, to = null) => {
  if (from && to) {
    const start = moment(from);
    const end = moment(to);
    const duration = end.diff(start, 'years', true).toFixed(1);
    return duration >= 0 ? duration : '';
  }
  return '';
};

export const getMonthDifference = (from = null, to = null) => {
  if (from && to) {
    const start = moment(from);
    const end = moment(to);
    const duration = end.diff(start, 'month');
    const actualDuration = (parseInt(duration + 1, 10) / 12).toFixed(1);
    return actualDuration >= 0 ? actualDuration : '';
  }
  return '';
};

export const getSidebarEnergyIcon = ({ id }) => {
  switch (id) {
    case 1:
      return <span><Circular /></span>;
    case 2:
      return <span><Energy /></span>;
    case 3:
      return <span><Land /></span>;
    case 4:
      return <span><NonCarbon /></span>;
    case 5:
      return <span><Waste /></span>;
    case 6:
      return <span><Water /></span>;
    case 7:
      return <span><Occupational /></span>;
    case 8:
      return <span><Community /></span>;
    default:
      return <span>?</span>;
  }
};
export const getScopeIdWithName = (name) => {
  switch (name) {
    case 'Exploration':
      return '1';
    case 'Construction':
      return '2';
    case 'Operation':
      return '3';
    case 'Closure':
      return '4';
    case 'postClosure':
      return '5';
    default:
      return '0';
  }
};

export const getPhasesNameWIthId = ({ id }) => {
  switch (id) {
    case 1:
      return 'Exploration';
    case 2:
      return 'Site Design and Construction';
    case 3:
      return 'Operations';
    case 4:
      return 'Final Closure and Decommissioning';
    case 5:
      return 'Post Closure';
    default:
      return '0';
  }
};

export const getYearDifferenceNew = ({ d1, d2 }) => {
  const years = [];
  const start = moment(d1);
  const end = moment(d2);
  while (end > start || end.format('M') === start.format('M')) {
    years.push(start.format('YYYY'));
    start.add(1, 'month');
  }
  return _.sortedUniq(years);
};

export const trimName = (name) => name.replace(/_/g, ' ');

export const convertFormat = ({ date, from, to }) => moment(date, from).format(to);
