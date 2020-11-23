export const formatResult = function (blame, r) {
    const status = r['status'] || r.response.status

    const type = status < 299 && status >= 200 ? 'success' : 'error'

    return {blame, message: type, type}
}