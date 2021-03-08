import moment from 'moment';

export function omit(objectToOmit, fields) {
  if (typeof objectToOmit === 'object' && Array.isArray(fields)) {
    if (Array.isArray) {
      return objectToOmit.filter(element => !fields.includes(element))
    }

    const omited = {};
    for (const field in objectToOmit) {
      if (!fields.includes(field)) {
        omited[field] = objectToOmit[field];
      }
    }
    return omited;
  }

  return new Error('Wrong object to omit or fields to omit by');
}

export function pick(objectToPick, fields) {
  if (typeof objectToPick === 'object' && Array.isArray(fields)) {
    if (Array.isArray) {
      return objectToPick.filter(element => fields.includes(element))
    }

    const picked = {};
    for (const field in objectToPick) {
      if (fields.includes(field)) {
        picked[field] = objectToPick[field];
      }
    }
    return picked;
  }

  return new Error('Wrong object to pick from or fields to pick by');
}

export function fromEntries(records) {
  if (Array.isArray(records)) {
    const object = {};
    for (const {option, value} of records) {
      object[option] = value;
    }
    return object;
  }

  return new Error('Wrong records type');
}

export function getDateRange(range = 'month', format = 'DD MMMM') {
  return {
    start: moment().clone().startOf(range),
    end: moment().clone().endOf(range),
    range,
    startF: moment().clone().startOf(range).format(format),
    endF: moment().clone().endOf(range).format(format)
  }
}
