export const formatResult = function (blame, r) {
    const status = r['status'] || (r['response'] || {status: 503})['status']

    const type = status < 299 && status >= 200 ? 'success' : 'error'

    return {blame, message: `${status} - ${type}`, type}
}