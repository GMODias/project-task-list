const isRightTypes = {
  action: 'string',
  responsible: 'string',
  status: 'string',
  createdAt: 'string',
};

const isNotAnObject = (task) => !(task instanceof Object);

const isAnEmptyObject = (task) => !(Object.keys(task).length);

const isPropertiesNotRightType = (task) => !Object.keys(task)
  .every((property) => (
    property !== 'id' ? typeof task[property] === typeof isRightTypes[property] : true));

const isStringEmpty = (task) => Object.entries(task)
    .filter(([key]) => Object.keys(isRightTypes).includes(key))
    .some(([_key, value]) => value.length === 0);

const isInvalidTaskProperties = (task) => {
  if (isNotAnObject(task)) { return { message: 'Não é um objeto' }; }
  if (isAnEmptyObject(task)) { return { message: 'É um objeto vazio' }; }
  if (isPropertiesNotRightType(task)) { return { message: 'Propriedade não é do tipo correto' }; }
  if (isStringEmpty(task)) { return { message: 'String vazia' }; }
  return false;
};

const haveAllProperties = (task) => Object.keys(isRightTypes).every((property) => task[property]);

module.exports = { isInvalidTaskProperties, haveAllProperties, isRightTypes };