import {get, post} from '@/plugins/requests/requests';

import axios from 'axios'

jest.mock('axios')

describe("requests mocked", () => {
    test("mocked get request runs onSuccess when request is resolved", () => {
        expect.hasAssertions()

        axios.get.mockResolvedValueOnce({data: "test"})

        return get(
            "goodURL",
            {},
            {},
            r => {
                expect(r).toHaveProperty('data')
                expect(r.data).toBe("test")
            },
            null
        )
    });

    test("mocked get request runs onFailure when request is rejected", () => {
        expect.hasAssertions()

        axios.get.mockRejectedValueOnce({data: "test"})

        return get(
            "badUrl",
            {},
            {},
            null,
            r => {
                expect(r).toHaveProperty('data')
                expect(r.data).toBe("test")
            }
        )
    });

    test("mocked post request runs onSuccess when request is resolved", () => {
        expect.hasAssertions()

        axios.post.mockResolvedValueOnce({data: "test"})

        return post(
            "badUrl",
            {},
            {},
            {},
            r => {
                expect(r).toHaveProperty('data')
                expect(r.data).toBe("test")
            },
            null
        )
    });

    test("mocked post request runs onFailure when request is rejected", () => {
        expect.hasAssertions()

        axios.post.mockRejectedValueOnce({data: "test"})

        return post(
            "badUrl",
            {},
            {},
            {},
            null,
            r => {
                expect(r).toHaveProperty('data')
                expect(r.data).toBe("test")
            }
        )
    });


});