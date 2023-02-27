import { HttpErrorResponse } from '@angular/common/http';

const expectedErrorPrefix = '[EXPECTED]';

export const getExpectedErrorMessage = (err: HttpErrorResponse): string | null => {
    const subErrorMessage = err.error?.message;
    if(err.error && subErrorMessage.startsWith(expectedErrorPrefix)) {
        return subErrorMessage.slice(expectedErrorPrefix.length);
    }
    return null;
}