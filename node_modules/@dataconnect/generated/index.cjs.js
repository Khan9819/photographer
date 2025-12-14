const { queryRef, executeQuery, mutationRef, executeMutation, validateArgs } = require('firebase/data-connect');

const connectorConfig = {
  connector: 'example',
  service: 'mypixiestgallery',
  location: 'us-east4'
};
exports.connectorConfig = connectorConfig;

const createUserRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateUser', inputVars);
}
createUserRef.operationName = 'CreateUser';
exports.createUserRef = createUserRef;

exports.createUser = function createUser(dcOrVars, vars) {
  return executeMutation(createUserRef(dcOrVars, vars));
};

const getPhotosByUserRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetPhotosByUser', inputVars);
}
getPhotosByUserRef.operationName = 'GetPhotosByUser';
exports.getPhotosByUserRef = getPhotosByUserRef;

exports.getPhotosByUser = function getPhotosByUser(dcOrVars, vars) {
  return executeQuery(getPhotosByUserRef(dcOrVars, vars));
};

const likePhotoRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'LikePhoto', inputVars);
}
likePhotoRef.operationName = 'LikePhoto';
exports.likePhotoRef = likePhotoRef;

exports.likePhoto = function likePhoto(dcOrVars, vars) {
  return executeMutation(likePhotoRef(dcOrVars, vars));
};

const listAllPhotosRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListAllPhotos');
}
listAllPhotosRef.operationName = 'ListAllPhotos';
exports.listAllPhotosRef = listAllPhotosRef;

exports.listAllPhotos = function listAllPhotos(dc) {
  return executeQuery(listAllPhotosRef(dc));
};
