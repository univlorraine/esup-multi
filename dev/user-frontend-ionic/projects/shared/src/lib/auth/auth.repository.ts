import { SecureStoragePlugin } from 'capacitor-secure-storage-plugin';
import { from, Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

const AUTH_TOKEN_KEY = 'auth-token';

export const updateAuthToken = (token: string): Observable<boolean> => from(
    SecureStoragePlugin.set({
        key: AUTH_TOKEN_KEY,
        value: token
    }))
    .pipe(
        map(result => result.value)
    );

export const getAuthToken = (): Observable<string | null> => from(
    SecureStoragePlugin.get({key: AUTH_TOKEN_KEY}))
    .pipe(
        map(result => result.value),
        catchError(() => of(null)),
    );

export const deleteAuthToken = (): Observable<boolean> => from(
    SecureStoragePlugin.remove({key: AUTH_TOKEN_KEY}))
    .pipe(
        map(result => result.value)
    );
