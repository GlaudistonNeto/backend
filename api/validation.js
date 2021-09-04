module.exports = app => {
  function existsOrError(value, msg) {
    if (!value) throw msg;
    if (Array.isArray(value) && value.length === 0) throw msg;
    if(typeof value === 'string' && !value.trim()) throw msg;
  }
  
  function notExistsOrError(value, msg) {
    try {
      existsOrError(value, msg)
    } catch(msg) {
      return;
    }
    throw msg;
  }
  
  function equalsOrError(valueA, valueB, msg) {
    if (valueA !== valueB) throw msg;
  }
  
  function strongPasswordOrError(value, msg) {
    if (value <= 5 ) throw msg;
    if (Array.isArray(value) && value.length === 0) throw msg;
    if(typeof value === 'string' && !value.trim()) throw msg;
  }

  function ageVerifications(value, msg) {
    if (value < 18) throw msg;
    if (Array.isArray(value) && value.length === 0) throw msg;
    if(typeof value === 'integer' && !value.trim()) throw msg;
  }

  return {
    existsOrError,
    notExistsOrError,
    equalsOrError,
    strongPasswordOrError,
    ageVerifications,
  }
}
