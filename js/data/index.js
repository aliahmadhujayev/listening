/**
 * Central Data Loader
 * Kelajakda yangi unitlar (unit2, unit3, ...) shu yerga import qilinadi yoki massivga qo'shiladi.
 */

window.IELTS_UNITS = [
  window.unit1Data
  // Keyinchalik: window.unit2Data, window.unit3Data ...
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
