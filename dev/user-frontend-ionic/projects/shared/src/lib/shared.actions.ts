import { actionsFactory, props } from '@ngneat/effects';

const sharedActions = actionsFactory('shared');
export const cleanupPrivateData = sharedActions.create('Cleanup Private Data', props<{authToken: string}>());
export const authenticate = sharedActions.create('User connected');
