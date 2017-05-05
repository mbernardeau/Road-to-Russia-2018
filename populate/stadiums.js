const stadiums = [{
  city: 'Saint-Pétersbourg',
  name: 'Stade Krestovski',
  capacity: 69500,
}, {
  city: 'Moscou',
  name: 'Stade Loujniki',
  capacity: 89318,
}, {
  city: 'Moscou',
  name: 'Otkrytie Arena',
  capacity: 46990,
}, {
  city: 'Nijni Novgorod',
  name: 'Stade de Nijni Novgorod',
  capacity: 44899,
}, {
  city: 'Kaliningrad',
  name: 'Stade de Kaliningrad',
  capacity: 35000,
}, {
  city: 'Saransk',
  name: 'Stade Yubileyniy',
  capacity: 45015,
}, {
  city: 'Rostov-sur-le-Don',
  name: 'Stade de Rostov-sur-le-Don',
  capacity: 43702,
}, {
  city: 'Sotchi',
  name: 'Stade olympique Ficht',
  capacity: 47659,
}, {
  city: 'Volgograd',
  name: 'Stade central',
  capacity: 45015,
}, {
  city: 'Samara',
  name: 'Stade de Samara',
  capacity: 44918,
}, {
  city: 'Kazan',
  name: 'Kazan-Arena',
  capacity: 45015,
}, {
  city: 'Iekaterinbourg',
  name: 'Stade Central',
  capacity: 35000,
}];

const generatePushID = (() => {
  // Modeled after base64 web-safe chars, but ordered by ASCII.
  const PUSH_CHARS = '-0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz';

  // Timestamp of last push, used to prevent local collisions if you push twice in one ms.
  let lastPushTime = 0;

  // We generate 72-bits of randomness which get turned into 12 characters and appended to the
  // timestamp to prevent collisions with other clients.  We store the last characters we
  // generated because in the event of a collision, we'll use those same characters except
  // "incremented" by one.
  const lastRandChars = [];

  return () => {
    let now = new Date().getTime();
    let i;
    const duplicateTime = (now === lastPushTime);
    lastPushTime = now;

    const timeStampChars = new Array(8);
    for (i = 7; i >= 0; i--) {
      timeStampChars[i] = PUSH_CHARS.charAt(now % 64);
      // NOTE: Can't use << here because javascript will convert to int and lose the upper bits.
      now = Math.floor(now / 64);
    }
    if (now !== 0) throw new Error('We should have converted the entire timestamp.');

    let id = timeStampChars.join('');

    if (!duplicateTime) {
      for (i = 0; i < 12; i++) {
        lastRandChars[i] = Math.floor(Math.random() * 64);
      }
    } else {
      // If the timestamp hasn't changed since last push, use the same random number, except incremented by 1.
      for (i = 11; i >= 0 && lastRandChars[i] === 63; i--) {
        lastRandChars[i] = 0;
      }
      lastRandChars[i]++;
    }
    for (i = 0; i < 12; i++) {
      id += PUSH_CHARS.charAt(lastRandChars[i]);
    }
    if (id.length !== 20) throw new Error('Length should be 20.');

    return id;
  };
})();

const stadiumsWithKey = {};
stadiums.forEach((s) => {
  stadiumsWithKey[generatePushID()] = s;
});
