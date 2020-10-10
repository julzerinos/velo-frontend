import {axiosMethods} from '@/plugins/requests/requests';

describe("requests", () => {
    test("test get request", async () => {
        const r = await axiosMethods.get(
            "https://httpbin.org/headers",
            {"Jest-Test-Value": "69"},
            response => response,
            () => "fail")

        expect(r).toHaveProperty('data')
        expect(r.data).toHaveProperty('headers')
        expect(r.data.headers).toHaveProperty('Jest-Test-Value')
        expect(r.data.headers['Jest-Test-Value']).toMatch("69")
    });

    test("test post request", async () => {
        const r = await axiosMethods.post(
            "https://httpbin.org/post",
            {"Jest-Test-Value": "69"},
            {},
            response => response,
            () => "fail")

        expect(r).toHaveProperty('data')
        expect(r.data).toHaveProperty('headers')
        expect(r.data.headers).toHaveProperty('Jest-Test-Value')
        expect(r.data.headers['Jest-Test-Value']).toMatch("69")
    });
});