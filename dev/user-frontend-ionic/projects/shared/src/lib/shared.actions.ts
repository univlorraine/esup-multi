import { actionsFactory } from '@ngneat/effects';

const sharedActions = actionsFactory('shared');
export const cleanupPrivateData = sharedActions.create('Cleanup Private Data');
