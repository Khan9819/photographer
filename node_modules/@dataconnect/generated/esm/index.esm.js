import { queryRef, executeQuery, mutationRef, executeMutation, validateArgs } from 'firebase/data-connect';

export const connectorConfig = {
  connector: 'example',
  service: 'mypixiestgallery',
  location: 'us-east4'
};

export const createUserRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateUser', inputVars);
}
createUserRef.operationName = 'CreateUser';

export function createUser(dcOrVars, vars) {
  return executeMutation(createUserRef(dcOrVars, vars));
}

export const getPhotosByUserRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetPhotosByUser', inputVars);
}
getPhotosByUserRef.operationName = 'GetPhotosByUser';

export function getPhotosByUser(dcOrVars, vars) {
  return executeQuery(getPhotosByUserRef(dcOrVars, vars));
}

export const likePhotoRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'LikePhoto', inputVars);
}
likePhotoRef.operationName = 'LikePhoto';

export function likePhoto(dcOrVars, vars) {
  return executeMutation(likePhotoRef(dcOrVars, vars));
}

export const listAllPhotosRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListAllPhotos');
}
listAllPhotosRef.operationName = 'ListAllPhotos';

export function listAllPhotos(dc) {
  return executeQuery(listAllPhotosRef(dc));
}

