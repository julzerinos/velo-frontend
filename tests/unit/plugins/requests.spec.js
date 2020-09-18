import requests from '@/plugins/requests/requests';

describe("requests", () => {
    test("should make a get request", async () => {
        const response = await requests.methods.get("https://www.passwordrandom.com/query?command=int&min=0&max=50&count=1",
                response=>{expect(response).toBeLessThan(51)},null)
    });
});