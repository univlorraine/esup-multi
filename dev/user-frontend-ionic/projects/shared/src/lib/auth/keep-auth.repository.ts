import { SecureStoragePlugin } from 'capacitor-secure-storage-plugin';
import { from, Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

const REFRESH_AUTH_TOKEN_KEY = 'refresh-auth-token';

export const updateRefreshAuthToken = (token: string): Observable<boolean> => from(
    SecureStoragePlugin.set({
        key: REFRESH_AUTH_TOKEN_KEY,
        value: token
    }))
    .pipe(
        map(result => result.value)
    );

export const getRefreshAuthToken = (): Observable<string | null> => from(
    SecureStoragePlugin.get({key: REFRESH_AUTH_TOKEN_KEY}))
    .pipe(
        map(result => result.value),
        catchError(() => of(null)),
    );

export const deleteRefreshAuthToken = (): Observable<boolean> => from(
    SecureStoragePlugin.remove({key: REFRESH_AUTH_TOKEN_KEY}))
    .pipe(
        map(result => result.value)
    );
