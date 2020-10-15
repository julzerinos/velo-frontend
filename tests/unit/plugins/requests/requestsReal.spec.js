import {get, post} from '@/plugins/requests/requests';

describe("requests real", () => {
    test("real get request to httpbin.org/headers returns headers in response", () => {
        expect.hasAssertions()
        return get(
            "https://httpbin.org/headers",
            {"Jest-Test-Value": "69"},
            {},
            r => {
                expect(r).toHaveProperty('data')
                expect(r.data).toHaveProperty('headers')
                expect(r.data.headers).toHaveProperty('Jest-Test-Value')
                expect(r.data.headers['Jest-Test-Value']).toMatch("69")
            },
            null
        )
    });

    test("real post request to httpbin.org/post returns headers in response", () => {
        expect.hasAssertions()

        return post(
            "https://httpbin.org/post",
            {"Jest-Test-Value": "69"},
            {},
            {},
            r => {
                expect(r).toHaveProperty('data')
                expect(r.data).toHaveProperty('headers')
                expect(r.data.headers).toHaveProperty('Jest-Test-Value')
                expect(r.data.headers['Jest-Test-Value']).toMatch("69")
            },
            null
        )
    });
});