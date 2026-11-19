/**
 * Central Data Loader
 * Unit 1 va Unit 2 modullarini birlashtiradi.
 */

window.IELTS_UNITS = [
  window.unit1Data,
  window.unit2Data
];

window.getAllUnits = function() {
  return window.IELTS_UNITS.filter(u => !!u);
};

window.findExerciseById = function(exId) {
  for (const unit of window.getAllUnits()) {
    const ex = unit.exercises.find(e => e.id === exId);
    if (ex) return { unit, exercise: ex };
  }
  return null;
};
