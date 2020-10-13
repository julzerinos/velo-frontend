import {logout, register} from "@/plugins/vuex/profile/profile";
import {axiosMethods} from "@/plugins/requests/requests";

jest.mock('@/plugins/requests/requests')

describe('vuex/profile', () => {
    test('logout returns response on success', () => {
        axiosMethods.post.mockResolvedValueOnce({data: "logoutSuccess"});

        return logout({token: "123"}).then(r => expect(r.data).toBe("logoutSuccess"))
    });

    test('logout returns response on fail', () => {
        axiosMethods.post.mockRejectedValueOnce({data: "logoutFail"});

        return logout({token: "123"}).then(null, r => expect(r.data).toBe("logoutFail"))
    });

    test('register returns response on success', () => {
        axiosMethods.post.mockResolvedValueOnce({data: "registerSuccess"});

        const profile = {
            name: {firstName: "test1", lastName: "test2"},
            username: "test3",
            password: "test4"
        }

        return register(profile).then(r => expect(r.data).toBe("registerSuccess"))
    });

    test('register returns response on fail', () => {
        axiosMethods.post.mockRejectedValueOnce({data: "registerFail"});

        const profile = {
            name: {firstName: "test1", lastName: "test2"},
            username: "test3",
            password: "test4"
        }

        return register(profile).then(null, r => expect(r.data).toBe("registerFail"))
    });

    // TODO: authenticate
    // TODO: user

    // test('login returns profile and response on success', () => {
    //     axiosMethods.post.mockResolvedValueOnce({
    //         headers: {
    //             authorization: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjp7ImZpcnN0TmFtZSI6IkphbnVhcnkiLCJsYXN0TmFtZSI6IkNvYWNoIn0sImlkIjoiMTIzIiwiZW1haWwiOiJqYW51YXJ5QHJvenBsYWouZ292IiwiYXRobGV0ZXMiOltdLCJwcm9maWxlSW1hZ2VQYXRoIjoiaHR0cHM6Ly9pLnl0aW1nLmNvbS92aS9iNW1mV0pYanR5US9tYXhyZXNkZWZhdWx0LmpwZyIsImlzU3RyYXZhQ29ubmVjdGVkIjpmYWxzZX0.MTEI-7HoGmPcOsb_zX7-WCwgJ-eTPRaD1I2A_VdKWz4"
    //         }
    //     });
    //
    //     const profile = {
    //         username: "test1",
    //         password: "test2"
    //     }
    //
    //     return login(profile).then(r => {
    //         console.log(r)
    //     })
    //
    // });
    //
    // test('login returns response on fail', () => {
    //     axiosMethods.post.mockRejectedValueOnce({data: "loginFail"});
    //
    //     const profile = {
    //         username: "test1",
    //         password: "test2"
    //     }
    //
    //     return login(profile).then(null, r => expect(r.data).toBe("loginFail"))
    // });
});