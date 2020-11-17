/**
 * @author WMXPY
 * @namespace Authorization
 * @description Util
 */

export const crossPlatformBToA = (target: string): string => {

    if (typeof window === 'undefined'
        || typeof window.btoa !== 'function') {

        return Buffer.from(target, 'utf8').toString('base64');
    }

    return window.btoa(target);
};
