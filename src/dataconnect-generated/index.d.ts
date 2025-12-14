import { ConnectorConfig, DataConnect, QueryRef, QueryPromise, MutationRef, MutationPromise } from 'firebase/data-connect';

export const connectorConfig: ConnectorConfig;

export type TimestampString = string;
export type UUIDString = string;
export type Int64String = string;
export type DateString = string;




export interface CreateUserData {
  user_insert: User_Key;
}

export interface CreateUserVariables {
  email: string;
  username: string;
}

export interface GetPhotosByUserData {
  photos: ({
    id: UUIDString;
    imageUrl: string;
    caption: string;
    createdAt: TimestampString;
    tags?: string[] | null;
  } & Photo_Key)[];
}

export interface GetPhotosByUserVariables {
  userId: UUIDString;
}

export interface LikePhotoData {
  like_insert: Like_Key;
}

export interface LikePhotoVariables {
  photoId: UUIDString;
}

export interface Like_Key {
  userId: UUIDString;
  photoId: UUIDString;
  __typename?: 'Like_Key';
}

export interface ListAllPhotosData {
  photos: ({
    id: UUIDString;
    imageUrl: string;
    caption: string;
    createdAt: TimestampString;
    tags?: string[] | null;
    user: {
      id: UUIDString;
      username: string;
    } & User_Key;
  } & Photo_Key)[];
}

export interface Photo_Key {
  id: UUIDString;
  __typename?: 'Photo_Key';
}

export interface User_Key {
  id: UUIDString;
  __typename?: 'User_Key';
}

interface CreateUserRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateUserVariables): MutationRef<CreateUserData, CreateUserVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateUserVariables): MutationRef<CreateUserData, CreateUserVariables>;
  operationName: string;
}
export const createUserRef: CreateUserRef;

export function createUser(vars: CreateUserVariables): MutationPromise<CreateUserData, CreateUserVariables>;
export function createUser(dc: DataConnect, vars: CreateUserVariables): MutationPromise<CreateUserData, CreateUserVariables>;

interface GetPhotosByUserRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetPhotosByUserVariables): QueryRef<GetPhotosByUserData, GetPhotosByUserVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetPhotosByUserVariables): QueryRef<GetPhotosByUserData, GetPhotosByUserVariables>;
  operationName: string;
}
export const getPhotosByUserRef: GetPhotosByUserRef;

export function getPhotosByUser(vars: GetPhotosByUserVariables): QueryPromise<GetPhotosByUserData, GetPhotosByUserVariables>;
export function getPhotosByUser(dc: DataConnect, vars: GetPhotosByUserVariables): QueryPromise<GetPhotosByUserData, GetPhotosByUserVariables>;

interface LikePhotoRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: LikePhotoVariables): MutationRef<LikePhotoData, LikePhotoVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: LikePhotoVariables): MutationRef<LikePhotoData, LikePhotoVariables>;
  operationName: string;
}
export const likePhotoRef: LikePhotoRef;

export function likePhoto(vars: LikePhotoVariables): MutationPromise<LikePhotoData, LikePhotoVariables>;
export function likePhoto(dc: DataConnect, vars: LikePhotoVariables): MutationPromise<LikePhotoData, LikePhotoVariables>;

interface ListAllPhotosRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListAllPhotosData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<ListAllPhotosData, undefined>;
  operationName: string;
}
export const listAllPhotosRef: ListAllPhotosRef;

export function listAllPhotos(): QueryPromise<ListAllPhotosData, undefined>;
export function listAllPhotos(dc: DataConnect): QueryPromise<ListAllPhotosData, undefined>;

