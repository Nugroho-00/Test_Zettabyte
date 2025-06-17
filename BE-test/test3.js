/**
 * Direction:
 * Remove key that have null or undefined value
 *
 * Expected Result:
 * [
 *   { session_name: 'first test', classes: [{ students: [{ student_name: 'budi' }] }] },
 *   { classes: [{ class_name: 'second class', students: [{ student_name: 'adi' }] }] },
 * ]
 */
const data = [
  {
    session_name: "first test",
    classes: [{ class_name: undefined, students: [{ student_name: "budi" }] }],
  },
  {
    session_name: null,
    classes: [
      { class_name: "second class", students: [{ student_name: "adi" }] },
    ],
  },
];

function setNullToUndefined(obj) {
  if (Array.isArray(obj)) {
    return obj.map(setNullToUndefined);
  } else if (obj !== null && typeof obj === "object") {
    const newObj = {};
    for (const [key, value] of Object.entries(obj)) {
      if (value !== null && value !== undefined) {
        newObj[key] = setNullToUndefined(value);
      }
    }
    return newObj;
  }
  return obj;
}

function result(data) {
  return data.map(setNullToUndefined);
}

console.log(result(data));
